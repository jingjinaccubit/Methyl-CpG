import React, { useState } from 'react';
import {
  Info,
  Dna,
  Flame,
  Search,
  Activity,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ExternalLink
} from 'lucide-react';

interface ToolSummaryBannerProps {
  onOpenPaperModal?: () => void;
  onOpenCollagenTable?: () => void;
}

export const ToolSummaryBanner: React.FC<ToolSummaryBannerProps> = ({
  onOpenPaperModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden mb-8 transition-all">
      {/* Banner Top Header */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300 shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold tracking-tight text-white m-0">
                Purpose &amp; Clinical Scope
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-400/20 text-cyan-200 border border-blue-400/30">
                44 Collagen Genes • MANE Select v1.5
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                ClinVar &amp; gnomAD Integrated
              </span>
            </div>
            <p className="text-xs text-slate-300 m-0 mt-0.5">
              Deciphering methylation-mediated mutational hotspots &amp; recurrent Gly substitutions across collagenopathies.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10 shrink-0"
        >
          {isExpanded ? (
            <>
              <span>Collapse</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Overview</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Main Content Body */}
      {isExpanded && (
        <div className="p-6 bg-slate-50/60 space-y-5">
          {/* Executive Summary */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <p className="m-0">
              <strong className="text-slate-900 font-semibold">Methyl-CpG Hotspot Explorer</strong> is an automated clinical genetics platform designed to identify, quantify, and interpret <strong className="text-indigo-900 font-semibold">methylation-mediated mutational hotspots</strong> across human collagen genes (underlying disorders such as Alport Syndrome, Osteogenesis Imperfecta, and Ehlers-Danlos Syndrome). It mechanistically explains why critical triple-helical <span className="font-mono text-indigo-700 font-semibold">Glycine</span> codons are disproportionately predisposed to recurrent pathogenic substitutions via spontaneous 5-methylcytosine deamination (<span className="font-mono text-rose-600 font-semibold">m⁵C → T</span>) at CpG dinucleotides.
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Pillar 1 */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-blue-700">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Dna className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 m-0">CpG Dyad Detection</h3>
                </div>
                <p className="text-xs text-slate-600 m-0 leading-normal">
                  Identifies hypermutable <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded text-[11px] font-mono">CCG|GGN</code> and <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded text-[11px] font-mono">NCG|GGN</code> junction dyads causing Glycine substitutions (<span className="font-semibold text-slate-700">Gly→Arg / Ser / Cys / Asp / Glu / Val / Ala</span>).
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-indigo-700">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 m-0">T1: Evolutionary Depletion</h3>
                </div>
                <p className="text-xs text-slate-600 m-0 leading-normal">
                  Quantifies negative evolutionary pressure against CpG dyads across collagenous domains versus coding genome baselines (14.3%) and tests codon depletion (<span className="font-mono text-[11px]">Pro CCC</span>).
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-amber-700">
                  <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 m-0">T2: ClinVar Recurrence</h3>
                </div>
                <p className="text-xs text-slate-600 m-0 leading-normal">
                  Cross-references 749 CpG dyads against ACMG Pathogenic/Likely Pathogenic variants, computes hotspot odds ratios, and flags unreported high-risk candidate hotspots.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-purple-700">
                  <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center">
                    <Search className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 m-0">T3: De Novo Mutability</h3>
                </div>
                <p className="text-xs text-slate-600 m-0 leading-normal">
                  Leverages context-specific gnomAD trinucleotide mutation rates (<span className="font-mono text-[11px]">μ ≈ 1.18–1.42×10⁻⁷</span>, ~10–12× elevation) to model recurrent de novo mutation probability and distinguish somatic vs. germline risks.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Guidance / Actions Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-slate-500 border-t border-slate-200/60">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-700">Quick Start:</span>
              <span>Select any gene from the library below or paste a custom sequence to generate comprehensive sequence logos, forest plots, and clinical reports (T4).</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href="https://doi.org/10.1681/ASN.0000001308"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-600 font-mono inline-flex items-center gap-1 transition-colors text-xs hover:underline"
                title="View published article on JASN (DOI: 10.1681/ASN.0000001308)"
              >
                <span>DOI: 10.1681/ASN.0000001308</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {onOpenPaperModal && (
                <button
                  onClick={onOpenPaperModal}
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>JASN Reference Model</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
