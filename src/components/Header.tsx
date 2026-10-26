import React from 'react';
import { Dna, Table2, FileText, Sparkles, Database, Lock } from 'lucide-react';
import { CLINVAR_RELEASE_DATE } from '../data/clinvarData';

interface HeaderProps {
  onOpenCollagenTable: () => void;
  onOpenPaperModal: () => void;
  onLock?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCollagenTable,
  onOpenPaperModal,
  onLock,
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
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0">
                Methyl-CpG Hotspot Explorer
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Collagen Disorders
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-300 font-mono">
                <Database className="w-3 h-3 text-emerald-600" />
                ClinVar {CLINVAR_RELEASE_DATE}
              </span>
            </div>
            <p className="text-xs text-slate-500 m-0 flex items-center gap-1.5 mt-0.5">
              <span>Detecting CpG Hotspots • T1 Depletion • T2 ClinVar • T3 gnomAD • T4 Report</span>
            </p>
          </div>
        </div>

        {/* Action Controls & External References */}
        <div className="flex items-center gap-2 flex-wrap max-w-full">
          <button
            onClick={onOpenCollagenTable}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer shrink-0"
          >
            <Table2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">28 Collagen Types Table (46 Genes)</span>
            <span className="sm:hidden">Collagen Table</span>
          </button>

          <button
            onClick={onOpenPaperModal}
            className="px-2.5 sm:px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-indigo-200 transition-colors cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="hidden sm:inline">JASN Paper Model</span>
            <span className="sm:hidden">Paper Model</span>
          </button>

          {onLock && (
            <button
              onClick={onLock}
              title="Lock Platform / Sign Out"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-lg text-xs font-semibold inline-flex items-center gap-1 border border-slate-300 hover:border-rose-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          )}

          <div className="hidden lg:flex items-center text-[11px] text-slate-400 pl-2 border-l border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
            <span>Static Architecture (Pure Client-side JS)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
