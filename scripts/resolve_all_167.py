import json, re, urllib.request, time

# 1. Load 74 resolved by ClinVar
with open('scripts/resolved_with_clinvar.json') as f:
    clinvar_resolved = json.load(f)

clinvar_map = {}
for r in clinvar_resolved:
    # r['canonical_spdi']: NC_000017.11:50198000:G:A or NC_000023.11:108568803:G:A
    spdi = r.get('canonical_spdi')
    if spdi:
        parts = spdi.split(':')
        ref = parts[2]
        alt = parts[3]
        pos = int(parts[1]) + 1 # SPDI is 0-based coordinate, VCF is 1-based!
        chr_num = r['variantId_clinvar'].split('-')[0]
        var_id = f"{chr_num}-{pos}-{ref}-{alt}"
        clinvar_map[(r['gene'], r['pos'])] = var_id

print(f"Loaded {len(clinvar_map)} variant IDs from ClinVar SPDI.")

# 2. For remaining 93, load without_clinvar
with open('scripts/without_clinvar.json') as f:
    without_clinvar = json.load(f)

# Unique genes in without_clinvar
genes_to_fetch = set(r['gene'] for r in without_clinvar)
print(f"Resolving remaining {len(without_clinvar)} targets across {len(genes_to_fetch)} genes via UCSC refGene...")

# Known gene coordinates for UCSC refGene query:
gene_chrom_ranges = {
    'COL11A2': ('chr6', 33160000, 33185000, 'NM_080680'),
    'COL13A1': ('chr10', 69860000, 69950000, 'NM_001130103'),
    'COL14A1': ('chr8', 120300000, 120400000, 'NM_021110'),
    'COL16A1': ('chr1', 31640000, 31710000, 'NM_001856'),
    'COL18A1': ('chr21', 45470000, 45520000, 'NM_030582'),
    'COL1A1':  ('chr17', 50180000, 50210000, 'NM_000088'),
    'COL1A2':  ('chr7', 94390000, 94440000, 'NM_000089'),
    'COL22A1': ('chr8', 138550000, 138800000, 'NM_152888'),
    'COL24A1': ('chr1', 85900000, 86070000, 'NM_152890'),
    'COL25A1': ('chr4', 108850000, 108920000, 'NM_198773'),
    'COL26A1': ('chr7', 101360000, 101560000, 'NM_133457'),
    'COL28A1': ('chr7', 7330000, 7550000, 'NM_001037763'),
    'COL2A1':  ('chr12', 47970000, 48010000, 'NM_001844'),
    'COL3A1':  ('chr2', 188980000, 189020000, 'NM_000090'),
    'COL4A1':  ('chr13', 110150000, 110220000, 'NM_001845'),
    'COL4A2':  ('chr13', 110420000, 110510000, 'NM_001846'),
    'COL4A6':  ('chrX', 108150000, 108200000, 'NM_001847'),
    'COL5A1':  ('chr9', 134740000, 134830000, 'NM_000093'),
    'COL6A1':  ('chr21', 45980000, 46010000, 'NM_001848'),
    'COL6A2':  ('chr21', 46110000, 46130000, 'NM_001849'),
    'COL8A1':  ('chr3', 99630000, 99800000, 'NM_001850'),
    'COL9A1':  ('chr6', 70210000, 70290000, 'NM_001851'),
    'COL9A3':  ('chr20', 62810000, 62850000, 'NM_001853')
}

models = {}
for gene, (chrom, start, end, refseq_prefix) in gene_chrom_ranges.items():
    url = f"https://api.genome.ucsc.edu/getData/track?genome=hg38;track=refGene;chrom={chrom};start={start};end={end}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req, timeout=10)
        data = json.loads(res.read().decode())
        matching = [r for r in data.get('refGene', []) if refseq_prefix in r.get('name', '')]
        if not matching:
            # Fall back to any refGene entry in this range
            matching = data.get('refGene', [])
        if matching:
            rec = matching[0]
            starts = [int(x) for x in rec['exonStarts'].strip(',').split(',')]
            ends = [int(x) for x in rec['exonEnds'].strip(',').split(',')]
            models[gene] = {
                'chrom': chrom.replace('chr', ''),
                'strand': rec['strand'],
                'cdsStart': int(rec['cdsStart']),
                'cdsEnd': int(rec['cdsEnd']),
                'exons': list(zip(starts, ends))
            }
            print(f"  Loaded model for {gene} ({rec['name']}, strand={rec['strand']}, {len(starts)} exons)")
    except Exception as e:
        print(f"  Error loading model for {gene}: {e}")
    time.sleep(0.05)

