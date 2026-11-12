/**
 * Preset Hotspots and Sample Sequences for Ultra-Deep Duplex Sequencing Simulation.
 * Includes:
 * - Sample 1: Alport Patient Targeted Amplicon Deep-Seq (SRR39847752 / PRJNA1502590)
 * - Sample 2: Human Sperm De Novo Mosaic Deep-Seq (SRR10479998 / PRJNA588332, Breuss et al. Nature Med 2020)
 * - Sample 3: NAR Paper Sperm WGBS & Built-in Negative Controls (Molaro et al. 2011 GSE30340, 89% 5mC vs 48 Split Controls)
 */

export interface HotspotPreset {
  id: string;
  gene: string;
  aminoAcidChange: string;
  cdnaChange: string;
  syndrome: string;
  clinicalSignificance: string;
  strand: string;
  flankingSequence201bp: string;
  hotspotIndex: number; // 100 for 201bp
  sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT' | 'SAMPLE2_SPERM_DE_NOVO' | 'SAMPLE3_NAR_PAPER_METHYLATION';
  empiricalErrorRate: number; // baseline error rate
  empiricalDepth: number; // typical benchmark depth
  isSplitControl?: boolean; // true for 48 exon-initial split pseudo-dyad negative controls
  spermMethylationPct?: number; // e.g. 89% for true dyads, 0% for split controls
  recommendedMolecules?: number;
  recommendedVaf?: number;
  recommendedDamageRate?: number;
}

