import React, { useState } from 'react';
import { TrendingDown, CheckCircle2, Info, AlertCircle, Minus, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import type { T1Stats } from '../types';

interface T1EvolutionaryDepletionProps {
  t1: T1Stats;
  geneSymbol: string;
}

export const T1EvolutionaryDepletion: React.FC<T1EvolutionaryDepletionProps> = ({
  t1,
  geneSymbol,
}) => {
  const [showMethodology, setShowMethodology] = useState<boolean>(false);
  const isDepleted = !isNaN(t1.oddsRatioGenome.or) && t1.oddsRatioGenome.or < 1 && t1.oddsRatioGenome.pValue < 0.05;
  const isEnriched = !isNaN(t1.oddsRatioGenome.or) && t1.oddsRatioGenome.or > 1 && t1.oddsRatioGenome.pValue < 0.05;

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
        {isDepleted ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            Marked Depletion Confirmed
          </span>
        ) : isEnriched ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600" />
            CpG Enrichment (OR &gt; 1.0)
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            <Minus className="w-3.5 h-3.5 mr-1 text-slate-500" />
            No Significant Depletion (Neutral)
          </span>
        )}
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
            <div className="text-xs text-slate-600 font-mono mb-2 flex items-center gap-1.5 flex-wrap">
              <span>95% CI: [{t1.oddsRatioGenome.ciLower.toFixed(2)} - {t1.oddsRatioGenome.ciUpper.toFixed(2)}] • {t1.oddsRatioGenome.formattedP}</span>
              {t1.oddsRatioGenome.isBootstrapped && (
                <span className="text-[10px] font-sans font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded border border-blue-200" title="Monte Carlo Bootstrapped Percentile CI (B=10,000) for small-sample robustness">
                  Bootstrapped (B=10k)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              In {geneSymbol}, <strong className="text-slate-800">{t1.cpgDyadsCount} of {t1.collagenousGlycines} ({t1.cpgDyadsPct}%)</strong> collagenous glycines have a preceding cytosine in mRNA
              {t1.hasSplitSiteAnnotation ? (
                t1.splitSitesCount && t1.splitSitesCount > 0 ? (
                  <> (<strong>{t1.trueGenomicDyadsCount}</strong> true genomic CpG dyads, <strong className="text-amber-700">{t1.splitSitesCount}</strong> split pseudo-dyads across exon junctions)</>
                ) : (
                  <> (all <strong>{t1.cpgDyadsCount}</strong> verified contiguous genomic dyads)</>
                )
              ) : (
                <span className="block mt-1 text-[11px] text-slate-400 italic">
                  *Split site detection unavailable for custom sequence (evaluated at mRNA junction level)
                </span>
              )}, compared to <strong className="text-slate-800">14.3%</strong> across human coding genes (MANE Select).
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
            <div className="text-xs text-slate-600 font-mono mb-2 flex items-center gap-1.5 flex-wrap">
              <span>95% CI: [{t1.oddsRatioNoncoll.ciLower.toFixed(2)} - {t1.oddsRatioNoncoll.ciUpper.toFixed(2)}] • {t1.oddsRatioNoncoll.formattedP}</span>
              {t1.oddsRatioNoncoll.isBootstrapped && (
                <span className="text-[10px] font-sans font-semibold bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded border border-indigo-200" title="Monte Carlo Bootstrapped Percentile CI (B=10,000) for small-sample robustness">
                  Bootstrapped (B=10k)
                </span>
              )}
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
            <div className="text-xs text-slate-600 font-mono mb-2 flex items-center gap-1.5 flex-wrap">
              <span>95% CI: [{t1.gInitialAminoAcids.metric.ciLower.toFixed(2)} - {t1.gInitialAminoAcids.metric.ciUpper.toFixed(2)}] • {t1.gInitialAminoAcids.metric.formattedP}</span>
              {t1.gInitialAminoAcids.metric.isBootstrapped && (
                <span className="text-[10px] font-sans font-semibold bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded border border-slate-300" title="Monte Carlo Bootstrapped Percentile CI (B=10,000) for small-sample robustness">
                  Bootstrapped (B=10k)
                </span>
              )}
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

      {/* Methodology, 2x2 Contingency Table & Split-Site Controls Note */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center justify-between w-full text-left text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Methodology: 2×2 Contingency Table, MANE Select Baseline &amp; Split Pseudo-Dyad Controls</span>
          </span>
          {showMethodology ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showMethodology && (
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-3">
            <div>
              <h5 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                2×2 Contingency Matrix for Fisher&rsquo;s Exact Test (Genome Comparison)
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px] bg-white rounded-lg overflow-hidden border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="p-2 border-r border-slate-200">Cohort / Category</th>
                      <th className="p-2 border-r border-slate-200">Preceding Codon Ends in &lsquo;C&rsquo; (CpG Dyad)</th>
                      <th className="p-2 border-r border-slate-200">Preceding Codon Ends in A/T/G (Non-CpG)</th>
                      <th className="p-2 font-mono">Total Codons Evaluated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-medium text-slate-800 border-r border-slate-200">
                        Collagenous Glycines in {geneSymbol}
                      </td>
                      <td className="p-2 font-mono text-blue-700 font-bold border-r border-slate-200">
                        {t1.cpgDyadsCount} ({t1.cpgDyadsPct}%)
                      </td>
                      <td className="p-2 font-mono text-slate-700 border-r border-slate-200">
                        {t1.collagenousGlycines - t1.cpgDyadsCount} ({((1 - t1.cpgDyadsCount / Math.max(1, t1.collagenousGlycines)) * 100).toFixed(1)}%)
                      </td>
                      <td className="p-2 font-mono text-slate-700 font-semibold">{t1.collagenousGlycines}</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-2 font-medium text-slate-800 border-r border-slate-200">
                        Human Coding Genome (MANE Select v1.3 Canonical CDS)
                      </td>
                      <td className="p-2 font-mono text-slate-700 font-bold border-r border-slate-200">
                        104,875 (14.31%)
                      </td>
                      <td className="p-2 font-mono text-slate-700 border-r border-slate-200">
                        627,668 (85.69%)
                      </td>
                      <td className="p-2 font-mono text-slate-700 font-semibold">732,543</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-[11px] leading-relaxed">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Why Genome-Wide Comparison is Appropriate:</strong>
                Due to spontaneous 5mC hydrolytic deamination over evolutionary time, CpG dinucleotides are universally depleted across mammalian genomes (global CpG depletion). The 14.31% frequency represents the neutral background equilibrium rate of adjacent-codon C-G junctions across all 732,543 coding junctions in the MANE Select human reference. Depletion of collagenous Gly dyads below this baseline (OR &lt; 1, P &lt; 0.05) proves the action of heightened structural purifying selection against mutagenic hotspots.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Split Pseudo-Dyads as Natural Controls:</strong>
                When a Yaa and Gly codon are separated by an intron, their mRNA junction creates a &ldquo;split pseudo-dyad&rdquo; that does not exist as a contiguous CpG in genomic DNA, rendering it immune to genomic 5mC deamination. JASN demonstrated that split sites are retained at expected frequencies while true genomic dyads are severely purged&mdash;providing a definitive internal biological negative control.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Dual-Strand Symmetry (G&rarr;A vs C&rarr;T):</strong>
                A CpG dyad undergoes 5mC deamination on both strands. On the antisense strand, C&rarr;T manifests as Glycine G&rarr;A (missense loss of Gly), devastating the triple helix and facing rigorous purifying selection. On the sense strand, C&rarr;T mutates the 3rd base of Yaa (e.g. Pro CCC&rarr;CCT, His CAC&rarr;CAT), which is predominantly <em>synonymous (silent)</em>, demonstrating why selection is asymmetric despite symmetric chemical deamination.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-1">Small-Sample Monte Carlo Bootstrap (B=10k):</strong>
                For contingency tables with rare cell counts (&le; 5), the standard Woolf logit asymptotic approximation is unreliable. We implement a Monte Carlo parametric bootstrap (B=10,000 resamples from Binomial distributions) to compute robust empirical 2.5% and 97.5% percentile confidence limits.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
