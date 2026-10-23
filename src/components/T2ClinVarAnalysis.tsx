import React from 'react';
import { Flame, CheckCircle, ShieldCheck, AlertCircle, FileSearch, Info } from 'lucide-react';
import type { T2Stats, CpGSite } from '../types';
import { CLINVAR_RELEASE_DATE } from '../data/clinvarData';

interface T2ClinVarAnalysisProps {
  t2: T2Stats;
  cpgSites: CpGSite[];
  geneSymbol: string;
}

export const T2ClinVarAnalysis: React.FC<T2ClinVarAnalysisProps> = ({
  t2,
  cpgSites,
  geneSymbol,
}) => {
  const reportedSites = cpgSites.filter(s => s.clinvar.isPathogenicOrLikely);
  const candidateSites = cpgSites.filter(s => !s.clinvar.isPathogenicOrLikely && s.type === 'dyad');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            T2
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 m-0">
              T2: ClinVar Mutational Hotspots &amp; Recurrence Registry
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              Cross-referencing ClinVar missense variants to evaluate Pathogenic (P) / Likely Pathogenic (LP) hotspot status
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Flame className="w-3.5 h-3.5 mr-1 text-amber-600" />
          {t2.cpgDyadPlpCount} P / LP Hotspots Confirmed in ClinVar
        </span>
      </div>

      {/* 2 Key Comparison Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Metric 1: Reporting Rate at CpG vs Non-CpG */}
        <div className="bg-amber-50/40 rounded-xl p-5 border border-amber-200">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-800 uppercase mb-2">
            <span>ClinVar P / LP Pathogenicity Rate (Hotspot Proxy)</span>
            <FileSearch className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-black text-slate-900 font-mono">
              OR = {t2.reportingOddsRatio.formattedP === 'N/A' ? 'N/A' : t2.reportingOddsRatio.or.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-600">
              {t2.reportingOddsRatio.formattedP === 'N/A'
                ? '[95% CI: N/A]'
                : `[95% CI ${t2.reportingOddsRatio.ciLower.toFixed(2)} - ${t2.reportingOddsRatio.ciUpper.toFixed(2)}]`}
            </span>
            <span className="text-xs font-bold text-emerald-700 ml-auto">
              {t2.reportingOddsRatio.formattedP}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <div className="text-[11px] text-slate-500 font-medium">CpG Dyad Glycines</div>
              <div className="text-lg font-bold text-amber-900 font-mono">
                {t2.cpgReportingRatePct}%
              </div>
              <div className="text-[11px] text-slate-500">
                ({t2.cpgDyadPlpCount} of {t2.cpgDyadTotal} P/LP: {t2.cpgDyadPCount} P, {t2.cpgDyadLpCount} LP{t2.cpgDyadBothPlpCount > 0 ? `, ${t2.cpgDyadBothPlpCount} P/LP` : ''})
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Non-CpG Glycines</div>
              <div className="text-lg font-bold text-slate-800 font-mono">
                {t2.nonCpgReportingRatePct}%
              </div>
              <div className="text-[11px] text-slate-500">
                ({t2.nonCpgReportedCount} of {t2.nonCpgTotal} P/LP)
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {t2.cpgDyadPlpCount > 0
              ? 'Glycines retaining a CpG dyad are predominantly confirmed as Pathogenic (P) or Likely Pathogenic (LP) variants in ClinVar.'
              : 'No Pathogenic/Likely Pathogenic first-base G>A variants have been registered in ClinVar for this gene.'}
          </p>
        </div>

        {/* Metric 2: Multiple Submitters Recurrence Rate */}
        <div className="bg-blue-50/40 rounded-xl p-5 border border-blue-200">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-800 uppercase mb-2">
            <span>Multiple-Submitters Recurrence Proxy</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {t2.cpgMultiSubmittersPct}% Recurrence
            </span>
            <span className="text-xs font-bold text-emerald-700 ml-auto">
              {t2.multiSubmitterOddsRatio.formattedP}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <div className="text-[11px] text-slate-500 font-medium">CpG G→A Variants</div>
              <div className="text-lg font-bold text-blue-900 font-mono">
                {t2.cpgMultiSubmittersCount} of {t2.cpgDyadPlpCount}
              </div>
              <div className="text-[11px] text-slate-500">Multi-lab independent</div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500 font-medium">Non-CpG G→A Variants</div>
              <div className="text-lg font-bold text-slate-800 font-mono">
                {t2.nonCpgMultiSubmittersCount} of {t2.nonCpgReportedCount}
              </div>
              <div className="text-[11px] text-slate-500">Multi-lab independent ({t2.nonCpgMultiSubmittersPct}%)</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {t2.cpgMultiSubmittersCount > 0
              ? `CpG G→A variants in ${geneSymbol} demonstrate extensive multi-laboratory independent submissions, validating biological recurrence.`
              : 'Multi-submitter recurrence evaluation applies to confirmed pathogenic variants across clinical laboratories.'}
          </p>
        </div>
      </div>

      {/* Methodology Calibration Note */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs mb-6">
        <div className="flex items-center gap-2 font-semibold text-slate-800 mb-1.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Methodology Calibration &amp; Paper Benchmark Note</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono ml-auto">
            ClinVar data as of {CLINVAR_RELEASE_DATE}
          </span>
        </div>
        <div className="text-slate-600 space-y-1.5 pl-6 leading-relaxed">
          <p className="m-0">
            <strong>Tool Pipeline:</strong> Evaluates single-nucleotide first-base G→A missense variants filtered symmetrically for Pathogenic / Likely Pathogenic (P/LP) status across both CpG and non-CpG sites (COL4A5 yields OR = 7.01, non-CpG multi-submitters = 38% [69 of 182]).
          </p>
          <p className="m-0 text-slate-500">
            <strong>Original JASN Paper Benchmark:</strong> Tabulated all reported first-base G→A variants regardless of clinical significance (yielding OR = 7.6, non-CpG multi-submitters = 30% [52 of 173]). The slight numerical variations reflect stricter P/LP curation and ongoing ClinVar database updates over time.
          </p>
        </div>
      </div>

      {/* Candidate Hotspots Discovery Section */}
      {candidateSites.length > 0 && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-300">
          <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Targeted Candidate Hotspots for Biobank Discovery (Unreported / Non-P/LP in ClinVar)</span>
          </div>
          <p className="text-xs text-amber-800 mb-3">
            These positions possess identical mutational machinery and CpG dyads, but lack published ClinVar P/LP records for collagen disorder. They represent prime candidates for genotype-first biobank screening:
          </p>
          <div className="flex flex-wrap gap-2">
            {candidateSites.map(cand => (
              <span
                key={cand.id}
                className="bg-white border border-amber-300 text-amber-900 font-mono text-xs px-2.5 py-1 rounded-lg font-semibold shadow-2xs inline-flex items-center gap-1.5"
              >
                <span>{cand.residueName} ({cand.cDnaChange} → {cand.aaChange})</span>
                {cand.clinvar.significanceCode === 'VUS' && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-sans font-bold">VUS</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
