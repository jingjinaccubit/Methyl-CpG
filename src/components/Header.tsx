import React from 'react';
import { Dna, Table2, FileText, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCollagenTable: () => void;
  onOpenPaperModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCollagenTable,
  onOpenPaperModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo and Titles */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-blue-700 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0">
                Methyl-CpG Hotspot Explorer
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Collagen Disorders
              </span>
            </div>
            <p className="text-xs text-slate-500 m-0 flex items-center gap-1.5 mt-0.5">
              <span>Detecting CpG Hotspots • T1 Depletion • T2 ClinVar • T3 gnomAD • T4 Report</span>
            </p>
          </div>
        </div>

        {/* Action Controls & External References */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenCollagenTable}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
          >
            <Table2 className="w-4 h-4 text-blue-600" />
            28 Collagen Types Table (46 Genes & Pseudogenes)
          </button>

          <button
            onClick={onOpenPaperModal}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-indigo-200 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            JASN Paper Model
          </button>

          <div className="hidden lg:flex items-center text-[11px] text-slate-400 pl-2 border-l border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
            <span>Static Architecture (Pure Client-side JS)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