export const HOTSPOT_PRESETS: HotspotPreset[] = [
  // --- Sample 1: Alport Patient Targeted Amplicon Deep Sequencing (SRR39847752) ---
  {
    id: 'COL4A5_Gly624',
    gene: 'COL4A5',
    aminoAcidChange: 'Gly624Asp',
    cdnaChange: 'c.1871G>A',
    syndrome: 'Alport Syndrome (X-linked Benchmark)',
    clinicalSignificance: 'Pathogenic (JASN Mutational Hotspot)',
    strand: '+',
    flankingSequence201bp:
      'TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAG' +
      'G' + // pos 100 (0-based) / pos 101 (1-based)
      'ATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT',
    empiricalErrorRate: 0.0003, // 0.03%
    empiricalDepth: 3820,
    recommendedMolecules: 4000,
    recommendedVaf: 0.001, // 0.10% clinical mosaic
    recommendedDamageRate: 0.0003
  },
  {
    id: 'COL4A6_Gly1291',
    gene: 'COL4A6',
    aminoAcidChange: 'Gly1291Arg',
    cdnaChange: 'c.3871G>A',
    syndrome: 'Alport Syndrome with Diffuse Leiomyomatosis',
    clinicalSignificance: 'Pathogenic (Confirmed in Real SRA SRR39847752 at 3,820x depth)',
    strand: '-',
    flankingSequence201bp:
      'ACAGAGGTAGTTACTTCATTTTCTTGAGCTCTGAAATAATGTTTGTTTATTTTTGTTTGTTTCTTAATTCCAGGGTTTCCAAGGTTCTGCAGGAAAGAC' +
      'G' +
      'GGTCCCCCTGGACCAGCTGGACCACGAGGACTGCCTGGTCCACCAGGGCCACCAGGACCTCTGGGTTCTCCTGGCCCACAGGGAGCTTCAGGATTACCT',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT',
    empiricalErrorRate: 0.00013, // 0.013%
    empiricalDepth: 3820,
    recommendedMolecules: 3820,
    recommendedVaf: 0.0008, // 0.08%
    recommendedDamageRate: 0.0003
  },
  {
    id: 'COL4A4_Gly873',
    gene: 'COL4A4',
    aminoAcidChange: 'Gly873Arg',
    cdnaChange: 'c.2617G>A',
    syndrome: 'Autosomal Recessive / Dominant Alport Syndrome',
    clinicalSignificance: 'Pathogenic (Confirmed in Real SRA SRR39847752 at 525x depth)',
    strand: '-',
    flankingSequence201bp:
      'CTGTTGTACAGCCATTCTCTTTCAGAAACTGAAGTTTGCCTTTCATTTATTTCCTTTACCCATCTCTCTCCAGGGTTACCAGGAAAACCAGGACCCATC' +
      'G' +
      'GGCTCCCCGGGCCTTCAAGACCTCCTGGTTTGCCTGGACCCATCGGATCTCCTGGACCTCCTGGTCCAGCAGGTGACATCGGACATCCTGGTCCTCGTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT',
    empiricalErrorRate: 0.0003,
    empiricalDepth: 525,
    recommendedMolecules: 1000, // low depth benchmark
    recommendedVaf: 0.002, // 0.20%
    recommendedDamageRate: 0.0003
  },
  {
    id: 'COL1A1_Gly244',
    gene: 'COL1A1',
    aminoAcidChange: 'Gly244Ser',
    cdnaChange: 'c.730G>A',
    syndrome: 'Osteogenesis Imperfecta / EDS',
    clinicalSignificance: 'Pathogenic (ClinVar Recurrent Hotspot)',
    strand: '+',
    flankingSequence201bp:
      'CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTC' +
      'G' +
      'GCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT',
    empiricalErrorRate: 0.0003,
    empiricalDepth: 4000,
    recommendedMolecules: 5000,
    recommendedVaf: 0.001,
    recommendedDamageRate: 0.0003
  },
  {
    id: 'COL3A1_Gly499',
    gene: 'COL3A1',
    aminoAcidChange: 'Gly499Arg',
    cdnaChange: 'c.1495G>A',
    syndrome: 'Vascular Ehlers-Danlos Syndrome (vEDS)',
    clinicalSignificance: 'Pathogenic (Fatal Arterial Fragility Hotspot)',
    strand: '+',
    flankingSequence201bp:
      'GGCATTCCTGGTCAGCCCGGTGCCAAAGGAGAACCTGGTCCTCCCGGCCTTCCTGGCAACCCAGGTCCACCAGGCCTTCCAGGACAAACCGGCCCTCCA' +
      'G' +
      'GCCCTCCAGGTCCACCTGGTGTCAAAGGTGAAACTGGCAAACCCGGTCCTCCAGGTCTCAGTGGTCCCCCTGGTCCTCCTGGTCCTCAAGGCCTACCAG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE1_COLLAGEN_ALPORT',
    empiricalErrorRate: 0.0003,
    empiricalDepth: 4000,
    recommendedMolecules: 5000,
    recommendedVaf: 0.001,
    recommendedDamageRate: 0.0003
  },

  // --- Sample 2: Human Sperm De Novo Mosaic Deep Sequencing (Breuss et al. Nature Medicine 2020 / PRJNA588332) ---
  {
    id: 'SPERM_COL4A5_Germline',
    gene: 'COL4A5',
    aminoAcidChange: 'Gly624Asp',
    cdnaChange: 'c.1871G>A (Male Germline Mosaic)',
    syndrome: 'Paternal Germline Mosaicism in X-linked Alport Syndrome',
    clinicalSignificance: 'De Novo Hotspot (Sperm Transmission Risk ~0.05%–1%)',
    strand: '+',
    flankingSequence201bp:
      'TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAG' +
      'G' +
      'ATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE2_SPERM_DE_NOVO',
    empiricalErrorRate: 0.0015, // ~0.15% in HiSeq sperm amplicon
    empiricalDepth: 50000,
    recommendedMolecules: 16000, // Raw depth ~160,000x; DCS ~10,200x
    recommendedVaf: 0.0003, // 0.03% ultra-low mosaicism
    recommendedDamageRate: 0.0003
  },
  {
    id: 'SPERM_FGFR3_c1138',
    gene: 'FGFR3',
    aminoAcidChange: 'Gly380Arg',
    cdnaChange: 'c.1138G>A',
    syndrome: 'Achondroplasia (Canonical Male Germline CpG Hotspot)',
    clinicalSignificance: 'Pathogenic (Gold Standard Paternal Age Effect Hotspot)',
    strand: '+',
    flankingSequence201bp:
      'CTTGAGCGTCCCTGTGGACCAAGGACCCCGGGAGCCCTGGCTCCCCGGCATCTCCACCGGGGCCGGCATCATGGCCCACAGGGCACAGGCGGCTCTAG' +
      'G' +
      'AGGTTCTTGTTGCTGCCCGGCATCATGGCCCACAGGGCACAGGCGGCTCTAGGAGGTTCTTGTTGCTGCCAGGCAGTGCTGCCAGCAGCAGCGTCAGTC',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE2_SPERM_DE_NOVO',
    empiricalErrorRate: 0.0015,
    empiricalDepth: 50000,
    recommendedMolecules: 20000, // Raw depth ~200,000x; DCS ~12,800x
    recommendedVaf: 0.00025, // 0.025% transmission risk
    recommendedDamageRate: 0.0003
  },
  {
    id: 'SPERM_COL1A1_Paternal',
    gene: 'COL1A1',
    aminoAcidChange: 'Gly244Ser',
    cdnaChange: 'c.730G>A (Paternal Sperm Mosaic)',
    syndrome: 'Recurrent Lethal Osteogenesis Imperfecta (Gonadal Mosaicism)',
    clinicalSignificance: 'De Novo Hotspot (Paternal Recurrence Risk ~1.4%)',
    strand: '+',
    flankingSequence201bp:
      'CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTC' +
      'G' +
      'GCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE2_SPERM_DE_NOVO',
    empiricalErrorRate: 0.0015,
    empiricalDepth: 50000,
    recommendedMolecules: 16000,
    recommendedVaf: 0.0003,
    recommendedDamageRate: 0.0003
  },

  // --- Sample 3: NAR Paper Sperm WGBS & Built-in Negative Controls (Molaro et al. 2011 GSE30340) ---
  {
    id: 'COL4A5_Gly624_NAR_TrueDyad',
    gene: 'COL4A5',
    aminoAcidChange: 'Gly624Asp',
    cdnaChange: 'c.1871G>A (True Genomic CpG Dyad)',
    syndrome: 'X-linked Alport Syndrome (High-Methylation Germline Mutational Hotspot)',
    clinicalSignificance: 'True Genomic Dyad: 89% Sperm 5mC (GSE30340), gnomAD G>A Present (87% cohort rate)',
    strand: '+',
    flankingSequence201bp:
      'TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAG' +
      'G' +
      'ATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE3_NAR_PAPER_METHYLATION',
    empiricalErrorRate: 0.0005,
    empiricalDepth: 50000,
    isSplitControl: false,
    spermMethylationPct: 89,
    recommendedMolecules: 8000, // DCS ~5,100x
    recommendedVaf: 0.0005, // 0.05%
    recommendedDamageRate: 0.0006 // 0.06% elevated single-strand 5mC deamination
  },
  {
    id: 'COL1A1_Gly244_NAR_TrueDyad',
    gene: 'COL1A1',
    aminoAcidChange: 'Gly244Ser',
    cdnaChange: 'c.730G>A (True Genomic CpG Dyad)',
    syndrome: 'Osteogenesis Imperfecta (NAR Fig 3 & GSE30340 Hotspot)',
    clinicalSignificance: 'True Genomic Dyad: 89% Sperm 5mC, Recurrent Germline Deamination in Male Gamete',
    strand: '+',
    flankingSequence201bp:
      'CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTC' +
      'G' +
      'GCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE3_NAR_PAPER_METHYLATION',
    empiricalErrorRate: 0.0005,
    empiricalDepth: 50000,
    isSplitControl: false,
    spermMethylationPct: 89,
    recommendedMolecules: 8000,
    recommendedVaf: 0.0005,
    recommendedDamageRate: 0.0006
  },
  {
    id: 'COL4A5_ExonInitial_Split_Ctrl',
    gene: 'COL4A5',
    aminoAcidChange: 'Exon-Initial Gly (Split Pseudo-Dyad)',
    cdnaChange: 'Junction C|GGA (Interrupted by Intron in DNA)',
    syndrome: 'NAR Negative Control (mRNA looks like dyad; DNA has no CpG)',
    clinicalSignificance: 'Negative Control: 0% Genomic CpG; gnomAD G>A rate drops from 87% to 31%',
    strand: '+',
    flankingSequence201bp:
      'TTCTTCTTTCCCTTTTCTTGTAGCTTTGCTTCATATTCTCCTCATTTCACATTCCCACCTTCTTTCCATTCTTTCTGCCTCCTTCCTTCCCTTTCCCAG' +
      'G' +
      'GACCTCCAGGACCACCGGGCCCTCCTGGCCCCCCAGGCCCTCCTGGCCCCCCAGGTCCACCTGGACCTCCTGGAGAGAAAGGTTCTCCTGGTATTCCTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE3_NAR_PAPER_METHYLATION',
    empiricalErrorRate: 0.0005,
    empiricalDepth: 50000,
    isSplitControl: true,
    spermMethylationPct: 0,
    recommendedMolecules: 6000,
    recommendedVaf: 0.0, // 0.00% TRUE NEGATIVE CONTROL
    recommendedDamageRate: 0.0001 // baseline damage
  },
  {
    id: 'COL1A1_ExonInitial_Split_Ctrl',
    gene: 'COL1A1',
    aminoAcidChange: 'Exon-Initial Gly (Split Pseudo-Dyad)',
    cdnaChange: 'Junction C|GGA (Interrupted by Intron in DNA)',
    syndrome: 'NAR Negative Control (mRNA looks like dyad; DNA has no CpG)',
    clinicalSignificance: 'Negative Control: 0% Genomic CpG; lack of 5mC deamination abrogates hypermutation',
    strand: '+',
    flankingSequence201bp:
      'TCTGGTTTCTTTTTCCCTTCAGGGTTTCCCTTTTCCCTGTCTTTTGTTTTTCTCCTTCCCCCTCTCTCTTTTCTGTTCCTTCCTGTCTTTTTTTTCCAG' +
      'G' +
      'GACCTCCAGGTCCCCAAGGTTTCCAAGGTCCCCCTGGTCTTCCTGGCATCTCTGGTCCCCTTGGTCCCCCTGGCATCCCTGGTTTCCCTGGTGCCCGTG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE3_NAR_PAPER_METHYLATION',
    empiricalErrorRate: 0.0005,
    empiricalDepth: 50000,
    isSplitControl: true,
    spermMethylationPct: 0,
    recommendedMolecules: 6000,
    recommendedVaf: 0.0,
    recommendedDamageRate: 0.0001
  },
  {
    id: 'COL4A3_ExonInitial_Split_Ctrl',
    gene: 'COL4A3',
    aminoAcidChange: 'Exon-Initial Gly (Split Pseudo-Dyad)',
    cdnaChange: 'Junction C|GGT (Interrupted by Intron in DNA)',
    syndrome: 'NAR Negative Control (mRNA looks like dyad; DNA has no CpG)',
    clinicalSignificance: 'Negative Control: gnomAD Population Frequency Matches Background (~30%)',
    strand: '+',
    flankingSequence201bp:
      'TTACTTCTCTCTTTTCTTTTTAGCATTTTCTTTCTTCTTCATTCTTTTTCTTTTTTCCCTTTCTTTCTCTCTCCTTCCTGTCCCTTTTCTTTTTTCCAG' +
      'G' +
      'GAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAGCCCCTGGACCTCCTGGTCCTCAAG',
    hotspotIndex: 100,
    sourceCohort: 'SAMPLE3_NAR_PAPER_METHYLATION',
    empiricalErrorRate: 0.0005,
    empiricalDepth: 50000,
    isSplitControl: true,
    spermMethylationPct: 0,
    recommendedMolecules: 6000,
    recommendedVaf: 0.0,
    recommendedDamageRate: 0.0001
  }
];

