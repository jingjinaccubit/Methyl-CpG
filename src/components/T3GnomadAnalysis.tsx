import React from 'react';
import { Activity, Zap, Dna } from 'lucide-react';
import type { T3Stats, CpGSite } from '../types';

interface T3GnomadAnalysisProps {
  t3: T3Stats;
  cpgSites: CpGSite[];
  geneSymbol: string;
}

export const T3GnomadAnalysis: React.FC<T3GnomadAnalysisProps> = ({
  t3,
  cpgSites,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            T3
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 m-0">
              T3: gnomAD Mutability &amp; SNV Classification (Germline vs De Novo)
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              gnomAD context-dependent mutation probability score (μ) and recurrent de novo / somatic de novo stratification
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Zap className="w-3.5 h-3.5 mr-1 text-purple-600" />
          {t3.minFoldElevation && t3.maxFoldElevation && t3.minFoldElevation !== t3.maxFoldElevation
            ? `${t3.minFoldElevation}–${t3.maxFoldElevation}x`
            : `${t3.foldElevation}x`}{' '}
          Mutability Elevation
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Card 1: Mutation Rate Score */}
        <div className="bg-purple-50/30 rounded-xl p-4 border border-purple-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-purple-800 font-semibold uppercase mb-2">
              <span>gnomAD CpG Mutation Rate (μ)</span>
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-900 font-mono mb-1">
              {t3.minMutabilityCpG && t3.maxMutabilityCpG && t3.minMutabilityCpG !== t3.maxMutabilityCpG
                ? `${(t3.minMutabilityCpG * 1e7).toFixed(2)}–${(t3.maxMutabilityCpG * 1e7).toFixed(2)} × 10⁻⁷`
                : `${(t3.avgMutabilityCpG * 1e7).toFixed(2)} × 10⁻⁷`}
            </div>
            <div className="text-xs text-purple-700 font-semibold mb-2">
              Top 0.3%–0.9% Percentile in Human Coding Genome
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hydrolytic deamination of 5-methylcytosine on the reverse strand accelerates forward G→A transitions to ~
              {t3.minFoldElevation && t3.maxFoldElevation && t3.minFoldElevation !== t3.maxFoldElevation
                ? `${t3.minFoldElevation}–${t3.maxFoldElevation}`
                : t3.foldElevation}
              -fold higher than background point mutability (1.20 × 10⁻⁸). (Karczewski et al., <em>Nature</em> 2020 Supplementary Dataset 1; Roufayel et al., 2020)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-200 text-[11px] text-purple-800 font-medium">
            {cpgSites.length > 0
              ? 'Biophysical hotspot drive confirmed by gnomAD context mutability matrix.'
              : 'Neutral background mutability across collagenous triplets.'}
          </div>
        </div>

        {/* Card 2: Recurrent Germline De Novo Mode */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-2">
              <span>Recurrent De Novo Mechanism</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono mb-1">
              {t3.deNovoPredictedCount} Hotspots
            </div>
            <div className="text-xs text-slate-600 mb-2 font-medium">
              Prone to Recurrent De Novo Mutation
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t3.deNovoPredictedCount > 0
                ? `Because of high CpG mutability, these ${t3.deNovoPredictedCount} pathogenic variant(s) frequently recur de novo in separate lineages. For these loci, a negative family history should not be used to rule out diagnosis!`
                : 'No confirmed pathogenic CpG glycine hotspots currently identified in this gene. Standard family history and pedigree evaluation remain applicable.'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
            {t3.deNovoPredictedCount > 0
              ? 'Clinical counseling: independent recurrent de novo occurrences.'
              : 'Standard ACGS/AMP variant evaluation recommended.'}
          </div>
        </div>

        {/* Card 3: Somatic De Novo Mutagenesis */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-2">
              <span>Somatic De Novo Risk</span>
              <Dna className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono mb-1">
              {t3.somaticDeNovoPredictedCount} In-Codon Sites
            </div>
            <div className="text-xs text-slate-600 mb-2 font-medium">
              Vulnerable to Post-zygotic / Tissue Mosaicism
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              High prevalence of CpG methylation in somatic cells (such as podocytes or fibroblasts) raises the possibility of cumulative mutational burden predisposing to late-onset disease.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-700 font-medium">
            Biological hypothesis for age-dependent connective tissue fragility.
          </div>
        </div>
      </div>

      {/* Summary Table of Classification Status */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span>Target CpG Positions &amp; gnomAD Risk Stratification</span>
          <span className="text-[11px] font-normal text-slate-500 lowercase">
            showing {cpgSites.length} CpG sites
          </span>
        </div>
        <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto text-xs">
          {cpgSites.map(site => (
            <div key={site.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-900 w-16">{site.residueName}</span>
                <span className="font-mono text-slate-600">{site.cDnaChange}</span>
                <span className="font-mono text-slate-500">→ {site.aaChange}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500">
                  μ = {site.gnomad.mutability.toExponential(2)}
                </span>
                <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                  {site.gnomad.alleleCount !== undefined
                    ? (site.gnomad.alleleCount > 0
                        ? `gnomAD AC=${site.gnomad.alleleCount}`
                        : site.gnomad.variantId
                        ? 'gnomAD AC=0 (Reference cohort)'
                        : 'gnomAD AC=0 (Unobserved)')
                    : 'gnomAD Unindexed'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                    site.gnomad.classification.includes('Recurrent De Novo')
                      ? 'bg-purple-100 text-purple-800'
                      : site.gnomad.classification.includes('Candidate Hotspot')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {site.gnomad.classification}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
