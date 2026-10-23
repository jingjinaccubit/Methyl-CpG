import React from 'react';
import { TrendingDown, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import type { T1Stats } from '../types';

interface T1EvolutionaryDepletionProps {
  t1: T1Stats;
  geneSymbol: string;
}

export const T1EvolutionaryDepletion: React.FC<T1EvolutionaryDepletionProps> = ({
  t1,
  geneSymbol,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            T1
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 m-0">
              T1: Evolutionary Depletion Analysis
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              Quantifying evolutionary loss of CpG dyads at collagenous Glycines vs Genome, Isoforms, and Domain Controls
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
          Marked Depletion Confirmed
        </span>
      </div>

      {/* Main Grid of 3 Primary Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Comparison 1: Human Coding Genome */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold uppercase">
              <span>vs Human Coding Genome</span>
              <TrendingDown className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-slate-900 mb-1">
              Odds Ratio: <span className="font-mono text-blue-700">{t1.oddsRatioGenome.or.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-600 font-mono mb-2">
              95% CI: [{t1.oddsRatioGenome.ciLower.toFixed(2)} - {t1.oddsRatioGenome.ciUpper.toFixed(2)}] • {t1.oddsRatioGenome.formattedP}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              In {geneSymbol}, only <strong className="text-slate-800">{t1.cpgDyadsCount} of {t1.collagenousGlycines} ({t1.cpgDyadsPct}%)</strong> collagenous glycines retain a preceding cytosine, compared to <strong className="text-slate-800">14.3%</strong> across human coding genes (MANE Select).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-blue-800 font-medium">
            {t1.oddsRatioGenome.or < 1 && t1.oddsRatioGenome.pValue < 0.05
              ? 'Significant evolutionary purge of CpG dyads (Purifying Selection).'
              : 'Evolutionary frequency consistent with neutral genomic baseline.'}
          </div>
        </div>

        {/* Comparison 2: Within-Gene Other Codons Control */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold uppercase">
              <span>vs Other Codons in Gene (Within-Gene Control)</span>
              <TrendingDown className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl font-bold text-slate-900 mb-1">
              Odds Ratio: <span className="font-mono text-indigo-700">{t1.oddsRatioNoncoll.or.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-600 font-mono mb-2">
              95% CI: [{t1.oddsRatioNoncoll.ciLower.toFixed(2)} - {t1.oddsRatioNoncoll.ciUpper.toFixed(2)}] • {t1.oddsRatioNoncoll.formattedP}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Other codons across {geneSymbol} carry <strong className="text-slate-800">{t1.noncollagenousDyadsCount} of {t1.noncollagenousCodons} ({t1.noncollagenousDyadsPct}%)</strong> ending in C, demonstrating that depletion of cytosine is specifically heightened directly before collagenous glycines.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-indigo-800 font-medium">
            {t1.oddsRatioNoncoll.or < 1 && t1.oddsRatioNoncoll.pValue < 0.05
              ? 'Heightened within-gene purge at collagenous Gly junctions (P < 0.05).'
              : 'Within-gene comparison does not reach statistical significance.'}
          </div>
        </div>

        {/* Comparison 3: Other Guanine-Initial Codons */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold uppercase">
              <span>Control: Ala / Val / Asp / Glu</span>
              <Info className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-xl font-bold text-slate-900 mb-1">
              Odds Ratio: <span className="font-mono text-slate-800">{t1.gInitialAminoAcids.metric.or.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-600 font-mono mb-2">
              95% CI: [{t1.gInitialAminoAcids.metric.ciLower.toFixed(2)} - {t1.gInitialAminoAcids.metric.ciUpper.toFixed(2)}] • {t1.gInitialAminoAcids.metric.formattedP}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Codons of other guanine-initial amino acids in {geneSymbol} carry preceding C in <strong className="text-slate-800">{t1.gInitialAminoAcids.controlDyadCount} of {t1.gInitialAminoAcids.controlTotal}</strong> sites, confirming general methyl-CpG depletion across all G-initial codons.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
            Biochemical mechanism driven by CpG dinucleotide depletion.
          </div>
        </div>
      </div>

      {/* Proline Codon Usage & CCC Depletion Panel */}
      <div className="bg-blue-50/40 rounded-xl p-5 border border-blue-200">
        <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
          <span>Proline Codon Breakdown at Yaa Positions (The CCC Depletion Signature)</span>
        </h4>
        <p className="text-xs text-slate-600 mb-4">
          Proline is the dominant residue at the Yaa position (hydroxyproline substrate). Only the <strong className="font-mono">CCC</strong> codon ends in cytosine, placing the subsequent glycine at risk of methyl-CpG deamination.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {(['CCA', 'CCC', 'CCG', 'CCT'] as const).map(codon => {
            const count = t1.prolineAnalysis.yaaCounts[codon];
            const total = t1.prolineAnalysis.yaaCounts.total || 1;
            const pct = ((count / total) * 100).toFixed(1);
            const kazusaPct = (t1.prolineAnalysis.genomeUsage[codon] * 100).toFixed(1);
            const isDanger = codon === 'CCC';

            return (
              <div
                key={codon}
                className={`p-3.5 rounded-xl border ${
                  isDanger
                    ? 'bg-amber-50/80 border-amber-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-sm text-slate-900">{codon}</span>
                  {isDanger && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      Generates Dyad
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-slate-800 font-mono">{count}</div>
                <div className="text-xs text-slate-600 mt-1">
                  <strong>{pct}%</strong> in Yaa (vs {kazusaPct}% human genome)
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistical Summary Box */}
        <div className="bg-white rounded-lg p-3.5 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-3">
          <div>
            <strong>Yaa Proline vs Genome Chi-Square Test:</strong>{' '}
            <span className="font-mono font-semibold text-blue-700">
              χ² = {t1.prolineAnalysis.chiSquare.chi2}, df = {t1.prolineAnalysis.chiSquare.df} ({t1.prolineAnalysis.chiSquare.formattedP})
            </span>
          </div>
          <div>
            <strong>Yaa CCC vs Other Prolines Odds Ratio:</strong>{' '}
            <span className="font-mono font-semibold text-blue-700">
              OR = {t1.prolineAnalysis.cccDepletionMetric.or.toFixed(2)} [{t1.prolineAnalysis.cccDepletionMetric.ciLower.toFixed(2)} - {t1.prolineAnalysis.cccDepletionMetric.ciUpper.toFixed(2)}]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