export const SAMPLE1_FASTA_CONTENT = `>COL4A5_c.1871G>A_Alport_Syndrome_Benchmark_201bp
TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAGGATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG
>COL4A6_c.3871G>A_Alport_Leiomyomatosis_201bp
ACAGAGGTAGTTACTTCATTTTCTTGAGCTCTGAAATAATGTTTGTTTATTTTTGTTTGTTTCTTAATTCCAGGGTTTCCAAGGTTCTGCAGGAAAGACGGGTCCCCCTGGACCAGCTGGACCACGAGGACTGCCTGGTCCACCAGGGCCACCAGGACCTCTGGGTTCTCCTGGCCCACAGGGAGCTTCAGGATTACCT
>COL4A4_c.2617G>A_Alport_Syndrome_Autosomal_201bp
CTGTTGTACAGCCATTCTCTTTCAGAAACTGAAGTTTGCCTTTCATTTATTTCCTTTACCCATCTCTCTCCAGGGTTACCAGGAAAACCAGGACCCATCGGGCTCCCCGGGCCTTCAAGACCTCCTGGTTTGCCTGGACCCATCGGATCTCCTGGACCTCCTGGTCCAGCAGGTGACATCGGACATCCTGGTCCTCGTG
>COL1A1_c.730G>A_Osteogenesis_Imperfecta_201bp
CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCGGCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG
>COL3A1_c.1495G>A_Vascular_EDS_Hotspot_201bp
GGCATTCCTGGTCAGCCCGGTGCCAAAGGAGAACCTGGTCCTCCCGGCCTTCCTGGCAACCCAGGTCCACCAGGCCTTCCAGGACAAACCGGCCCTCCAGGCCCTCCAGGTCCACCTGGTGTCAAAGGTGAAACTGGCAAACCCGGTCCTCCAGGTCTCAGTGGTCCCCCTGGTCCTCCTGGTCCTCAAGGCCTACCAG
`;

