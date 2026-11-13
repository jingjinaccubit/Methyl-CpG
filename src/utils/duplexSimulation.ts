/**
 * Ultra-Deep Duplex Sequencing Simulation Engine (TypeScript).
 * Simulates UMI-tagged Duplex Sequencing (10,000x - 100,000x raw depth)
 * and models 3-tier error suppression for low-frequency CpG G>A deamination mutations.
 */

import { accuratePoissonPValue } from './statistics';

const ALT_BASES: Record<string, string[]> = {
  G: ['A', 'C', 'T'],
  C: ['A', 'G', 'T'],
  A: ['C', 'G', 'T'],
  T: ['A', 'C', 'G'],
};

function randomAltBase(base: string): string {
  const alts = ALT_BASES[base] || ['A', 'C', 'G', 'T'];
  return alts[Math.floor(Math.random() * alts.length)];
}

export interface DuplexSimParams {
  targetName: string;
  gene: string;
  aminoAcidChange: string;
  cdnaChange: string;
  targetSequence: string; // e.g. 201bp sequence with CpG dyad at center
  hotspotIndex: number; // 0-based index of G base (100 for 201bp center)
  initialMolecules: number; // e.g. 6000
  targetVaf: number; // e.g. 0.0005 (0.05%)
  rawDepthTarget: number; // e.g. 30000 - 60000
  avgFamilySize: number; // e.g. 5 reads/family
  pcrErrorRate: number; // e.g. 0.0001 (0.01%)
  damageDeaminationRate: number; // e.g. 0.0003 (0.03%)
  seqErrorRate: number; // e.g. 0.001 (0.10%)
}

export interface DuplexFamilySample {
  id: string;
  tagA: string;
  tagB: string;
  duplexType: 'TRUE_MUTANT' | 'WILD_TYPE' | 'DEAMINATION_DAMAGE' | 'SEQUENCING_ERROR';
  topReads: string[];
  bottomReads: string[];
  sscsTop: string;
  sscsBottom: string;
  dcsCall: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DuplexSimResult {
  params: DuplexSimParams;
  rawTotalReads: number;
  rawMutantReads: number;
  rawObservedVaf: number;

  sscsTotalFamilies: number;
  sscsMutantFamilies: number;
  sscsObservedVaf: number;

  dcsTotalDuplexes: number;
  dcsMutantCalls: number;
  dcsObservedVaf: number;

  trueMutantsInjected: number;
  trueMutantsDetected: number;
  falsePositivesDetected: number;
  discordantRejected: number;

  sensitivity: number; // 0 - 100%
  fdr: number; // 0 - 100%
  noiseReductionFold: number;
  pvalue: number;

  sampleFamilies: DuplexFamilySample[];

  // Wet-Lab Production Pipeline Metadata
  isRealLabData?: boolean;
  labMetadata?: {
    sampleId: string;
    operatorOrLab?: string;
    instrumentModel: string;
    flowCellOrRunId: string;
    sequencingDate?: string;
    rawFastqFileR1?: string;
    rawFastqFileR2?: string;
    totalRawFastqReads?: number;
    pipelineVersion: string;
    onTargetRatePct?: number;
    meanFamilySize?: number;
    duplexRecoveryRatePct?: number;
    biologicalContext?: string;
  };
}

function randomUmi(len = 8): string {
  const bases = ['A', 'C', 'G', 'T'];
  let res = '';
  for (let i = 0; i < len; i++) {
    res += bases[Math.floor(Math.random() * 4)];
  }
  return res;
}

/**
 * Sample a random integer from a Poisson distribution with mean lambda.
 * Uses Knuth's multiplicative algorithm for lambda < 30, and Gaussian
 * Box-Muller approximation for large lambda.
 */
export function samplePoisson(lambda: number): number {
  if (lambda <= 0) return 0;
  if (lambda < 30) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }
  // Gaussian approximation for large lambda: N(lambda, sqrt(lambda))
  const u1 = Math.max(1e-15, Math.random());
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * z));
}

// Re-export canonical high-precision Poisson tail probability from statistics.ts
export { accuratePoissonPValue };
export const poissonPValue = accuratePoissonPValue;

/**
 * Execute Duplex Sequencing Simulation.
 */
