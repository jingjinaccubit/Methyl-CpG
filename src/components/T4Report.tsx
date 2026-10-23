import React, { useState } from 'react';
import {
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import type { SequenceAnalysisResult, CpGSite } from '../types';
import { SequenceLogo } from './SequenceLogo';
import { ForestPlot } from './ForestPlot';
import type { ForestPlotItem } from './ForestPlot';
import { exportReportToPdf } from '../utils/pdfExport';

interface T4ReportProps {
  result: SequenceAnalysisResult;
}

export const T4Report: React.FC<T4ReportProps> = ({ result }) => {
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  // Prepare Forest Plot items from T1, T2, T3 stats
  const forestItems: ForestPlotItem[] = [
    {
      id: 'cpg-genome',
      name: 'CpG Dyad Depletion vs Genome',
      category: 'T1 Evolutionary Purge',
      metric: result.t1.oddsRatioGenome,
      interpretation: `${result.t1.cpgDyadsPct}% in ${result.geneSymbol} vs 14.3% in Coding Genome`,
      direction: 'depleted'
    },
    {
      id: 'cpg-noncoll',
      name: 'CpG Dyads vs Other Codons in Gene',
      category: 'T1 Within-Gene Control',
      metric: result.t1.oddsRatioNoncoll,
      interpretation: `${result.t1.cpgDyadsPct}% in Yaa vs ${result.t1.noncollagenousDyadsPct}% in other codons`,
      direction: 'depleted'
    },
    {
      id: 'pro-ccc',
      name: 'Yaa Proline CCC Depletion',
      category: 'T1 Codon Bias',
      metric: result.t1.prolineAnalysis.cccDepletionMetric,
      interpretation: 'Yaa CCC usage vs other prolines in gene',
      direction: 'depleted'
    },
    {
      id: 'clinvar-hotspot',
      name: 'ClinVar Hotspot Reporting Enrichment',
      category: 'T2 Hotspot Recurrence',
      metric: result.t2.reportingOddsRatio,
      interpretation: `${result.t2.cpgReportingRatePct}% at CpG vs ${result.t2.nonCpgReportingRatePct}% non-CpG`,
      direction: 'enriched'
    },
    {
      id: 'clinvar-multi',
      name: 'Multiple-Submitters Recurrence Status',
      category: 'T2 Recurrence Validation',
      metric: result.t2.multiSubmitterOddsRatio,
      interpretation: `${result.t2.cpgMultiSubmittersPct}% CpG vs ${result.t2.nonCpgMultiSubmittersPct}% non-CpG multi-lab`,
      direction: 'enriched'
    }
  ];

  // Filtered variant table list
  const filteredSites = result.cpgDyads.filter(site => {
    const matchesSearch =
      site.residueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.cDnaChange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.aaChange.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.prevAA.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'ARG') return site.mutAA === 'R';
    if (filterMode === 'SER') return site.mutAA === 'S';
    if (filterMode === 'PLP') return site.clinvar.isPathogenicOrLikely;
    if (filterMode === 'REPORTED') return site.clinvar.reported;
    if (filterMode === 'CANDIDATE') return !site.clinvar.isPathogenicOrLikely;
    if (filterMode === 'MULTI') return site.clinvar.multipleSubmitters;
    return true;
  });

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      await exportReportToPdf('t4-report-container', `${result.geneSymbol}-Methyl-CpG-Report.pdf`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Residue',
      'cDNA_Change',
      'Protein_Change',
      'Yaa_Codon',
      'Yaa_AA',
      'Gly_Codon',
      'Junction_DNA',
      'Mutated_Codon',
      'Mutated_AA',
      'Destabilization_Class',
      'ClinVar_Significance',
      'ClinVar_Status',
      'Multiple_Submitters',
      'ClinVar_Variation_ID',
      'ClinVar_Condition',
      'gnomAD_Mutability_Rate',
      'gnomAD_Classification'
    ];

    const rows = result.cpgDyads.map(s => [
      s.residueName,
      s.cDnaChange,
      s.aaChange,
      s.prevCodon,
      s.prevAA,
      s.codon,
      s.junctionDna,
      s.mutCodon,
      s.mutAA,
      s.substitutionClass,
      s.clinvar.significanceCode,
      s.clinvar.significanceLabel,
      s.clinvar.multipleSubmitters ? 'Yes' : 'No',
      s.clinvar.variationId || 'N/A',
      `"${(s.clinvar.phenotype || '').replace(/"/g, '""')}"`,
      s.gnomad.mutability.toExponential(2),
      s.gnomad.classification
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${result.geneSymbol}_CpG_Hotspots.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="t4-report-container" className="space-y-8">
      {/* T4 Report Header & Export Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
            T4
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 m-0">
              T4: Comprehensive CpG Report &amp; Visualizations
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              Synthesis of Odds Ratios, Sequence Logos, Destabilization Stratification, and Clinical Variant Predictions
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap no-print">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export CSV
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            Print Report
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isExportingPdf ? 'Generating PDF...' : 'One-Click Export PDF'}
          </button>
        </div>
      </div>

      {/* Visualizations Section: 1) Sequence Logo, 2) Odds Ratio Forest Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization 1: Sequence Logo */}
        <SequenceLogo
          data={result.logoData.nucleotideYaaGlyXaa}
          title={`Nucleotide Composition across Yaa-Gly-Xaa (${result.geneSymbol})`}
          subtitle="Probability units. Highlights the marked depletion of cytosine at Yaa-3 and invariant G at Gly-1."
        />

        {/* Visualization 2: Forest Plot */}
        <ForestPlot
          items={forestItems}
          title={`Statistical Odds Ratios & Confidence Intervals (${result.geneSymbol})`}
        />
      </div>

      {/* Visualization 3: Comprehensive Hotspot Prediction Table (matching Fig 1J) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 m-0 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              <span>CpG Dyad Mutational Hotspots (JASN Figure 1J Prototype)</span>
            </h4>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              All predicted G→A glycine variants arising at methyl-CpG dyad sites across Yaa-Glycine codon boundaries.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap no-print">
            {[
              { id: 'ALL', label: `All (${result.cpgDyads.length})` },
              { id: 'PLP', label: `P / LP Hotspots (${result.t2.cpgDyadPlpCount})` },
              { id: 'ARG', label: 'Gly→Arg (Severe)' },
              { id: 'SER', label: 'Gly→Ser (Moderate)' },
              { id: 'CANDIDATE', label: `⭐ Candidates (${result.t2.cpgDyadCandidateCount})` },
              { id: 'MULTI', label: 'Multi-Submitters' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterMode === f.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4">Residue</th>
                <th className="py-3 px-4">[Yaa][Gly] CpG Dyad</th>
                <th className="py-3 px-4">cDNA Transition</th>
                <th className="py-3 px-4">AA Substitution</th>
                <th className="py-3 px-4">Destabilization Class</th>
                <th className="py-3 px-4">ClinVar Registry (P / LP)</th>
                <th className="py-3 px-4">gnomAD De Novo Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSites.map(site => {
                const isArg = site.mutAA === 'R';
                const isCandidate = !site.clinvar.isPathogenicOrLikely;

                return (
                  <tr
                    key={site.id}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      isCandidate ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    {/* Residue */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {site.residueName}
                      {isCandidate && (
                        <span className="ml-1 text-amber-600 font-bold" title="Candidate Hotspot">*</span>
                      )}
                    </td>

                    {/* Junction DNA */}
                    <td className="py-3 px-4 font-mono text-xs">
                      <span className="font-semibold text-blue-700">[{site.prevCodon}]</span>
                      <span className="mx-1 text-slate-400">•</span>
                      <span className="font-semibold text-amber-700">[{site.codon}]</span>
                      <span className="text-slate-400 text-[11px] ml-1.5">
                        ({site.prevAA} → G)
                      </span>
                    </td>

                    {/* cDNA Transition */}
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-800">
                      {site.cDnaChange}
                    </td>

                    {/* AA Substitution */}
                    <td className="py-3 px-4 font-mono font-bold text-xs text-slate-900">
                      {site.aaChange}
                    </td>

                    {/* Destabilization Class */}
                    <td className="py-3 px-4">
                      {isArg ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                          <Flame className="w-3 h-3 mr-1 text-rose-600" />
                          Severe (Gly→Arg)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <AlertTriangle className="w-3 h-3 mr-1 text-amber-600" />
                          Moderate (Gly→Ser)
                        </span>
                      )}
                    </td>

                    {/* ClinVar Registry */}
                    <td className="py-3 px-4 text-xs">
                      {site.clinvar.significanceCode === 'P' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md text-[11px] w-fit">
                            <CheckCircle className="w-3 h-3 text-rose-600" />
                            P (Pathogenic)
                          </span>
                          {site.clinvar.variationId && (
                            <a
                              href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${site.clinvar.variationId}/`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline font-mono"
                            >
                              VCV{site.clinvar.variationId}
                            </a>
                          )}
                          {site.clinvar.multipleSubmitters && (
                            <span className="text-[10px] text-slate-500 font-medium">
                              Multiple Submitters
                            </span>
                          )}
                        </div>
                      ) : site.clinvar.significanceCode === 'LP' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md text-[11px] w-fit">
                            <CheckCircle className="w-3 h-3 text-amber-600" />
                            LP (Likely Pathogenic)
                          </span>
                          {site.clinvar.variationId && (
                            <a
                              href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${site.clinvar.variationId}/`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline font-mono"
                            >
                              VCV{site.clinvar.variationId}
                            </a>
                          )}
                          {site.clinvar.multipleSubmitters && (
                            <span className="text-[10px] text-slate-500 font-medium">
                              Multiple Submitters
                            </span>
                          )}
                        </div>
                      ) : site.clinvar.significanceCode === 'P/LP' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 font-bold text-purple-800 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-md text-[11px] w-fit">
                            <CheckCircle className="w-3 h-3 text-purple-600" />
                            P / LP
                          </span>
                          {site.clinvar.variationId && (
                            <a
                              href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${site.clinvar.variationId}/`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline font-mono"
                            >
                              VCV{site.clinvar.variationId}
                            </a>
                          )}
                          {site.clinvar.multipleSubmitters && (
                            <span className="text-[10px] text-slate-500 font-medium">
                              Multiple Submitters
                            </span>
                          )}
                        </div>
                      ) : site.clinvar.significanceCode === 'VUS' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md text-[11px] w-fit">
                            VUS (Uncertain)
                          </span>
                          {site.clinvar.variationId && (
                            <a
                              href={`https://www.ncbi.nlm.nih.gov/clinvar/variation/${site.clinvar.variationId}/`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline font-mono"
                            >
                              VCV{site.clinvar.variationId}
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 w-fit">
                            ⭐ Candidate Hotspot
                          </span>
                          <span className="text-[10px] text-slate-400">Unreported in ClinVar</span>
                        </div>
                      )}
                    </td>

                    {/* gnomAD De Novo Risk */}
                    <td className="py-3 px-4 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-medium text-[11px] w-fit ${
                            site.gnomad.classification.includes('Recurrent De Novo')
                              ? 'bg-purple-100 text-purple-800'
                              : site.gnomad.classification.includes('Candidate Hotspot')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {site.gnomad.classification}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {site.gnomad.alleleCount !== undefined
                            ? (site.gnomad.alleleCount > 0
                                ? `gnomAD v4 AC=${site.gnomad.alleleCount} (AF=${site.gnomad.alleleFrequency.toExponential(1)})`
                                : site.gnomad.variantId
                                ? `gnomAD v4 AC=0 (AN=${site.gnomad.alleleNumber?.toLocaleString() || '1,100,000'})`
                                : 'gnomAD v4 AC=0 (Unobserved)')
                            : 'gnomAD Unindexed'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Notes */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            * Asterisks mark candidate hot spot positions predicted by reverse-strand methyl-CpG mutagenesis but not yet registered in ClinVar.
          </div>
          <div className="font-medium text-slate-500">
            Total {result.cpgDyads.length} CpG dyad sites identified in {result.geneSymbol}
          </div>
        </div>
      </div>
    </div>
  );
};
