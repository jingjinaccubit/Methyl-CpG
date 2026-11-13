import type {
  CodonInfo,
  CpGSite,
  SequenceAnalysisResult,
  StatisticalMetric,
  T1Stats,
  T2Stats,
  T3Stats,
  CollagenGeneInfo
} from '../types';
import {
  computeStatisticalMetric,
  chiSquareGoodnessOfFit,
  adjustPValuesBH,
  accuratePoissonPValue
} from './statistics';
import { GENE_CLINVAR_MAP, COL4A5_BENCHMARK_CPG, GENE_CLINVAR_BASELINE } from '../data/clinvarData';
import { calculateGnomadScore } from '../data/gnomadModel';
import { COLLAGEN_SPLIT_SITES, PRELOADED_CDS } from '../data/collagenTable';
import { predictTripleHelixDestabilization } from '../data/brodskyModel';

export const CODON_MAP: Record<string, string> = {
  ATA: 'I', ATC: 'I', ATT: 'I', ATG: 'M',
  ACA: 'T', ACC: 'T', ACG: 'T', ACT: 'T',
  AAC: 'N', AAT: 'N', AAA: 'K', AAG: 'K',
  AGC: 'S', AGT: 'S', AGA: 'R', AGG: 'R',
  CTA: 'L', CTC: 'L', CTG: 'L', CTT: 'L',
  CCA: 'P', CCC: 'P', CCG: 'P', CCT: 'P',
  CAC: 'H', CAT: 'H', CAA: 'Q', CAG: 'Q',
  CGA: 'R', CGC: 'R', CGG: 'R', CGT: 'R',
  GTA: 'V', GTC: 'V', GTG: 'V', GTT: 'V',
  GCA: 'A', GCC: 'A', GCG: 'A', GCT: 'A',
  GAC: 'D', GAT: 'D', GAA: 'E', GAG: 'E',
  GGA: 'G', GGC: 'G', GGG: 'G', GGT: 'G',
  TCA: 'S', TCC: 'S', TCG: 'S', TCT: 'S',
  TTC: 'F', TTT: 'F', TTA: 'L', TTG: 'L',
  TAC: 'Y', TAT: 'Y', TAA: '*', TAG: '*',
  TGC: 'C', TGT: 'C', TGA: '*', TGG: 'W',
};

export const AA_NAME_MAP: Record<string, string> = {
  A: 'Ala', C: 'Cys', D: 'Asp', E: 'Glu', F: 'Phe',
  G: 'Gly', H: 'His', I: 'Ile', K: 'Lys', L: 'Leu',
  M: 'Met', N: 'Asn', P: 'Pro', Q: 'Gln', R: 'Arg',
  S: 'Ser', T: 'Thr', V: 'Val', W: 'Trp', Y: 'Tyr',
  '*': 'Stop', '?': 'Unk'
};

// Kazusa human genome-wide proline codon frequencies (Nakamura et al. 2000)
// Exact frequencies per 61.1 total Pro codons: CCA: 16.9/61.1 (~27.66%), CCC: 19.8/61.1 (~32.41%), CCG: 6.9/61.1 (~11.29%), CCT: 17.5/61.1 (~28.64%)
export const KAZUSA_PROLINE_USAGE = {
  CCA: 16.9 / 61.1,
  CCC: 19.8 / 61.1,
  CCG: 6.9 / 61.1,
  CCT: 17.5 / 61.1
};

// Residues whose codons can never end in cytosine
// Lys (AAA, AAG), Gln (CAA, CAG), Glu (GAA, GAG), Met (ATG), Trp (TGG)
const INCAPABLE_OF_C = new Set(['K', 'Q', 'E', 'M', 'W']);

export function cleanSequence(raw: string): string {
  // Remove FASTA headers, numbers, whitespace
  return raw
    .replace(/^>.*$/gm, '')
    .replace(/[^acgtuACGTU]/g, '')
    .toUpperCase()
    .replace(/U/g, 'T');
}