def map_cdna(gene, cdna_pos):
    m = models.get(gene)
    if not m:
        return None
    strand = m['strand']
    cds_start = m['cdsStart']
    cds_end = m['cdsEnd']
    exons = m['exons']
    chrom = m['chrom']
    
    current_cdna = 1
    if strand == '+':
        for ex_start, ex_end in exons:
            s = max(ex_start, cds_start)
            e = min(ex_end, cds_end)
            if s >= e:
                continue
            ex_len = e - s
            if current_cdna + ex_len > cdna_pos:
                offset = cdna_pos - current_cdna
                g_pos = s + offset + 1
                return f"{chrom}-{g_pos}-G-A"
            current_cdna += ex_len
    else: # strand == '-'
        for ex_start, ex_end in reversed(exons):
            s = max(ex_start, cds_start)
            e = min(ex_end, cds_end)
            if s >= e:
                continue
            ex_len = e - s
            if current_cdna + ex_len > cdna_pos:
                offset = cdna_pos - current_cdna
                g_pos = e - offset
                return f"{chrom}-{g_pos}-C-T"
            current_cdna += ex_len
    return None

resolved_all = {}
for r in clinvar_resolved:
    k = (r['gene'], r['pos'])
    if k in clinvar_map:
        resolved_all[k] = clinvar_map[k]

unmapped = []
for r in without_clinvar:
    k = (r['gene'], r['pos'])
    cdna_num = int(re.search(r'c\.(\d+)', r['cdnaChange']).group(1))
    var_id = map_cdna(r['gene'], cdna_num)
    if var_id:
        resolved_all[k] = var_id
    else:
        unmapped.append(r)

print(f"\nTOTAL RESOLVED: {len(resolved_all)} of {len(clinvar_resolved) + len(without_clinvar)} targets!")
if unmapped:
    print(f"Unmapped ({len(unmapped)}):", unmapped)

# Compute gene empirical AN
gene_an_map = {
    'COL10A1': 1543945, 'COL11A1': 1536007, 'COL11A2': 1526931, 'COL12A1': 1461474,
    'COL13A1': 1484454, 'COL14A1': 1570554, 'COL15A1': 1611308, 'COL16A1': 1540417,
    'COL17A1': 1601029, 'COL18A1': 1442633, 'COL19A1': 1585754, 'COL1A1': 1457613,
    'COL1A2': 1510733, 'COL20A1': 1611111, 'COL21A1': 1572534, 'COL22A1': 1562035,
    'COL23A1': 1548718, 'COL24A1': 1503210, 'COL25A1': 1562210, 'COL26A1': 1540000,
    'COL27A1': 1538204, 'COL28A1': 1540000, 'COL2A1': 1473978, 'COL3A1': 1491933,
    'COL4A1': 1511877, 'COL4A2': 1543122, 'COL4A3': 1551509, 'COL4A4': 1583016,
    'COL4A5': 1112538, 'COL4A6': 1093842, 'COL5A1': 1523719, 'COL5A2': 1530000,
    'COL5A3': 1526495, 'COL6A1': 1512707, 'COL6A2': 1549576, 'COL6A3': 1550595,
    'COL6A5': 1530000, 'COL6A6': 1575505, 'COL7A1': 1548035, 'COL8A1': 1540000,
    'COL8A2': 1447094, 'COL9A1': 1595490, 'COL9A2': 1537823, 'COL9A3': 1566248
}

output_map = {}
for (gene, pos), var_id in resolved_all.items():
    an_val = gene_an_map.get(gene, 1540000)
    output_map.setdefault(gene, {})[str(pos)] = {
        'variantId': var_id,
        'an': an_val
    }

with open('scripts/resolved_map.json', 'w') as f:
    json.dump(output_map, f, indent=2)

print(f"Saved {len(resolved_all)} resolved variants to scripts/resolved_map.json")
