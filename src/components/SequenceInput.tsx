import React, { useState } from 'react';
import { Play, Sparkles, RefreshCw, AlertCircle, FileCode } from 'lucide-react';
import { COLLAGEN_TABLE, PRELOADED_CDS } from '../data/collagenTable';
import type { CollagenGeneInfo } from '../types';

interface SequenceInputProps {
  onAnalyze: (sequence: string, geneInfo?: CollagenGeneInfo, frameOffset?: number) => void;
  isLoading?: boolean;
}

export const SequenceInput: React.FC<SequenceInputProps> = ({
  onAnalyze,
  isLoading = false,
}) => {
  const [selectedGeneSymbol, setSelectedGeneSymbol] = useState<string>('COL4A5');
  const [sequenceText, setSequenceText] = useState<string>(PRELOADED_CDS['COL4A5'] || '');
  const [frameOffset, setFrameOffset] = useState<number>(0);

  const selectedGeneInfo = COLLAGEN_TABLE.find(g => g.gene === selectedGeneSymbol);

  const handleSelectGene = (geneSymbol: string) => {
    setSelectedGeneSymbol(geneSymbol);
    if (PRELOADED_CDS[geneSymbol]) {
      setSequenceText(PRELOADED_CDS[geneSymbol]);
    } else {
      setSequenceText('');
    }
  };

  const handleQuickPreset = (geneSymbol: string) => {
    handleSelectGene(geneSymbol);
    const gene = COLLAGEN_TABLE.find(g => g.gene === geneSymbol);
    const seq = PRELOADED_CDS[geneSymbol] || '';
    if (seq) {
      onAnalyze(seq, gene, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sequenceText.trim()) return;
    onAnalyze(sequenceText, selectedGeneInfo, frameOffset);
  };

  const cleanedLength = sequenceText.replace(/[^acgtuACGTU]/g, '').length;
  const codonCount = Math.floor(cleanedLength / 3);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Top Banner / Preset Buttons */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 m-0">
            <FileCode className="w-5 h-5 text-blue-600" />
            <span>Gene Sequence Input &amp; Target Selection</span>
          </h2>
          <p className="text-xs text-slate-500 m-0 mt-0.5">
            Select a standard collagen gene or paste an arbitrary FASTA/cDNA sequence to execute T1-T4 analysis.
          </p>
        </div>

        {/* Quick Demo Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500">Quick Demos:</span>
          <button
            type="button"
            onClick={() => handleQuickPreset('COL4A5')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              selectedGeneSymbol === 'COL4A5'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            ⭐ COL4A5 (Alport Benchmark)
          </button>

          <button
            type="button"
            onClick={() => handleQuickPreset('COL1A1')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              selectedGeneSymbol === 'COL1A1'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            COL1A1 (OI / EDS)
          </button>

          <button
            type="button"
            onClick={() => handleQuickPreset('COL3A1')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              selectedGeneSymbol === 'COL3A1'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            COL3A1 (vEDS)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Dropdown Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              1. Select Predefined Collagen Gene (28 Types / 46 Entries)
            </label>
            <select
              value={selectedGeneSymbol}
              onChange={e => handleSelectGene(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
            >
              {COLLAGEN_TABLE.map(g => (
                <option key={g.gene} value={g.gene}>
                  {g.gene} — {g.type} ({g.locusType === 'pseudogene' ? 'Pseudogene' : g.disease.split(',')[0]}) {g.hasPreloadedCds ? '✓ Preloaded' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Selected Gene Annotation
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-600 flex flex-col justify-center h-[42px]">
              {selectedGeneInfo ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">{selectedGeneInfo.name}</span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span>{selectedGeneInfo.refseqId || selectedGeneInfo.transcriptId}</span>
                  </div>
                  <span className="font-mono bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                    {selectedGeneInfo.inheritance}
                  </span>
                </div>
              ) : (
                <span>Custom / Unknown Sequence Mode</span>
              )}
            </div>
          </div>
        </div>

        {/* Text Area for Sequence */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              2. Coding Sequence (FASTA or raw CDS cDNA)
            </label>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{cleanedLength.toLocaleString()} bp</span>
              <span>•</span>
              <span>{codonCount.toLocaleString()} codons</span>
              {cleanedLength % 3 !== 0 && (
                <span className="text-amber-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Length not divisible by 3
                </span>
              )}
            </div>
          </div>
          <textarea
            value={sequenceText}
            onChange={e => setSequenceText(e.target.value)}
            rows={5}
            placeholder="Paste your cDNA coding sequence or FASTA here (e.g. >gene_cds\nATGAAACTG...)"
            className="w-full bg-slate-50 font-mono text-xs text-slate-800 border border-slate-300 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all leading-relaxed"
          ></textarea>
        </div>

        {/* Reading Frame & Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-medium">Reading Frame:</span>
            {[0, 1, 2].map(offset => (
              <button
                key={offset}
                type="button"
                onClick={() => setFrameOffset(offset)}
                className={`px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                  frameOffset === offset
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                }`}
              >
                +{offset}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (PRELOADED_CDS[selectedGeneSymbol]) {
                  setSequenceText(PRELOADED_CDS[selectedGeneSymbol]);
                } else {
                  setSequenceText('');
                }
              }}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              Reset
            </button>

            <button
              type="submit"
              disabled={isLoading || !cleanedLength}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing T1-T4...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Run Analysis (T1 → T2 → T3 → T4)
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