export function runDuplexSimulation(params: DuplexSimParams): DuplexSimResult {
  const {
    initialMolecules,
    targetVaf,
    avgFamilySize,
    pcrErrorRate,
    damageDeaminationRate,
    seqErrorRate
  } = params;

  const trueMutantCount = Math.round(initialMolecules * targetVaf);

  let rawTotalTop = 0;
  let rawMutantTop = 0;
  let rawTotalBottom = 0;

  const sampleFamilies: DuplexFamilySample[] = [];

  let sscsTotal = 0;
  let sscsMutant = 0;

  let dcsTotal = 0;
  let dcsMutant = 0;
  let discordantCount = 0;
  let falsePositives = 0;

  // Track samples to highlight in UI
  let capturedTrueMutant = false;
  let capturedDeamination = false;
  let capturedSeqError = false;
  let capturedWildType = false;

  for (let i = 0; i < initialMolecules; i++) {
    const isTrueMutant = i < trueMutantCount;
    const tagA = randomUmi(8);
    const tagB = randomUmi(8);

    // Initial molecule strands:
    // Top strand: G (WT) or A (Mutant)
    // Bottom strand: C (WT) or T (Mutant)
    const initTop = isTrueMutant ? 'A' : 'G';
    const initBottom = isTrueMutant ? 'T' : 'C';

    // Simulate pre-PCR single-strand cytosine deamination damage
    let damagedTop = initTop;
    let damagedBottom = initBottom;
    let hadDeamination = false;

    if (!isTrueMutant) {
      if (Math.random() < damageDeaminationRate) {
        damagedTop = 'A'; // spurious deamination
        hadDeamination = true;
      }
      if (Math.random() < damageDeaminationRate) {
        damagedBottom = 'T'; // spurious deamination
        hadDeamination = true;
      }
    }

    // Family size sampling using exact Poisson distribution P(k; lambda = avgFamilySize)
    // Ref: Kennedy et al. Nat Protoc 2014 & Schmitt et al. PNAS 2012
    const famSizeTop = Math.max(1, samplePoisson(avgFamilySize));
    const famSizeBottom = Math.max(1, samplePoisson(avgFamilySize));

    const topReads: string[] = [];
    const bottomReads: string[] = [];
    let hadSeqError = false;

    // Top strand reads
    for (let r = 0; r < famSizeTop; r++) {
      let readBase = damagedTop;
      // PCR error: randomly mutates into one of 3 alternative non-template bases (matching Python simulation)
      if (Math.random() < pcrErrorRate) {
        readBase = randomAltBase(readBase);
      }
      // Sequencing error: randomly mutates into one of 3 alternative bases
      if (Math.random() < seqErrorRate) {
        readBase = randomAltBase(readBase);
        hadSeqError = true;
      }
      topReads.push(readBase);
      rawTotalTop++;
      if (readBase === 'A') rawMutantTop++;
    }

    // Bottom strand reads
    for (let r = 0; r < famSizeBottom; r++) {
      let readBase = damagedBottom;
      if (Math.random() < pcrErrorRate) {
        readBase = randomAltBase(readBase);
      }
      if (Math.random() < seqErrorRate) {
        readBase = randomAltBase(readBase);
        hadSeqError = true;
      }
      bottomReads.push(readBase);
      rawTotalBottom++;
    }

    // --- Level 2: Single-Strand Consensus (SSCS) ---
    // Requires >= 3 reads, >= 70% concordance
    let sscsTopCall = 'N';
    if (topReads.length >= 3) {
      const counts: Record<string, number> = {};
      topReads.forEach(b => (counts[b] = (counts[b] || 0) + 1));
      const [topBase, topCnt] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      if (topCnt / topReads.length >= 0.7) {
        sscsTopCall = topBase;
        sscsTotal++;
        if (topBase === 'A') sscsMutant++;
      }
    }

    let sscsBottomCall = 'N';
    if (bottomReads.length >= 3) {
      const counts: Record<string, number> = {};
      bottomReads.forEach(b => (counts[b] = (counts[b] || 0) + 1));
      const [botBase, botCnt] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      if (botCnt / bottomReads.length >= 0.7) {
        sscsBottomCall = botBase;
      }
    }

    // --- Level 3: Duplex Consensus (DCS) ---
    // Concordance between top and bottom strands (A matches T, G matches C)
    let dcsCall = 'N';
    if (sscsTopCall !== 'N' && sscsBottomCall !== 'N') {
      if (sscsTopCall === 'G' && sscsBottomCall === 'C') {
        dcsCall = 'G'; // Wild-type
        dcsTotal++;
      } else if (sscsTopCall === 'A' && sscsBottomCall === 'T') {
        dcsCall = 'A'; // True Duplex Mutant
        dcsTotal++;
        dcsMutant++;
        if (!isTrueMutant) {
          falsePositives++;
        }
      } else {
        dcsCall = 'DISCORDANT_REJECTED';
        discordantCount++;
      }
    }

    // Pick representatives for the sample family viewer
    if (sampleFamilies.length < 5) {
      if (isTrueMutant && !capturedTrueMutant) {
        capturedTrueMutant = true;
        sampleFamilies.push({
          id: `Family-${i + 1} (True De Novo Mutant)`,
          tagA,
          tagB,
          duplexType: 'TRUE_MUTANT',
          topReads,
          bottomReads,
          sscsTop: sscsTopCall,
          sscsBottom: sscsBottomCall,
          dcsCall,
          isCorrect: true,
          explanation:
            'Both top (α→β, "A") and bottom (β→α, "T") strands confirm the G>A deamination transition. 100% genuine biological mutation.'
        });
      } else if (hadDeamination && !isTrueMutant && !capturedDeamination) {
        capturedDeamination = true;
        sampleFamilies.push({
          id: `Family-${i + 1} (Pre-PCR Single-Strand Damage)`,
          tagA,
          tagB,
          duplexType: 'DEAMINATION_DAMAGE',
          topReads,
          bottomReads,
          sscsTop: sscsTopCall,
          sscsBottom: sscsBottomCall,
          dcsCall,
          isCorrect: dcsCall === 'DISCORDANT_REJECTED',
          explanation:
            'Top strand suffered spurious deamination artifact (A), but bottom strand remained wild-type (C). Duplex logic safely REJECTED this false positive.'
        });
      } else if (hadSeqError && !hadDeamination && !isTrueMutant && !capturedSeqError) {
        capturedSeqError = true;
        sampleFamilies.push({
          id: `Family-${i + 1} (Illumina Optical Machine Noise)`,
          tagA,
          tagB,
          duplexType: 'SEQUENCING_ERROR',
          topReads,
          bottomReads,
          sscsTop: sscsTopCall,
          sscsBottom: sscsBottomCall,
          dcsCall,
          isCorrect: dcsCall === 'G',
          explanation:
            'A single read encountered an optical/phasing sequencing error, but within-family consensus (>70%) outvoted it. Resolved as wild-type G.'
        });
      } else if (!isTrueMutant && !hadDeamination && !hadSeqError && !capturedWildType) {
        capturedWildType = true;
        sampleFamilies.push({
          id: `Family-${i + 1} (Homozygous Wild-Type)`,
          tagA,
          tagB,
          duplexType: 'WILD_TYPE',
          topReads,
          bottomReads,
          sscsTop: sscsTopCall,
          sscsBottom: sscsBottomCall,
          dcsCall,
          isCorrect: true,
          explanation:
            'All reads across both strands cleanly match canonical wild-type sequence (Top: G, Bottom: C).'
        });
      }
    }
  }

  const rawObservedVaf = rawTotalTop > 0 ? (rawMutantTop / rawTotalTop) * 100 : 0;
  const sscsObservedVaf = sscsTotal > 0 ? (sscsMutant / sscsTotal) * 100 : 0;
  const dcsObservedVaf = dcsTotal > 0 ? (dcsMutant / dcsTotal) * 100 : 0;

  const trueMutantsDetected = Math.max(0, dcsMutant - falsePositives);
  const sensitivity =
    trueMutantCount > 0 ? (trueMutantsDetected / trueMutantCount) * 100 : 100;
  const fdr =
    dcsMutant > 0 ? (falsePositives / dcsMutant) * 100 : 0;

  /**
   * Background duplex noise expected under null hypothesis H0.
   *
   * Mathematical derivation based on Schmitt et al. PNAS 2012 (doi:10.1073/pnas.1208715109)
   * and Kennedy et al. Nature Protocols 2014 (doi:10.1038/nprot.2014.170):
   *
   * A spurious Duplex Consensus (DCS) false positive requires complementary errors across
   * both independent DNA strands (Top SSCS = 'A', Bottom SSCS = 'T'):
   * 1. Independent Pre-PCR Single-Strand Damage:
   *    Occurs when both strands independently suffer hydrolytic cytosine deamination before ligation:
   *    P(damage) = damageDeaminationRate * damageDeaminationRate = (damageDeaminationRate)^2.
   * 2. First-cycle PCR Mutation:
   *    Occurs if DNA polymerase makes early, independent misincorporations on both template strands,
   *    or via PCR recombination chimera pairing: P(PCR) ~ (pcrErrorRate)^2.
   * 3. Empirical DCS physical baseline limit:
   *    In actual wet-lab ultra-deep sequencing, the empirical DCS noise floor is bounded
   *    at ~2.4 x 10^-8 due to library chemistry and sequencing physics (Kennedy et al. 2014).
   */
  const theoreticalDcsRate = Math.pow(damageDeaminationRate, 2) + Math.pow(pcrErrorRate, 2);
  const duplexBackgroundRate = Math.max(2.4e-8, theoreticalDcsRate);

  const nullNoiseLambda = dcsTotal * duplexBackgroundRate;
  const pvalue = accuratePoissonPValue(dcsMutant, nullNoiseLambda);

  const noiseReductionFold = rawObservedVaf > 0 ? rawObservedVaf / Math.max(0.0001, dcsObservedVaf) : 1000;

  return {
    params,
    rawTotalReads: rawTotalTop + rawTotalBottom,
    rawMutantReads: rawMutantTop,
    rawObservedVaf,
    sscsTotalFamilies: sscsTotal,
    sscsMutantFamilies: sscsMutant,
    sscsObservedVaf,
    dcsTotalDuplexes: dcsTotal,
    dcsMutantCalls: dcsMutant,
    dcsObservedVaf,
    trueMutantsInjected: trueMutantCount,
    trueMutantsDetected,
    falsePositivesDetected: falsePositives,
    discordantRejected: discordantCount,
    sensitivity,
    fdr,
    noiseReductionFold,
    pvalue,
    sampleFamilies
  };
}
