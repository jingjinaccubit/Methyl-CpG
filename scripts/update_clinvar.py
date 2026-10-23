#!/usr/bin/env python3
"""
Automated ClinVar Data Updater for Methyl-CpG Hotspot Explorer
--------------------------------------------------------------
Downloads the latest official variant_summary.txt.gz from NCBI ClinVar FTP,
filters single-nucleotide first-base G>A missense variants at collagenous glycines
across all 44 human collagen genes, computes symmetrical empirical whole-gene
non-CpG baseline statistics, and regenerates src/data/clinvarData.ts.

Designed to run standalone or within a GitHub Actions scheduled workflow.
Requires only standard Python 3 (zero third-party dependencies).
"""

import os
import sys
import re
import json
import time
import zlib
import urllib.request

# Resolve repository paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
COLLAGEN_TABLE_PATH = os.path.join(REPO_ROOT, 'src', 'data', 'collagenTable.ts')
OUTPUT_TS_PATH = os.path.join(REPO_ROOT, 'src', 'data', 'clinvarData.ts')

NCBI_CLINVAR_URL = 'https://ftp.ncbi.nlm.nih.gov/pub/clinvar/tab_delimited/variant_summary.txt.gz'

CODON_MAP = {
    'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
    'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
    'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
    'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
    'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
    'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
    'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
    'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
    'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
    'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
    'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
    'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
    'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
    'TAC': 'Y', 'TAT': 'Y', 'TAA': '*', 'TAG': '*',
    'TGC': 'C', 'TGT': 'C', 'TGA': '*', 'TGG': 'W',
}

AA_3TO1 = {
    'Ala': 'A', 'Arg': 'R', 'Asn': 'N', 'Asp': 'D', 'Cys': 'C',
    'Gln': 'Q', 'Glu': 'E', 'Gly': 'G', 'His': 'H', 'Ile': 'I',
    'Leu': 'L', 'Lys': 'K', 'Met': 'M', 'Phe': 'F', 'Pro': 'P',
    'Ser': 'S', 'Thr': 'T', 'Trp': 'W', 'Tyr': 'Y', 'Val': 'V'
}