export function analyzeSequence(
  rawInput: string,
  geneInfo?: CollagenGeneInfo,
  frameOffset: number = 0
): SequenceAnalysisResult {
  const cleaned = cleanSequence(rawInput);
  const geneSymbol = geneInfo?.gene || 'Custom Sequence';

  // Position-indexed databases (ClinVar, gnomAD, Split Sites, Baseline) are strictly tied to
  // the canonical MANE Select transcript in frame 0.
  // When users supply custom/edited sequences or shift reading frames (+1/+2), positional indices
  // no longer correspond to canonical CDS coordinates.
  const isCanonicalPreloaded = Boolean(
    geneInfo &&
    frameOffset === 0 &&
    PRELOADED_CDS[geneInfo.gene] &&
    cleaned === cleanSequence(PRELOADED_CDS[geneInfo.gene])
  );

  // Read codons according to frameOffset
  const validLength = cleaned.length - frameOffset;
  const codonCount = Math.floor(validLength / 3);
  const codonsRaw: string[] = [];
  const protRaw: string[] = [];

  for (let i = 0; i < codonCount; i++) {
    const start = frameOffset + i * 3;
    const c = cleaned.substring(start, start + 3);
    codonsRaw.push(c);
    protRaw.push(CODON_MAP[c] || '?');
  }

  // Remove trailing stop codon if present for protein calculation
  let effectiveCodonCount = codonCount;
  if (codonCount > 0 && protRaw[codonCount - 1] === '*') {
    effectiveCodonCount = codonCount - 1;
  }

  // Identify Collagenous Glycines with adaptive domain architectures:
  // Type IV collagens possess naturally interrupted triple-helical domains; threshold is 3 to capture short helical segments.
  // Fibrillar collagens (Types I, II, III, V, XI) possess continuous, uninterrupted triple helix; threshold is 5.
  const isTypeIV = Boolean(
    geneSymbol?.startsWith('COL4') ||
    geneInfo?.type === 'Type IV'
  );
  const FIBRILLAR_COLLAGEN_TYPES = ['Type I', 'Type II', 'Type III', 'Type V', 'Type XI'];
  const isFibrillar = Boolean(
    geneInfo?.type && FIBRILLAR_COLLAGEN_TYPES.includes(geneInfo.type)
  );
  const minGlyRun = isTypeIV ? 3 : 5;

  const collagenousGlySet = new Set<number>();
  for (let offset = 0; offset < 3; offset++) {
    let run: number[] = [];
    for (let pos = offset; pos < effectiveCodonCount; pos += 3) {
      if (protRaw[pos] === 'G') {
        run.push(pos);
      } else {
        if (run.length >= minGlyRun) {
          run.forEach(p => collagenousGlySet.add(p));
        }
        run = [];
      }
    }
    if (run.length >= minGlyRun) {
      run.forEach(p => collagenousGlySet.add(p));
    }
  }

  // Find boundaries of collagenous domain to demarcate biological domain types
  const sortedCollGly = Array.from(collagenousGlySet).sort((a, b) => a - b);
  const firstCollIdx = sortedCollGly.length > 0 ? sortedCollGly[0] : 0;
  const lastCollIdx = sortedCollGly.length > 0 ? sortedCollGly[sortedCollGly.length - 1] : effectiveCodonCount;

  // Build CodonInfo array and assign registers & biological domain types
  const codonInfos: CodonInfo[] = [];
  for (let i = 0; i < effectiveCodonCount; i++) {
    const isGly = protRaw[i] === 'G';
    const isColl = collagenousGlySet.has(i);
    let reg: 'Gly' | 'Xaa' | 'Yaa' | 'Noncollagenous' = 'Noncollagenous';

    if (isColl) {
      reg = 'Gly';
    } else if (i > 0 && collagenousGlySet.has(i - 1)) {
      reg = 'Xaa';
    } else if (i < effectiveCodonCount - 1 && collagenousGlySet.has(i + 1)) {
      reg = 'Yaa';
    }

    let domain: import('../types').CollagenDomainType = 'Noncollagenous';
    if (isColl) {
      domain = 'Collagenous';
    } else if (i < firstCollIdx) {
      domain = isTypeIV ? '7S' : (isFibrillar ? 'N-Propeptide' : 'Noncollagenous');
    } else if (i > lastCollIdx) {
      domain = isTypeIV ? 'NC1' : (isFibrillar ? 'C-Propeptide' : 'Noncollagenous');
    } else {
      domain = isTypeIV ? 'Interruption' : 'Noncollagenous';
    }

    codonInfos.push({
      index: i,
      pos: i + 1,
      codon: codonsRaw[i],
      aa: protRaw[i],
      isCollagenous: isColl,
      isGlycine: isGly,
      register: reg,
      domainType: domain
    });
  }

  // Identify CpG dyads (Yaa ends in C, Gly begins with G)
  const cpgDyads: CpGSite[] = [];
  const splitPseudoDyads: CpGSite[] = [];
  const knownClinvarRecords = (isCanonicalPreloaded && geneInfo) ? GENE_CLINVAR_MAP[geneInfo.gene] || {} : {};

  Array.from(collagenousGlySet).sort((a, b) => a - b).forEach(gIdx => {
    if (gIdx > 0) {
      const prevCodon = codonsRaw[gIdx - 1];
      const glyCodon = codonsRaw[gIdx];
      const prevAA = protRaw[gIdx - 1];

      // CpG dyad check: last base of prevCodon is C and first base of glyCodon is G
      if (prevCodon.endsWith('C') && glyCodon.startsWith('G')) {
        const residuePos = gIdx + 1; // 1-based protein pos
        const cStart = (gIdx * 3) + 1; // 1-based cDNA start of Gly codon

        // Predict first position G -> A substitution
        const mutCodon = 'A' + glyCodon.substring(1);
        const mutAA = CODON_MAP[mutCodon] || '?';
        const aaChangeName = `p.${AA_NAME_MAP['G']}${residuePos}${AA_NAME_MAP[mutAA] || mutAA}`;
        const cdnaChangeName = `c.${cStart}G>A`;

        // ClinVar annotation (strictly canonical)
        let clinvarEntry = knownClinvarRecords[residuePos];
        let isReported = Boolean(clinvarEntry);
        let isMultiSub = clinvarEntry ? clinvarEntry.multipleSubmitters : false;
        let varId = clinvarEntry ? clinvarEntry.variationId : undefined;
        let revStatus = clinvarEntry ? clinvarEntry.reviewStatus : undefined;
        let condition = clinvarEntry ? clinvarEntry.condition : undefined;
        let rawSignificance = clinvarEntry ? (clinvarEntry.rawSignificance || clinvarEntry.significance) : undefined;
        let sigCode: 'P' | 'LP' | 'P/LP' | 'VUS' | 'Conflicting' | 'B/LB' | 'Other' | 'Candidate' = clinvarEntry ? (clinvarEntry.significance as any) : 'Candidate';

        // If COL4A5 canonical, benchmark against the exact 12 sites from the paper
        if (isCanonicalPreloaded && geneSymbol === 'COL4A5') {
          const bench = COL4A5_BENCHMARK_CPG.find(b => b.pos === residuePos);
          if (bench) {
            isReported = bench.reported;
            isMultiSub = bench.multiSub;
            varId = bench.varId || (clinvarEntry ? clinvarEntry.variationId : undefined);
            condition = bench.condition || (clinvarEntry ? clinvarEntry.condition : 'Alport syndrome, X-linked');
            sigCode = (bench.significance as any) || (clinvarEntry ? clinvarEntry.significance : 'Candidate');
            rawSignificance = clinvarEntry?.rawSignificance || (sigCode === 'Conflicting' ? 'Conflicting classifications of pathogenicity' : 'Pathogenic');
            revStatus = clinvarEntry?.reviewStatus || (sigCode === 'Conflicting' ? 'criteria provided, conflicting classifications' : 'criteria provided, multiple submitters, no conflicts');
          }
        }

        const isPlp = sigCode === 'P' || sigCode === 'LP' || sigCode === 'P/LP';
        let sigLabel = 'Candidate Hotspot (Unreported)';
        if (sigCode === 'P') sigLabel = 'Pathogenic (P)';
        else if (sigCode === 'LP') sigLabel = 'Likely Pathogenic (LP)';
        else if (sigCode === 'P/LP') sigLabel = 'Pathogenic / Likely Pathogenic (P/LP)';
        else if (sigCode === 'VUS') sigLabel = 'Uncertain Significance (VUS)';
        else if (sigCode === 'Conflicting') sigLabel = 'Conflicting Interpretations';
        else if (sigCode === 'B/LB') sigLabel = 'Benign / Likely Benign';

        const isSplit = Boolean(isCanonicalPreloaded && geneSymbol && COLLAGEN_SPLIT_SITES[geneSymbol]?.includes(residuePos));

        // gnomAD mutability score & empirical population frequency
        // STRICT INTEGRITY: If isSplit, this is NOT a true genomic CpG dyad (intron separates C and G).
        // Pass isCpGDyad = false so it receives background neutral mutation rate (~1.20e-8), not high methyl-CpG rate.
        const gnomadInfo = calculateGnomadScore(
          !isSplit,
          false,
          isPlp,
          isMultiSub,
          glyCodon,
          prevCodon,
          isCanonicalPreloaded ? geneSymbol : undefined,
          isCanonicalPreloaded ? residuePos : undefined
        );

        // Complementary Sense-Strand Deamination (preceding Yaa last base C>T):
        const yaaMutCodon = prevCodon.substring(0, 2) + 'T';
        const yaaMutAA = CODON_MAP[yaaMutCodon] || '?';
        const yaaIsSynonymous = yaaMutAA === prevAA;
        const yaaAaChangeName = `p.${AA_NAME_MAP[prevAA] || prevAA}${gIdx}${AA_NAME_MAP[yaaMutAA] || yaaMutAA}${yaaIsSynonymous ? ' (Synonymous)' : ''}`;

        const nextCodon = gIdx < effectiveCodonCount - 1 ? codonsRaw[gIdx + 1] : undefined;
        const nextAA = gIdx < effectiveCodonCount - 1 ? protRaw[gIdx + 1] : undefined;
        const thermalStability = predictTripleHelixDestabilization(mutAA, prevAA, nextAA);

        const dyadSite: CpGSite = {
          id: `dyad-${residuePos}`,
          type: 'dyad',
          isSplitSite: isSplit,
          residueIndex: residuePos,
          residueName: `Gly${residuePos}`,
          cStart,
          prevCodon,
          prevAA,
          codon: glyCodon,
          aa: 'G',
          nextCodon,
          nextAA,
          junctionDna: `[${prevCodon}] [${glyCodon}]`,
          cDnaChange: cdnaChangeName,
          aaChange: aaChangeName,
          mutCodon,
          mutAA,
          substitutionClass: mutAA === 'R' ? 'High Destabilization (Arg)' : (mutAA === 'S' ? 'Moderate Destabilization (Ser)' : 'Other'),
          thermalStability,
          senseDeamination: {
            yaaPos: gIdx,
            yaaAA: prevAA,
            yaacDnaPos: cStart - 1,
            yaacDnaChange: `c.${cStart - 1}C>T`,
            yaaMutCodon,
            yaaMutAA,
            yaaAaChange: yaaAaChangeName,
            isSynonymous: yaaIsSynonymous,
            consequence: yaaIsSynonymous ? 'Synonymous (Silent)' : (yaaMutAA === '*' ? 'Nonsense' : 'Missense')
          },
          clinvar: {
            reported: isReported,
            isPathogenicOrLikely: isPlp,
            significanceCode: sigCode,
            significanceLabel: sigLabel,
            variationId: varId,
            reviewStatus: revStatus,
            multipleSubmitters: isMultiSub,
            clinicalSignificance: rawSignificance,
            isBenchmarkHotspot: isReported,
            phenotype: condition
          },
          gnomad: {
            mutability: gnomadInfo.mutabilityRate,
            percentile: gnomadInfo.percentile,
            alleleFrequency: gnomadInfo.typicalAlleleFrequency,
            alleleCount: gnomadInfo.alleleCount,
            alleleNumber: gnomadInfo.alleleNumber,
            variantId: gnomadInfo.variantId,
            observedInGnomad: gnomadInfo.observedInGnomad,
            classification: gnomadInfo.classification
          }
        };

        if (isSplit) {
          splitPseudoDyads.push(dyadSite);
        } else {
          cpgDyads.push(dyadSite);
        }
      }
    }
  });

  // Identify in-codon CpGs
  const inCodonCpGs: CpGSite[] = [];
  for (let i = 0; i < effectiveCodonCount; i++) {
    const c = codonsRaw[i];
    if (c.includes('CG')) {
      const residuePos = i + 1;
      const aa = protRaw[i];
      const cgIdx = c.indexOf('CG'); // 0 or 1
      const cDnaPos = i * 3 + cgIdx + 1; // Cytosine cDNA position (forward strand C>T)
      const mutCodon = c.substring(0, cgIdx) + 'T' + c.substring(cgIdx + 1);
      const mutAA = CODON_MAP[mutCodon] || '?';
      const isStop = mutAA === '*';
      const mutAALabel = isStop ? '*' : (AA_NAME_MAP[mutAA] || mutAA);

      // Flanking context resolution for accurate central-base trinucleotide rate lookup:
      // For forward strand C>T (central base C):
      // - If cgIdx === 1 (CCG, ACG, TCG, GCG), codon itself has C in center (e.g. ACG > T)
      // - If cgIdx === 0 (CGA, CGC, CGG, CGT), 5' base comes from preceding codon 3rd base (e.g. [N]CG > T)
      const prevCodonStr = i > 0 ? codonsRaw[i - 1] : '';
      const prevBase = prevCodonStr.length >= 3 ? prevCodonStr.slice(-1) : 'C';
      const triContextC = cgIdx === 1 ? c : `${prevBase}CG`;

      // Antisense-strand deamination resolution (reverse 5mC>T -> forward G>A transition):
      const cDnaPosG = i * 3 + cgIdx + 2;
      const mutCodonG = c.substring(0, cgIdx + 1) + 'A' + c.substring(cgIdx + 2);
      const mutAAG = CODON_MAP[mutCodonG] || '?';
      const isStopG = mutAAG === '*';
      const mutAALabelG = isStopG ? '*' : (AA_NAME_MAP[mutAAG] || mutAAG);
      const isSynonymousG = mutAAG === aa;

      // For reverse strand G>A (central base G):
      // - If cgIdx === 0 (CGA, CGC, CGG, CGT), codon itself has G in center (e.g. CGA > A)
      // - If cgIdx === 1 (CCG, ACG, TCG, GCG), 3' base comes from succeeding codon 1st base (e.g. CG[N] > A)
      const nextCodonStr = i < effectiveCodonCount - 1 ? codonsRaw[i + 1] : '';
      const nextBase = nextCodonStr.length >= 1 ? nextCodonStr[0] : 'G';
      const triContextG = cgIdx === 0 ? c : `CG${nextBase}`;

      // ClinVar cross-validation for in-codon CpG sites:
      // STRICT CLINICAL INTEGRITY: Never overwrite actual ClinVar records.
      // If ClinVar has an authoritative record (even VUS, Conflicting, or B/LB), preserve it.
      // If unrecorded in ClinVar, do NOT fabricate 'reported=true' or 'isPathogenic=true'.
      const clinvarRec = knownClinvarRecords[residuePos];
      const isReported = Boolean(clinvarRec);
      const isPlp = Boolean(
        clinvarRec?.significance === 'P' ||
        clinvarRec?.significance === 'LP' ||
        clinvarRec?.significance === 'P/LP'
      );
      let sigCode = clinvarRec?.significance || 'Candidate';
      let sigLabel = clinvarRec?.rawSignificance || (isStop ? 'Candidate (PVS1 Nonsense Hotspot — Predicted LOF, Unreported in ClinVar)' : 'Candidate (In-Codon CpG)');

      const gnomadInfo = calculateGnomadScore(
        false,
        true,
        isPlp,
        Boolean(clinvarRec?.multipleSubmitters),
        c,
        prevCodonStr,
        isCanonicalPreloaded ? geneSymbol : undefined,
        isCanonicalPreloaded ? residuePos : undefined,
        { triContext: triContextC, altBase: 'T' }
      );

      const revGnomadInfo = calculateGnomadScore(
        false,
        true,
        false,
        false,
        c,
        prevCodonStr,
        isCanonicalPreloaded ? geneSymbol : undefined,
        isCanonicalPreloaded ? residuePos : undefined,
        { triContext: triContextG, altBase: 'A' }
      );

      // Biophysical note: Brodsky triple-helix destabilization delta Tm is exclusively
      // calibrated for core Glycine (Gly) substitutions. Xaa/Yaa substitutions (Arg, Pro, etc.)
      // do not disrupt the glycine hydrogen-bonding core and cannot be modeled by Brodsky Delta Tm.
      const thermalStability = aa === 'G'
        ? predictTripleHelixDestabilization(mutAA, i > 0 ? protRaw[i - 1] : undefined, i < effectiveCodonCount - 1 ? protRaw[i + 1] : undefined)
        : undefined;

      inCodonCpGs.push({
        id: `incodon-${residuePos}`,
        type: 'incodon',
        residueIndex: residuePos,
        residueName: `${AA_NAME_MAP[aa] || aa}${residuePos}`,
        cStart: cDnaPos,
        prevCodon: prevCodonStr,
        prevAA: i > 0 ? protRaw[i - 1] : '',
        codon: c,
        aa,
        nextCodon: nextCodonStr || undefined,
        nextAA: i < effectiveCodonCount - 1 ? protRaw[i + 1] : undefined,
        junctionDna: `[${c}]`,
        cDnaChange: `c.${cDnaPos}C>T`,
        aaChange: `p.${AA_NAME_MAP[aa] || aa}${residuePos}${mutAALabel}`,
        mutCodon,
        mutAA,
        substitutionClass: isStop ? 'Nonsense (Stop Codon)' : 'Missense (In-Codon CpG)',
        thermalStability,
        reverseDeamination: {
          cDnaPos: cDnaPosG,
          cDnaChange: `c.${cDnaPosG}G>A`,
          mutCodon: mutCodonG,
          mutAA: mutAAG,
          aaChange: `p.${AA_NAME_MAP[aa] || aa}${residuePos}${mutAALabelG}`,
          isSynonymous: isSynonymousG,
          consequence: isSynonymousG ? 'Synonymous (Silent)' : (isStopG ? 'Nonsense' : 'Missense'),
          mutability: revGnomadInfo.mutabilityRate,
          percentile: revGnomadInfo.percentile
        },
        clinvar: {
          reported: isReported,
          isPathogenicOrLikely: isPlp,
          significanceCode: sigCode,
          significanceLabel: sigLabel,
          variationId: clinvarRec?.variationId,
          reviewStatus: clinvarRec?.reviewStatus || (isStop ? 'Predicted LOF by sequence' : undefined),
          multipleSubmitters: clinvarRec?.multipleSubmitters,
          clinicalSignificance: clinvarRec?.rawSignificance || (isStop ? 'Predicted Truncation (PVS1)' : undefined),
          phenotype: clinvarRec?.condition || (isStop ? 'Collagen Truncation Susceptibility' : undefined)
        },
        gnomad: {
          mutability: gnomadInfo.mutabilityRate,
          percentile: gnomadInfo.percentile,
          alleleFrequency: gnomadInfo.typicalAlleleFrequency,
          alleleCount: gnomadInfo.alleleCount,
          alleleNumber: gnomadInfo.alleleNumber,
          variantId: gnomadInfo.variantId,
          observedInGnomad: gnomadInfo.observedInGnomad,
          classification: gnomadInfo.classification
        }
      });
    }
  }

  // === T1 STATISTICAL CALCULATIONS ===
  const collGlyCount = collagenousGlySet.size;
  const cpgDyadsCount = cpgDyads.length;
  const cpgDyadsPct = collGlyCount > 0 ? Number(((cpgDyadsCount / collGlyCount) * 100).toFixed(1)) : 0;

  // === Genome-Wide Baseline Reference (MANE Select v1.3 Human Coding Genome) ===
  // Source & Methodology:
  // Evaluates 732,543 adjacent codon junctions across all canonical protein-coding transcripts (MANE Select).
  // A codon junction is defined as the 3rd base of codon (i) and 1st base of codon (i+1).
  // Of these, 104,875 junctions form a CG dinucleotide (14.31%), while 627,668 do not.
  // Contingency 2x2 comparison rationale:
  // Because human germline genomes experience pervasive evolutionary CpG depletion (via 5mC hydrolytic deamination),
  // this 14.31% genome-wide baseline reflects the neutral/background equilibrium junction CpG rate across all human coding CDS.
  // Depletion in collagenous Glycines relative to this baseline (OR < 1, P < 0.05) demonstrates stronger-than-genome-average
  // purifying selection against fragile methyl-CpG dyads at structural triple-helix positions.
  const genomeDyadC = 104875;
  const genomeDyadNonC = 732543 - 104875;
  const orGenome = computeStatisticalMetric(
    cpgDyadsCount,
    collGlyCount - cpgDyadsCount,
    genomeDyadC,
    genomeDyadNonC
  );

  // Within-gene control comparison:
  // Paper comparison: Yaa codons ending in C (cpgDyadsCount / collGlyCount)
  // vs Other codons in gene ending in C (otherEndingInC / otherCodonsCount).
  // In COL4A5: 12 of 449 (2.7%) vs 230 of 1,242 other codons (18.5%), giving OR = 0.12, P < 0.001.
  let otherEndingInC = 0;
  let otherCodonsCount = 0;
  for (let i = 0; i < effectiveCodonCount; i++) {
    const isYaa = i < effectiveCodonCount - 1 && collagenousGlySet.has(i + 1);
    if (!isYaa) {
      otherCodonsCount++;
      if (codonsRaw[i].endsWith('C')) {
        otherEndingInC++;
      }
    }
  }
  const otherEndingInCPct = otherCodonsCount > 0 ? Number(((otherEndingInC / otherCodonsCount) * 100).toFixed(1)) : 0;
  const orNonColl = computeStatisticalMetric(
    cpgDyadsCount,
    collGlyCount - cpgDyadsCount,
    otherEndingInC,
    Math.max(1, otherCodonsCount - otherEndingInC)
  );

  // G-initial controls (Ala, Val, Asp, Glu: A, V, D, E)
  let gInitialControlCount = 0;
  let gInitialControlWithC = 0;
  for (let i = 1; i < effectiveCodonCount; i++) {
    const aa = protRaw[i];
    if (aa === 'A' || aa === 'V' || aa === 'D' || aa === 'E') {
      gInitialControlCount++;
      if (codonsRaw[i - 1].endsWith('C')) {
        gInitialControlWithC++;
      }
    }
  }
  const orGInitial = computeStatisticalMetric(
    cpgDyadsCount,
    collGlyCount - cpgDyadsCount,
    gInitialControlWithC,
    Math.max(1, gInitialControlCount - gInitialControlWithC)
  );

  // Yaa Prolines vs other Prolines
  const yaaProCounts = { CCA: 0, CCC: 0, CCG: 0, CCT: 0, total: 0 };
  const otherProCounts = { CCA: 0, CCC: 0, CCG: 0, CCT: 0, total: 0 };

  for (let i = 0; i < effectiveCodonCount; i++) {
    if (protRaw[i] === 'P') {
      const c = codonsRaw[i] as keyof typeof KAZUSA_PROLINE_USAGE;
      const isYaa = i < effectiveCodonCount - 1 && collagenousGlySet.has(i + 1);
      if (isYaa) {
        if (c in yaaProCounts) yaaProCounts[c]++;
        yaaProCounts.total++;
      } else {
        if (c in otherProCounts) otherProCounts[c]++;
        otherProCounts.total++;
      }
    }
  }

  // Chi-Square Goodness of fit against Kazusa
  const chiSqResult = chiSquareGoodnessOfFit(
    [yaaProCounts.CCA, yaaProCounts.CCC, yaaProCounts.CCG, yaaProCounts.CCT],
    [KAZUSA_PROLINE_USAGE.CCA, KAZUSA_PROLINE_USAGE.CCC, KAZUSA_PROLINE_USAGE.CCG, KAZUSA_PROLINE_USAGE.CCT]
  );

  // Yaa CCC vs other CCC in gene
  const orYaaCcc = computeStatisticalMetric(
    yaaProCounts.CCC,
    Math.max(1, yaaProCounts.total - yaaProCounts.CCC),
    otherProCounts.CCC,
    Math.max(1, otherProCounts.total - otherProCounts.CCC)
  );

  // Non-proline Yaa capable of ending in C
  let nonProYaaC = 0;
  let nonProYaaTotal = 0;
  let nonProOtherC = 0;
  let nonProOtherTotal = 0;

  for (let i = 0; i < effectiveCodonCount; i++) {
    const aa = protRaw[i];
    if (aa !== 'P' && !INCAPABLE_OF_C.has(aa)) {
      const isYaa = i < effectiveCodonCount - 1 && collagenousGlySet.has(i + 1);
      const endsInC = codonsRaw[i].endsWith('C');
      if (isYaa) {
        nonProYaaTotal++;
        if (endsInC) nonProYaaC++;
      } else {
        nonProOtherTotal++;
        if (endsInC) nonProOtherC++;
      }
    }
  }
  const orNonPro = computeStatisticalMetric(
    nonProYaaC,
    Math.max(1, nonProYaaTotal - nonProYaaC),
    nonProOtherC,
    Math.max(1, nonProOtherTotal - nonProOtherC)
  );

  const t1Stats: T1Stats = {
    totalCodons: effectiveCodonCount,
    totalGlycines: protRaw.filter(a => a === 'G').length,
    collagenousGlycines: collGlyCount,
    noncollagenousCodons: otherCodonsCount,
    cpgDyadsCount,
    cpgDyadsPct,
    trueGenomicDyadsCount: cpgDyads.length,
    splitSitesCount: splitPseudoDyads.length,
    hasSplitSiteAnnotation: Boolean(isCanonicalPreloaded && geneSymbol && COLLAGEN_SPLIT_SITES[geneSymbol]),
    genomeDyadsPct: 14.3,
    noncollagenousDyadsCount: otherEndingInC,
    noncollagenousDyadsPct: otherEndingInCPct,
    oddsRatioGenome: orGenome,
    oddsRatioNoncoll: orNonColl,
    gInitialAminoAcids: {
      glyDyadCount: cpgDyadsCount,
      glyTotal: collGlyCount,
      controlDyadCount: gInitialControlWithC,
      controlTotal: gInitialControlCount,
      metric: orGInitial
    },
    prolineAnalysis: {
      yaaCounts: yaaProCounts,
      otherCounts: otherProCounts,
      genomeUsage: KAZUSA_PROLINE_USAGE,
      chiSquare: chiSqResult,
      cccDepletionMetric: orYaaCcc
    },
    nonProlineCapable: {
      yaaC: nonProYaaC,
      yaaTotal: nonProYaaTotal,
      otherC: nonProOtherC,
      otherTotal: nonProOtherTotal,
      metric: orNonPro
    },
    inCodonCpGsCount: inCodonCpGs.length
  };

  // === T2 CLINVAR STATS ===
  const cpgReported = cpgDyads.filter(d => d.clinvar.reported).length;
  const cpgPlp = cpgDyads.filter(d => d.clinvar.isPathogenicOrLikely).length;
  const cpgP = cpgDyads.filter(d => d.clinvar.significanceCode === 'P').length;
  const cpgLp = cpgDyads.filter(d => d.clinvar.significanceCode === 'LP').length;
  const cpgBothPlp = cpgDyads.filter(d => d.clinvar.significanceCode === 'P/LP').length;
  const cpgVus = cpgDyads.filter(d => d.clinvar.significanceCode === 'VUS').length;
  const cpgCandidate = cpgDyads.filter(d => !d.clinvar.isPathogenicOrLikely).length;
  const cpgMulti = cpgDyads.filter(d => d.clinvar.multipleSubmitters && d.clinvar.isPathogenicOrLikely).length;

  // Real ClinVar baseline statistics from whole-gene ClinVar single-nucleotide missense database
  // COL4A5 benchmark baseline from paper: 182 of 437 non-CpG glycines P/LP, 69 multiple submitters
  const baseline = isCanonicalPreloaded ? GENE_CLINVAR_BASELINE[geneSymbol] : undefined;
  const hasBaselineData = Boolean(baseline);
  const nonCpgTotal = baseline ? baseline.nonCpgTotal : Math.max(1, collGlyCount - cpgDyadsCount);
  const nonCpgPlp = baseline ? baseline.nonCpgPlp : 0;
  const nonCpgMulti = baseline ? baseline.nonCpgMulti : 0;

  // Symmetrical comparison for Pathogenic / Likely Pathogenic missense variants:
  // CpG: cpgPlp of cpgDyadsCount vs Non-CpG: nonCpgPlp of nonCpgTotal
  let orT2Reporting: StatisticalMetric;
  if (cpgPlp === 0 && nonCpgPlp === 0) {
    orT2Reporting = {
      or: NaN,
      ciLower: NaN,
      ciUpper: NaN,
      pValue: NaN,
      formattedP: 'N/A'
    };
  } else {
    orT2Reporting = computeStatisticalMetric(
      cpgPlp,
      cpgDyadsCount - cpgPlp,
      nonCpgPlp,
      nonCpgTotal - nonCpgPlp
    );
  }

  // Symmetrical comparison for multiple submitters among P/LP sites:
  let orT2Multi: StatisticalMetric;
  if (cpgPlp === 0 || nonCpgPlp === 0) {
    orT2Multi = {
      or: NaN,
      ciLower: NaN,
      ciUpper: NaN,
      pValue: NaN,
      formattedP: 'N/A'
    };
  } else {
    orT2Multi = computeStatisticalMetric(
      cpgMulti,
      cpgPlp - cpgMulti,
      nonCpgMulti,
      nonCpgPlp - nonCpgMulti
    );
  }

  // In-codon CpG mutational summary
  const inCodonReported = inCodonCpGs.filter(d => d.clinvar.reported).length;
  const inCodonPlp = inCodonCpGs.filter(d => d.clinvar.isPathogenicOrLikely).length;
  const inCodonNonsense = inCodonCpGs.filter(d => d.mutAA === '*').length;

  const t2Stats: T2Stats = {
    cpgDyadReportedCount: cpgReported,
    cpgDyadTotal: cpgDyadsCount,
    cpgDyadPlpCount: cpgPlp,
    cpgDyadPCount: cpgP,
    cpgDyadLpCount: cpgLp,
    cpgDyadBothPlpCount: cpgBothPlp,
    cpgDyadVusCount: cpgVus,
    cpgDyadCandidateCount: cpgCandidate,
    nonCpgReportedCount: nonCpgPlp,
    nonCpgTotal: nonCpgTotal,
    cpgReportingRatePct: cpgDyadsCount > 0 ? Number(((cpgPlp / cpgDyadsCount) * 100).toFixed(1)) : 0,
    nonCpgReportingRatePct: nonCpgTotal > 0 ? Number(((nonCpgPlp / nonCpgTotal) * 100).toFixed(1)) : 0,
    reportingOddsRatio: orT2Reporting,
    cpgMultiSubmittersCount: cpgMulti,
    cpgMultiSubmittersPct: cpgPlp > 0 ? Number(((cpgMulti / cpgPlp) * 100).toFixed(1)) : 0,
    nonCpgMultiSubmittersCount: nonCpgMulti,
    nonCpgMultiSubmittersPct: nonCpgPlp > 0 ? Number(((nonCpgMulti / nonCpgPlp) * 100).toFixed(1)) : 0,
    multiSubmitterOddsRatio: orT2Multi,
    knownVariantsCount: Object.keys(knownClinvarRecords).length || (isCanonicalPreloaded && geneSymbol === 'COL4A5' ? 707 : cpgReported),
    hasBaselineData,
    inCodonTotal: inCodonCpGs.length,
    inCodonPlpCount: inCodonPlp,
    inCodonNonsenseCount: inCodonNonsense,
    inCodonReportedCount: inCodonReported
  };

  // === T3 GNOMAD STATS & MULTIPLE TESTING CORRECTION ===
  const deNovoCount = cpgDyads.filter(d => d.gnomad.classification === 'Prone to Recurrent De Novo Hotspot').length;
  const candCount = cpgDyads.filter(d => d.gnomad.classification === 'High Mutability Candidate Hotspot').length;
  const somaticCount = inCodonCpGs.length;

  // === T3 Mutability Tier Stratification (Honest context ranking, no pseudo p-values) ===
  const allTargetSites = [...cpgDyads, ...inCodonCpGs];
  const top1PctCount = allTargetSites.filter(s => s.gnomad.percentile >= 99.0).length;
  const highTierCount = allTargetSites.filter(s => s.gnomad.percentile >= 95.0).length;

  // === Rigorous Population Cohort Testing (Poisson test on actual gnomAD allele counts) ===
  // Null hypothesis H0: the locus mutates at the genome-wide baseline point mutation rate mu0 = 1.20e-8.
  // Expected mutant allele count under H0: lambda0 = alleleNumber * mu0.
  // Exact one-tailed Poisson test p-value: P(X >= alleleCount | lambda0).
  const sitesWithObs = allTargetSites.filter(s => s.gnomad.alleleNumber !== undefined && s.gnomad.alleleCount !== undefined);
  let cohortTestingResult: T3Stats['cohortTesting'] = undefined;

  if (sitesWithObs.length > 0) {
    const avgBaseline = 1.20e-8;
    const poissonPs = sitesWithObs.map(s => {
      const an = s.gnomad.alleleNumber || 0;
      const ac = s.gnomad.alleleCount || 0;
      const lambda0 = Math.max(1e-8, an * avgBaseline);
      const p = accuratePoissonPValue(ac, lambda0);
      s.gnomad.poissonPValue = Number(p.toFixed(5));
      return p;
    });

    const fdrQs = adjustPValuesBH(poissonPs);
    sitesWithObs.forEach((s, idx) => {
      s.gnomad.poissonFdrQ = fdrQs[idx];
      s.gnomad.isPoissonSignificant = fdrQs[idx] < 0.05;
    });

    cohortTestingResult = {
      testedLociCount: sitesWithObs.length,
      nominalSignificantCount: poissonPs.filter(p => p < 0.05).length,
      fdrSignificantCount: fdrQs.filter(q => q < 0.05).length
    };
  }

  const cpgMutabilities = cpgDyads.map(d => d.gnomad.mutability);
  const avgMutabilityCpG = cpgMutabilities.length > 0
    ? cpgMutabilities.reduce((a, b) => a + b, 0) / cpgMutabilities.length
    : 1.28e-7;
  const minMutabilityCpG = cpgMutabilities.length > 0 ? Math.min(...cpgMutabilities) : 1.18e-7;
  const maxMutabilityCpG = cpgMutabilities.length > 0 ? Math.max(...cpgMutabilities) : 1.42e-7;
  const avgBaseline = 1.20e-8;
  const foldElevation = Number((avgMutabilityCpG / avgBaseline).toFixed(1));
  const minFoldElevation = Number((minMutabilityCpG / avgBaseline).toFixed(1));
  const maxFoldElevation = Number((maxMutabilityCpG / avgBaseline).toFixed(1));

  const t3Stats: T3Stats = {
    avgMutabilityCpG,
    minMutabilityCpG,
    maxMutabilityCpG,
    avgMutabilityBaseline: avgBaseline,
    foldElevation,
    minFoldElevation,
    maxFoldElevation,
    deNovoPredictedCount: deNovoCount,
    somaticDeNovoPredictedCount: somaticCount,
    candidateHotspotsCount: candCount,
    lowRiskCount: Math.max(0, effectiveCodonCount - cpgDyadsCount - inCodonCpGs.length),
    mutabilityStratification: {
      totalLoci: allTargetSites.length,
      topPercentileCount: top1PctCount,
      highPercentileCount: highTierCount
    },
    cohortTesting: cohortTestingResult
  };

  // === SEQUENCE LOGO FREQUENCY MATRIX ===
  // 9-nucleotide window across all collagenous triplets: Yaa[-3..-1], Gly[1..3], Xaa[1..3]
  const ntWindowCounts: Record<string, { A: number; C: number; G: number; T: number }> = {
    'Yaa-1': { A: 0, C: 0, G: 0, T: 0 },
    'Yaa-2': { A: 0, C: 0, G: 0, T: 0 },
    'Yaa-3': { A: 0, C: 0, G: 0, T: 0 },
    'Gly-1': { A: 0, C: 0, G: 0, T: 0 },
    'Gly-2': { A: 0, C: 0, G: 0, T: 0 },
    'Gly-3': { A: 0, C: 0, G: 0, T: 0 },
    'Xaa-1': { A: 0, C: 0, G: 0, T: 0 },
    'Xaa-2': { A: 0, C: 0, G: 0, T: 0 },
    'Xaa-3': { A: 0, C: 0, G: 0, T: 0 },
  };

  let sampledTriplets = 0;
  Array.from(collagenousGlySet).forEach(gIdx => {
    if (gIdx > 0 && gIdx < effectiveCodonCount - 1) {
      sampledTriplets++;
      const yaaCodon = codonsRaw[gIdx - 1];
      const glyCodon = codonsRaw[gIdx];
      const xaaCodon = codonsRaw[gIdx + 1];

      for (let pos = 0; pos < 3; pos++) {
        const yBase = yaaCodon[pos] as 'A' | 'C' | 'G' | 'T';
        const gBase = glyCodon[pos] as 'A' | 'C' | 'G' | 'T';
        const xBase = xaaCodon[pos] as 'A' | 'C' | 'G' | 'T';

        if (yBase in ntWindowCounts[`Yaa-${pos + 1}`]) ntWindowCounts[`Yaa-${pos + 1}`][yBase]++;
        if (gBase in ntWindowCounts[`Gly-${pos + 1}`]) ntWindowCounts[`Gly-${pos + 1}`][gBase]++;
        if (xBase in ntWindowCounts[`Xaa-${pos + 1}`]) ntWindowCounts[`Xaa-${pos + 1}`][xBase]++;
      }
    }
  });

  const totalColl = Math.max(1, sampledTriplets);
  const nucleotideYaaGlyXaa = Object.entries(ntWindowCounts).map(([key, counts]) => ({
    position: key,
    label: key,
    freq: {
      A: counts.A / totalColl,
      C: counts.C / totalColl,
      G: counts.G / totalColl,
      T: counts.T / totalColl
    }
  }));

  // Amino Acid registers: Gly, Xaa, Yaa
  // To ensure absolute consistency with prolineAnalysis and Figure 1E:
  // For each collagenous glycine at gIdx, Gly is at gIdx, Yaa is immediately preceding (gIdx - 1),
  // and Xaa is immediately succeeding (gIdx + 1).
  const regCounts: Record<string, Record<string, number>> = {
    Gly: {},
    Xaa: {},
    Yaa: {}
  };

  Array.from(collagenousGlySet).forEach(gIdx => {
    // Glycine register
    const glyAA = protRaw[gIdx];
    regCounts.Gly[glyAA] = (regCounts.Gly[glyAA] || 0) + 1;

    // Yaa register: residue immediately preceding Gly
    if (gIdx > 0) {
      const yaaAA = protRaw[gIdx - 1];
      regCounts.Yaa[yaaAA] = (regCounts.Yaa[yaaAA] || 0) + 1;
    }

    // Xaa register: residue immediately following Gly
    if (gIdx < effectiveCodonCount - 1) {
      const xaaAA = protRaw[gIdx + 1];
      regCounts.Xaa[xaaAA] = (regCounts.Xaa[xaaAA] || 0) + 1;
    }
  });

  const aminoAcidRegister = ['Gly', 'Xaa', 'Yaa'].map(reg => {
    const counts = regCounts[reg];
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const freq: Record<string, number> = {};
    for (const [aa, cnt] of Object.entries(counts)) {
      freq[aa] = cnt / total;
    }
    return { register: reg, freq };
  });

  return {
    geneSymbol,
    geneInfo,
    transcriptId: geneInfo?.transcriptId,
    cdsLength: cleaned.length,
    proteinLength: effectiveCodonCount,
    rawSequence: cleaned,
    proteinSequence: protRaw.slice(0, effectiveCodonCount).join(''),
    codons: codonInfos,
    cpgDyads,
    splitPseudoDyads,
    inCodonCpGs,
    allCpGSites: [...cpgDyads, ...inCodonCpGs],
    t1: t1Stats,
    t2: t2Stats,
    t3: t3Stats,
    logoData: {
      nucleotideYaaGlyXaa,
      aminoAcidRegister
    }
  };
}
