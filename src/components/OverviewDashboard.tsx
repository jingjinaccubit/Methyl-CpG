import React from 'react';
import {
  Dna,
  Flame,
  AlertTriangle,
  FileCheck2,
  Layers,
  Sparkles
} from 'lucide-react';
import type { SequenceAnalysisResult } from '../types';

interface OverviewDashboardProps {
  result: SequenceAnalysisResult;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ result }) => {
  const argCount = result.cpgDyads.filter(d => d.mutAA === 'R').length;
  const serCount = result.cpgDyads.filter(d => d.mutAA === 'S').length;

  return (
    <div className="mb-8">
      {/* Target summary bar */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-300">Analysis Target</span>
            <span className="bg-blue-500/30 text-blue-200 text-xs px-2 py-0.5 rounded-full font-mono">
              {result.geneInfo?.type || 'Collagen Analysis'}
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white m-0">
            {result.geneSymbol}
            {result.geneInfo && (
              <span className="text-sm font-normal text-slate-300 ml-3">
                ({result.geneInfo.name})
              </span>
            )}
          </h2>
          {result.geneInfo && (
            <p className="text-xs text-blue-200/80 mt-1 m-0">
              {result.geneInfo.disease} • Transcript: <span className="font-mono text-white">{result.transcriptId || result.geneInfo.refseqId}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-xs border border-white/10 px-4 py-2 rounded-xl text-center">
            <div className="text-xs text-blue-200 uppercase font-semibold">CDS Length</div>
            <div className="text-lg font-bold font-mono">{result.cdsLength.toLocaleString()} bp</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs border border-white/10 px-4 py-2 rounded-xl text-center">
            <div className="text-xs text-blue-200 uppercase font-semibold">Total Codons</div>
            <div className="text-lg font-bold font-mono">{result.proteinLength.toLocaleString()} aa</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {/* Collagenous Gly */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Collagenous Gly</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {result.t1.collagenousGlycines}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            of {result.t1.totalGlycines} total glycines (runs ≥ 5)
          </div>
        </div>

        {/* CpG Dyads */}
        <div className="bg-white rounded-xl p-4 border border-blue-200 bg-blue-50/20 shadow-2xs">
          <div className="flex items-center justify-between text-blue-700 mb-1.5">
            <span className="text-xs font-bold uppercase">CpG Dyads</span>
            <Dna className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900 font-mono">
            {result.cpgDyads.length}
          </div>
          <div className="text-[11px] text-blue-600 mt-1 font-semibold">
            {result.t1.cpgDyadsPct}% of coll-Gly
            {!isNaN(result.t1.oddsRatioGenome.or) && result.t1.oddsRatioGenome.or < 1 && result.t1.oddsRatioGenome.pValue < 0.05
              ? ' (Suppressed)'
              : !isNaN(result.t1.oddsRatioGenome.or) && result.t1.oddsRatioGenome.or > 1 && result.t1.oddsRatioGenome.pValue < 0.05
              ? ' (Elevated)'
              : ''}
          </div>
        </div>

        {/* In-Codon CpGs */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">In-Codon CpGs</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {result.inCodonCpGs.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            e.g. Pro CCG / Arg CGN
          </div>
        </div>

        {/* ClinVar Hotspots */}
        <div className="bg-white rounded-xl p-4 border border-amber-200 bg-amber-50/20 shadow-2xs">
          <div className="flex items-center justify-between text-amber-700 mb-1.5">
            <span className="text-xs font-bold uppercase">ClinVar P / LP Hotspots</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900 font-mono">
            {result.t2.cpgDyadPlpCount} / {result.cpgDyads.length}
            <span className="text-sm font-semibold text-amber-700 ml-1.5">P/LP</span>
          </div>
          <div className="text-[11px] text-amber-700 mt-1 font-semibold flex items-center justify-between">
            <span>{result.t2.cpgDyadPCount} P • {result.t2.cpgDyadLpCount} LP{result.t2.cpgDyadBothPlpCount > 0 ? ` • ${result.t2.cpgDyadBothPlpCount} P/LP` : ''}</span>
            <span className="text-slate-500 font-normal">({result.t2.cpgDyadCandidateCount} candidate)</span>
          </div>
        </div>

        {/* High Severity Substitutions (Arg) */}
        <div className="bg-white rounded-xl p-4 border border-rose-200 bg-rose-50/20 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700 mb-1.5">
            <span className="text-xs font-bold uppercase">Severe (Gly→Arg)</span>
            <Flame className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-900 font-mono">
            {argCount}
          </div>
          <div className="text-[11px] text-rose-700 mt-1 font-medium">
            -7 yrs kidney failure onset
          </div>
        </div>

        {/* Moderate Substitutions (Ser) */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-xs font-semibold uppercase">Moderate (Gly→Ser)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {serCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Less destabilizing class
          </div>
        </div>
      </div>
    </div>
  );
};