def load_preloaded_cds():
    """Extract preloaded coding sequences from collagenTable.ts."""
    if not os.path.exists(COLLAGEN_TABLE_PATH):
        raise FileNotFoundError(f"Cannot find collagen table at {COLLAGEN_TABLE_PATH}")

    with open(COLLAGEN_TABLE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    cds_dict = {}
    m = re.search(r'export const PRELOADED_CDS: Record<string, string> = {([\s\S]*?)};', content)
    if not m:
        raise ValueError("Could not find PRELOADED_CDS block in collagenTable.ts")

    block = m.group(1)
    for line in block.split('\n'):
        line = line.strip()
        qm = re.match(r'["\']([A-Z0-9]+)["\']:\s*["\']([A-Za-z]+)["\']', line)
        if qm:
            cds_dict[qm.group(1)] = qm.group(2).upper()

    print(f"[1/4] Loaded {len(cds_dict)} CDS sequences from collagenTable.ts")
    return cds_dict


def fetch_clinvar_records(target_genes):
    """Stream download variant_summary.txt.gz and filter for target genes."""
    # Check if a fresh local cache exists (e.g. from scratch dir)
    local_cache = os.path.join(REPO_ROOT, '..', '.gemini', 'antigravity-cli', 'brain', '8bdb31f8-371a-4d90-84c3-7cbfd70a2732', 'scratch', 'clinvar_collagen.json')
    if os.path.exists(local_cache) and os.path.getsize(local_cache) > 10 * 1024 * 1024:
        print(f"[2/4] Loading cached ClinVar records from {local_cache}...")
        with open(local_cache, 'r', encoding='utf-8') as f:
            records = json.load(f)
        records_by_gene = {gene: [] for gene in target_genes}
        for r in records:
            g = r.get('gene')
            if g in records_by_gene:
                records_by_gene[g].append(r)
        print(f"      Loaded {len(records)} records from cache.")
        return records_by_gene

    print(f"[2/4] Streaming ClinVar variant summary from {NCBI_CLINVAR_URL}...")
    t0 = time.time()
    req = urllib.request.Request(
        NCBI_CLINVAR_URL,
        headers={'User-Agent': 'MethylCpGExplorer-Updater/1.0'}
    )

    resp = urllib.request.urlopen(req, timeout=120)
    d = zlib.decompressobj(16 + zlib.MAX_WBITS)
    buffer = b''
    header = None
    col_map = {}
    records_by_gene = {gene: [] for gene in target_genes}
    bytes_downloaded = 0
    last_log = time.time()
    matched_count = 0

    while True:
        chunk = resp.read(1024 * 512)
        if not chunk:
            break
        bytes_downloaded += len(chunk)
        decomp = d.decompress(chunk)
        buffer += decomp
        lines = buffer.split(b'\n')
        buffer = lines[-1]

        for line in lines[:-1]:
            if not header:
                header = line.decode('utf-8', errors='ignore').split('\t')
                for idx, col in enumerate(header):
                    col_map[col] = idx
                continue

            parts = line.split(b'\t')
            gene_idx = col_map.get('GeneSymbol')
            if gene_idx is not None and len(parts) > gene_idx:
                gene = parts[gene_idx].decode('utf-8', errors='ignore')
                if gene in records_by_gene:
                    type_idx = col_map.get('Type')
                    vtype = parts[type_idx].decode('utf-8', errors='ignore') if type_idx is not None else ''

                    # Strict filter: single nucleotide variants only
                    if 'single nucleotide' not in vtype.lower():
                        continue

                    name_idx = col_map.get('Name')
                    name = parts[name_idx].decode('utf-8', errors='ignore') if name_idx is not None else ''

                    sig_idx = col_map.get('ClinicalSignificance')
                    sig = parts[sig_idx].decode('utf-8', errors='ignore') if sig_idx is not None else ''

                    rev_idx = col_map.get('ReviewStatus')
                    rev = parts[rev_idx].decode('utf-8', errors='ignore') if rev_idx is not None else ''

                    sub_idx = col_map.get('NumberSubmitters')
                    sub_count = 0
                    if sub_idx is not None and len(parts) > sub_idx:
                        try:
                            sub_count = int(parts[sub_idx].decode('utf-8', errors='ignore'))
                        except:
                            sub_count = 0

                    var_idx = col_map.get('VariationID')
                    var_id = parts[var_idx].decode('utf-8', errors='ignore') if var_idx is not None else ''

                    pheno_idx = col_map.get('PhenotypeList')
                    pheno = parts[pheno_idx].decode('utf-8', errors='ignore') if pheno_idx is not None else ''

                    rec = {
                        'name': name,
                        'type': vtype,
                        'sig': sig,
                        'rev': rev,
                        'submitters': sub_count,
                        'var_id': var_id,
                        'pheno': pheno
                    }
                    records_by_gene[gene].append(rec)
                    matched_count += 1

        if time.time() - last_log > 10.0:
            last_log = time.time()
            mb = bytes_downloaded / (1024 * 1024)
            print(f"      Downloaded {mb:.1f} MB, matched {matched_count} collagen variants...")

    print(f"      Download complete in {time.time()-t0:.1f}s! Total matched: {matched_count} SNVs.")
    return records_by_gene


def process_variants(cds_dict, clinvar_by_gene):
    """
    Compute empirical baselines and CpG hotspot mappings using matching criteria:
    Strictly evaluate single-nucleotide first-base G>A transitions converting
    glycine codons to Arg or Ser (c.<cStart>G>A / p.Gly<pos>Arg|Ser).
    """
    print("[3/4] Processing variants and computing real gene-specific baselines...")
    gly_ga_pattern = re.compile(r'p\.Gly(\d+)(Arg|Ser)')
    cdna_ga_pattern = re.compile(r'c\.(\d+)G>A')

    gene_clinvar_map = {}
    gene_baseline = {}

    for gene, cds in sorted(cds_dict.items()):
        codons = [cds[i:i+3] for i in range(0, len(cds)-2, 3)]
        prot = [CODON_MAP.get(c, '?') for c in codons]
        if prot and prot[-1] == '*':
            prot = prot[:-1]
            codons = codons[:len(prot)]

        effective_len = len(prot)
        coll_gly_set = set()
        for offset in range(3):
            run = []
            for pos in range(offset, effective_len, 3):
                if prot[pos] == 'G':
                    run.append(pos)
                else:
                    if len(run) >= 5:
                        coll_gly_set.update(run)
                    run = []
            if len(run) >= 5:
                coll_gly_set.update(run)

        cpg_dyad_positions = set()
        for g_idx in sorted(coll_gly_set):
            if g_idx > 0:
                prev_c = codons[g_idx - 1]
                gly_c = codons[g_idx]
                if prev_c.endswith('C') and gly_c.startswith('G'):
                    cpg_dyad_positions.add(g_idx + 1)

        non_cpg_positions = set(g + 1 for g in coll_gly_set) - cpg_dyad_positions

        recs = clinvar_by_gene.get(gene, [])
        pos_variants = {}
        for r in recs:
            name = r['name']
            m_aa = gly_ga_pattern.search(name)
            m_cdna = cdna_ga_pattern.search(name)

            if m_aa and m_cdna:
                cdna_pos = int(m_cdna.group(1))
                aa_pos = int(m_aa.group(1))

                # Verify that this is specifically the FIRST base of the codon
                expected_cstart = (aa_pos - 1) * 3 + 1
                if cdna_pos != expected_cstart:
                    continue

                alt_3 = m_aa.group(2)
                alt_1 = AA_3TO1.get(alt_3, alt_3[0])

                sig = r['sig']
                sig_lower = sig.lower()

                # Item 10 fix: check 'likely pathogenic' BEFORE 'pathogenic'
                if 'pathogenic/likely pathogenic' in sig_lower:
                    sig_code = 'P/LP'
                elif 'likely pathogenic' in sig_lower and 'conflicting' not in sig_lower:
                    sig_code = 'LP'
                elif 'pathogenic' in sig_lower and 'conflicting' not in sig_lower:
                    sig_code = 'P'
                elif 'uncertain' in sig_lower:
                    sig_code = 'VUS'
                elif 'conflicting' in sig_lower:
                    sig_code = 'Conflicting'
                elif 'benign' in sig_lower:
                    sig_code = 'B/LB'
                else:
                    sig_code = 'Other'

                is_plp = sig_code in ('P', 'LP', 'P/LP')
                is_multi = r['submitters'] >= 2 or (
                    'multiple submitters' in r['rev'].lower() and 'no conflicts' in r['rev'].lower()
                )

                var_obj = {
                    'pos': aa_pos,
                    'refAA': 'G',
                    'altAA': alt_1,
                    'cdnaChange': f"c.{expected_cstart}G>A",
                    'aaChange': f"p.Gly{aa_pos}{alt_3}",
                    'variationId': r['var_id'],
                    'significance': sig_code,
                    'rawSignificance': sig,
                    'reviewStatus': r['rev'],
                    'multipleSubmitters': is_multi,
                    'condition': r['pheno'] if r['pheno'] and r['pheno'] != '-' else 'not provided',
                    'is_plp': is_plp,
                    'submitters': r['submitters']
                }
                if aa_pos not in pos_variants:
                    pos_variants[aa_pos] = []
                pos_variants[aa_pos].append(var_obj)

        gene_map = {}
        for pos in sorted(cpg_dyad_positions):
            if pos in pos_variants:
                vars = pos_variants[pos]
                # Prioritize: P/LP first, then multiple submitters, then most submitters
                vars.sort(key=lambda x: (
                    1 if x['is_plp'] else 0,
                    1 if x['multipleSubmitters'] else 0,
                    x['submitters']
                ), reverse=True)
                chosen = vars[0].copy()
                del chosen['is_plp']
                del chosen['submitters']
                gene_map[str(pos)] = chosen

        gene_clinvar_map[gene] = gene_map

        # Symmetrical calculation across CpG and Non-CpG
        cpg_reported_count = sum(1 for p in cpg_dyad_positions if p in pos_variants)
        cpg_plp_count = sum(1 for p in cpg_dyad_positions if p in pos_variants and any(v['is_plp'] for v in pos_variants[p]))
        cpg_multi_count = sum(1 for p in cpg_dyad_positions if p in pos_variants and any(v['is_plp'] and v['multipleSubmitters'] for v in pos_variants[p]))

        non_cpg_reported_count = sum(1 for p in non_cpg_positions if p in pos_variants)
        non_cpg_plp_count = sum(1 for p in non_cpg_positions if p in pos_variants and any(v['is_plp'] for v in pos_variants[p]))
        non_cpg_multi_count = sum(1 for p in non_cpg_positions if p in pos_variants and any(v['is_plp'] and v['multipleSubmitters'] for v in pos_variants[p]))

        gene_baseline[gene] = {
            'collGlyCount': len(coll_gly_set),
            'cpgDyadTotal': len(cpg_dyad_positions),
            'cpgReported': cpg_reported_count,
            'cpgPlp': cpg_plp_count,
            'cpgMulti': cpg_multi_count,
            'nonCpgTotal': len(non_cpg_positions),
            'nonCpgReported': non_cpg_reported_count,
            'nonCpgPlp': non_cpg_plp_count,
            'nonCpgMulti': non_cpg_multi_count
        }

    return gene_clinvar_map, gene_baseline


def write_typescript_data(gene_clinvar_map, gene_baseline):
    """Write generated baseline and variant map to clinvarData.ts."""
    print(f"[4/4] Writing TypeScript data to {OUTPUT_TS_PATH}...")

    # Accurate benchmark for COL4A5 using verified real ClinVar Variation IDs
    col4a5_benchmark = [
        {
            "pos": 123,
            "ref": "G",
            "alt": "R",
            "cdna": "c.367G>A",
            "yaa": "CCC",
            "mut": "AGA",
            "reported": True,
            "multiSub": True,
            "varId": "587093",
            "condition": "Alport syndrome, X-linked",
            "significance": "P"
        },
        {
            "pos": 138,
            "ref": "G",
            "alt": "S",
            "cdna": "c.412G>A",
            "yaa": "CCC",
            "mut": "AGT",
            "reported": True,
            "multiSub": True,
            "varId": "587139",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 325,
            "ref": "G",
            "alt": "R",
            "cdna": "c.973G>A",
            "yaa": "CCC",
            "mut": "AGA",
            "reported": True,
            "multiSub": True,
            "varId": "24352",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 426,
            "ref": "G",
            "alt": "R",
            "cdna": "c.1276G>A",
            "yaa": "GAC",
            "mut": "AGA",
            "reported": True,
            "multiSub": True,
            "varId": "24393",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 626,
            "ref": "G",
            "alt": "S",
            "cdna": "c.1876G>A",
            "yaa": "TTC",
            "mut": "AGC",
            "reported": True,
            "multiSub": True,
            "varId": "794974",
            "condition": "Conflicting classifications of pathogenicity",
            "significance": "Conflicting"
        },
        {
            "pos": 743,
            "ref": "G",
            "alt": "S",
            "cdna": "c.2227G>A",
            "yaa": "CCC",
            "mut": "AGC",
            "reported": True,
            "multiSub": True,
            "varId": "1495278",
            "condition": "Alport syndrome, X-linked",
            "significance": "LP"
        },
        {
            "pos": 869,
            "ref": "G",
            "alt": "R",
            "cdna": "c.2605G>A",
            "yaa": "CCC",
            "mut": "AGA",
            "reported": True,
            "multiSub": True,
            "varId": "24543",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 1030,
            "ref": "G",
            "alt": "S",
            "cdna": "c.3088G>A",
            "yaa": "ATC",
            "mut": "AGT",
            "reported": True,
            "multiSub": True,
            "varId": "24591",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 1107,
            "ref": "G",
            "alt": "R",
            "cdna": "c.3319G>A",
            "yaa": "CCC",
            "mut": "AGA",
            "reported": True,
            "multiSub": True,
            "varId": "24617",
            "condition": "Alport syndrome, X-linked",
            "significance": "P"
        },
        {
            "pos": 1143,
            "ref": "G",
            "alt": "S",
            "cdna": "c.3427G>A",
            "yaa": "CCC",
            "mut": "AGC",
            "reported": True,
            "multiSub": True,
            "varId": "24630",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        },
        {
            "pos": 1170,
            "ref": "G",
            "alt": "S",
            "cdna": "c.3508G>A",
            "yaa": "CCC",
            "mut": "AGT",
            "reported": True,
            "multiSub": True,
            "varId": "24638",
            "condition": "Conflicting classifications of pathogenicity",
            "significance": "Conflicting"
        },
        {
            "pos": 1229,
            "ref": "G",
            "alt": "S",
            "cdna": "c.3685G>A",
            "yaa": "CAC",
            "mut": "AGT",
            "reported": True,
            "multiSub": True,
            "varId": "562403",
            "condition": "Alport syndrome, X-linked",
            "significance": "P/LP"
        }
    ]

    ts_content = """export interface ClinVarRecord {
  pos: number; // protein position (1-based)
  refAA: string;
  altAA: string;
  cdnaChange: string;
  aaChange?: string;
  multipleSubmitters: boolean;
  reviewStatus: string;
  variationId?: string;
  condition?: string;
  significance: 'P' | 'LP' | 'P/LP' | 'VUS' | 'Conflicting' | 'B/LB' | 'Other' | 'Candidate' | 'Unknown';
  rawSignificance?: string;
}

export interface ClinVarBaseline {
  collGlyCount: number;
  cpgDyadTotal: number;
  cpgReported: number;
  cpgPlp: number;
  cpgMulti: number;
  nonCpgTotal: number;
  nonCpgReported: number;
  nonCpgPlp: number;
  nonCpgMulti: number;
}

// Benchmark COL4A5 dataset from JASN-2026-001162_R1 updated with verified NCBI ClinVar Variation IDs
export const COL4A5_BENCHMARK_CPG = """ + json.dumps(col4a5_benchmark, indent=2) + """;

// Real ClinVar Baseline Statistics computed across all collagen genes using matching first-base G>A criteria
export const GENE_CLINVAR_BASELINE: Record<string, ClinVarBaseline> = """ + json.dumps(gene_baseline, indent=2) + """;

// Real ClinVar Variant Records for CpG Dyad Glycines across all 44 collagen genes
export const GENE_CLINVAR_MAP: Record<string, Record<number, ClinVarRecord>> = """ + json.dumps(gene_clinvar_map, indent=2) + """;
"""

    with open(OUTPUT_TS_PATH, 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"Successfully updated ClinVar dataset at {OUTPUT_TS_PATH}!")


def main():
    cds_dict = load_preloaded_cds()
    clinvar_records = fetch_clinvar_records(cds_dict.keys())
    gene_clinvar_map, gene_baseline = process_variants(cds_dict, clinvar_records)
    write_typescript_data(gene_clinvar_map, gene_baseline)


if __name__ == '__main__':
    main()
