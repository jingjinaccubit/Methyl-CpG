export interface CollagenGeneInfo {
  type: string; // e.g. 'Type I', 'Type IV'
  gene: string; // e.g. 'COL4A5'
  name: string; // e.g. 'Collagen Type IV Alpha 5 Chain'
  chr: string; // e.g. 'X'
  omim: string; // e.g. '303630'
  disease: string; // e.g. 'Alport syndrome (X-linked dominant)'
  inheritance: string; // e.g. 'XLD', 'AD', 'AR'
  transcriptId: string; // e.g. 'ENST00000328300'
  refseqId: string; // e.g. 'NM_033380.3'
  proteinId?: string; // e.g. 'NP_203699.1'
  hasPreloadedCds: boolean;
  hgncId?: string; // from collagentable.xlsx e.g. 'HGNC:2207'
  ncbiGeneId?: string; // from collagentable.xlsx e.g. '1287'
  ensemblGeneId?: string; // from collagentable.xlsx e.g. 'ENSG00000188153'
  chromosomeBand?: string; // from collagentable.xlsx e.g. 'Xq22.3'
  locusType?: string; // from collagentable.xlsx e.g. 'gene with protein product' | 'pseudogene'
  previousSymbols?: string; // from collagentable.xlsx
  aliasSymbols?: string; // from collagentable.xlsx
}

export interface CodonInfo {
  index: number; // 0-based
  pos: number; // 1-based codon position
  codon: string;
  aa: string;
  isCollagenous: boolean;
  isGlycine: boolean;
  register?: 'Gly' | 'Xaa' | 'Yaa' | 'Noncollagenous';
  domainType: '7S' | 'Collagenous' | 'NC1' | 'Unspecified';
}

export interface CpGSite {
  id: string;
  type: 'dyad' | 'incodon';
  residueIndex: number; // 1-based amino acid position
  residueName: string; // e.g. 'Gly123'
  cStart: number; // 1-based cDNA start nucleotide
  prevCodon: string;
  prevAA: string;
  codon: string;
  aa: string;
  nextCodon?: string;
  nextAA?: string;
  junctionDna: string; // e.g. '[CCC] [GGA]'
  cDnaChange: string; // e.g. 'c.367G>A'
  aaChange: string; // e.g. 'p.Gly123Arg'
  mutCodon: string; // e.g. 'AGA'
  mutAA: string; // e.g. 'Arg'
  substitutionClass: 'High Destabilization (Arg)' | 'Moderate Destabilization (Ser)' | 'Other';
  clinvar: {
    reported: boolean;
    isPathogenicOrLikely: boolean; // true if P, LP, or P/LP
    significanceCode: 'P' | 'LP' | 'P/LP' | 'VUS' | 'Conflicting' | 'B/LB' | 'Other' | 'Candidate' | 'Unknown';
    significanceLabel: string; // e.g. 'Pathogenic (P)', 'Likely Pathogenic (LP)'
    variationId?: string;
    reviewStatus?: string;
    multipleSubmitters?: boolean;
    clinicalSignificance?: string;
    isBenchmarkHotspot?: boolean;
    phenotype?: string;
  };
  gnomad: {
    mutability: number; // mutation rate / probability (e.g. 1.25e-7)
    percentile: number; // e.g. 99.4%
    alleleFrequency: number;
    alleleCount: number;
    alleleNumber?: number;
    variantId?: string;
    observedInGnomad?: boolean;
    classification: 'Prone to Recurrent De Novo' | 'Potential Somatic De Novo' | 'Germline / Low Mutability' | 'Candidate Hotspot (Unreported)';
  };
}

export interface StatisticalMetric {
  or: number;
  ciLower: number;
  ciUpper: number;
  pValue: number;
  formattedP: string;
}

export interface T1Stats {
  totalCodons: number;
  totalGlycines: number;
  collagenousGlycines: number;
  noncollagenousCodons: number;
  
  // CpG Dyads
  cpgDyadsCount: number;
  cpgDyadsPct: number;
  genomeDyadsPct: number; // 14.3% from paper (104,875 of 732,543)
  noncollagenousDyadsCount: number;
  noncollagenousDyadsPct: number;
  
  oddsRatioGenome: StatisticalMetric;
  oddsRatioNoncoll: StatisticalMetric;
  
  // G-initial controls (Ala, Val, Asp, Glu)
  gInitialAminoAcids: {
    glyDyadCount: number;
    glyTotal: number;
    controlDyadCount: number;
    controlTotal: number;
    metric: StatisticalMetric;
  };

  // Yaa Prolines
  prolineAnalysis: {
    yaaCounts: { CCA: number; CCC: number; CCG: number; CCT: number; total: number };
    otherCounts: { CCA: number; CCC: number; CCG: number; CCT: number; total: number };
    genomeUsage: { CCA: number; CCC: number; CCG: number; CCT: number };
    chiSquare: { chi2: number; pValue: number; df: number; formattedP: string };
    cccDepletionMetric: StatisticalMetric;
  };

  // Non-proline Yaa capable of ending in C
  nonProlineCapable: {
    yaaC: number;
    yaaTotal: number;
    otherC: number;
    otherTotal: number;
    metric: StatisticalMetric;
  };

  inCodonCpGsCount: number;
}

export interface T2Stats {
  cpgDyadReportedCount: number;
  cpgDyadTotal: number;
  cpgDyadPlpCount: number; // total P, LP, P/LP
  cpgDyadPCount: number; // strictly Pathogenic
  cpgDyadLpCount: number; // strictly Likely Pathogenic
  cpgDyadBothPlpCount: number; // Pathogenic/Likely pathogenic
  cpgDyadVusCount: number; // VUS
  cpgDyadCandidateCount: number; // Candidate / Unreported
  nonCpgReportedCount: number;
  nonCpgTotal: number;
  cpgReportingRatePct: number;
  nonCpgReportingRatePct: number;
  reportingOddsRatio: StatisticalMetric;

  // Multiple submitters proxy for recurrence
  cpgMultiSubmittersCount: number;
  cpgMultiSubmittersPct: number;
  nonCpgMultiSubmittersCount: number;
  nonCpgMultiSubmittersPct: number;
  multiSubmitterOddsRatio: StatisticalMetric;

  knownVariantsCount: number;
}

export interface T3Stats {
  avgMutabilityCpG: number; // e.g. 1.25e-7
  avgMutabilityBaseline: number; // e.g. 1.20e-8
  foldElevation: number; // e.g. 10.4x
  deNovoPredictedCount: number;
  somaticDeNovoPredictedCount: number;
  candidateHotspotsCount: number;
  lowRiskCount: number;
}

export interface SequenceAnalysisResult {
  geneSymbol: string;
  geneInfo?: CollagenGeneInfo;
  transcriptId?: string;
  cdsLength: number;
  proteinLength: number;
  rawSequence: string;
  proteinSequence: string;
  codons: CodonInfo[];
  cpgDyads: CpGSite[];
  inCodonCpGs: CpGSite[];
  allCpGSites: CpGSite[];
  t1: T1Stats;
  t2: T2Stats;
  t3: T3Stats;
  logoData: {
    nucleotideYaaGlyXaa: { position: string; label: string; freq: { A: number; C: number; G: number; T: number } }[];
    aminoAcidRegister: { register: string; freq: Record<string, number> }[];
  };
}