export const SAMPLE2_SPERM_FASTA_CONTENT = `>SPERM_COL4A5_c.1871G>A_Paternal_Transmission_Mosaic_201bp
TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAGGATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG
>SPERM_FGFR3_c.1138G>A_Male_Germline_DeNovo_Hotspot_201bp
CTTGAGCGTCCCTGTGGACCAAGGACCCCGGGAGCCCTGGCTCCCCGGCATCTCCACCGGGGCCGGCATCATGGCCCACAGGGCACAGGCGGCTCTAGGAGGTTCTTGTTGCTGCCCGGCATCATGGCCCACAGGGCACAGGCGGCTCTAGGAGGTTCTTGTTGCTGCCAGGCAGTGCTGCCAGCAGCAGCGTCAGTC
>SPERM_COL1A1_c.730G>A_Paternal_Gonadal_Mosaicism_201bp
CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCGGCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG
`;

export const SAMPLE3_NAR_FASTA_CONTENT = `>COL4A5_c.1871G>A_NAR_TrueGenomicDyad_89pct_Sperm_5mC_201bp
TCCACCAGGCCTTCCTGGATTTCCAGGTCTTCCTGGCCCTAAAGGTGAAATCGGAGTTCCAGGAATTCCTGGCTCCCCTGGTCTTAAAGGACTGCCAGGATGTGCCTGGTTTGCCAATTGCTGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAG
>COL1A1_c.730G>A_NAR_TrueGenomicDyad_89pct_Sperm_5mC_201bp
CCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCCCTGGTGCCCCTGGCCCCAAGGGTGAGACAGGACCCCCTGGTCCTGCTGGTTTCGGCATACCCGGTCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTGGTTCCCCCGGTCCCTCTGGCCCCAAGGGTCCTCCTGGTCCTCCTGGTCCTCCTG
>COL4A5_ExonInitial_Split_PseudoDyad_Control_0pct_Genomic_CpG_201bp
TTCTTCTTTCCCTTTTCTTGTAGCTTTGCTTCATATTCTCCTCATTTCACATTCCCACCTTCTTTCCATTCTTTCTGCCTCCTTCCTTCCCTTTCCCAGGGACCTCCAGGACCACCGGGCCCTCCTGGCCCCCCAGGCCCTCCTGGCCCCCCAGGTCCACCTGGACCTCCTGGAGAGAAAGGTTCTCCTGGTATTCCTG
>COL1A1_ExonInitial_Split_PseudoDyad_Control_0pct_Genomic_CpG_201bp
TCTGGTTTCTTTTTCCCTTCAGGGTTTCCCTTTTCCCTGTCTTTTGTTTTTCTCCTTCCCCCTCTCTCTTTTCTGTTCCTTCCTGTCTTTTTTTTCCAGGGACCTCCAGGTCCCCAAGGTTTCCAAGGTCCCCCTGGTCTTCCTGGCATCTCTGGTCCCCTTGGTCCCCCTGGCATCCCTGGTTTCCCTGGTGCCCGTG
>COL4A3_ExonInitial_Split_PseudoDyad_Control_0pct_Genomic_CpG_201bp
TTACTTCTCTCTTTTCTTTTTAGCATTTTCTTTCTTCTTCATTCTTTTTCTTTTTTCCCTTTCTTTCTCTCTCCTTCCTGTCCCTTTTCTTTTTTCCAGGGAATTCCTGGGCCACCTGGTTCTCCTGGACACCCTGGACCCCCTGGTCCTCAAGGACCAAGTGGACCTCCTGGAGCCCCTGGACCTCCTGGTCCTCAAG
`;

// Legacy alias for backward compatibility
export const SAMPLE_FASTA_CONTENT = SAMPLE1_FASTA_CONTENT;
