import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ToolSummaryBanner } from './components/ToolSummaryBanner';
import { SequenceInput } from './components/SequenceInput';
import { OverviewDashboard } from './components/OverviewDashboard';
import { T1EvolutionaryDepletion } from './components/T1EvolutionaryDepletion';
import { T2ClinVarAnalysis } from './components/T2ClinVarAnalysis';
import { T3GnomadAnalysis } from './components/T3GnomadAnalysis';
import { T4Report } from './components/T4Report';
import { CollagenTableModal } from './components/CollagenTableModal';
import { PaperModal } from './components/PaperModal';
import { analyzeSequence } from './utils/bioCalculations';
import { COLLAGEN_TABLE, PRELOADED_CDS } from './data/collagenTable';
import type { SequenceAnalysisResult, CollagenGeneInfo } from './types';
import { Layers } from 'lucide-react';

export function App() {
  const [analysisResult, setAnalysisResult] = useState<SequenceAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'T1' | 'T2' | 'T3' | 'T4'>('ALL');
  const [isCollagenModalOpen, setIsCollagenModalOpen] = useState(false);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize with COL4A5 benchmark immediately upon mount
  useEffect(() => {
    const defaultGene = COLLAGEN_TABLE.find(g => g.gene === 'COL4A5');
    const defaultSeq = PRELOADED_CDS['COL4A5'] || '';
    if (defaultSeq && defaultGene) {
      const res = analyzeSequence(defaultSeq, defaultGene, 0);
      setAnalysisResult(res);
    }
  }, []);

  const handleRunAnalysis = (sequence: string, geneInfo?: CollagenGeneInfo, frameOffset: number = 0) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      try {
        const res = analyzeSequence(sequence, geneInfo, frameOffset);
        setAnalysisResult(res);
      } finally {
        setIsAnalyzing(false);
      }
    }, 150);
  };

  const handleSelectGeneFromModal = (gene: CollagenGeneInfo) => {
    const seq = PRELOADED_CDS[gene.gene] || '';
    if (seq) {
      handleRunAnalysis(seq, gene, 0);
    } else {
      // If sequence not preloaded, still create custom analysis
      handleRunAnalysis('', gene, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header
        onOpenCollagenTable={() => setIsCollagenModalOpen(true)}
        onOpenPaperModal={() => setIsPaperModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Purpose & Scientific Scope Summary */}
        <ToolSummaryBanner
          onOpenPaperModal={() => setIsPaperModalOpen(true)}
          onOpenCollagenTable={() => setIsCollagenModalOpen(true)}
        />

        {/* Sequence Input and Selector */}
        <SequenceInput onAnalyze={handleRunAnalysis} isLoading={isAnalyzing} />

        {analysisResult && (
          <div className="space-y-6">
            {/* Overview KPI Dashboard */}
            <OverviewDashboard result={analysisResult} />

            {/* Workflow Pipeline Step Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex items-center justify-between overflow-x-auto no-print">
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'ALL'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  All Tests (Full Pipeline)
                </button>

                <button
                  onClick={() => setActiveTab('T1')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'T1'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-[10px] flex items-center justify-center font-bold">1</span>
                  T1: Evolutionary Depletion
                </button>

                <button
                  onClick={() => setActiveTab('T2')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'T2'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold">2</span>
                  T2: ClinVar Hotspots
                </button>

                <button
                  onClick={() => setActiveTab('T3')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'T3'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-800 text-[10px] flex items-center justify-center font-bold">3</span>
                  T3: gnomAD SNV &amp; De Novo
                </button>

                <button
                  onClick={() => setActiveTab('T4')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'T4'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-bold">4</span>
                  T4: CpG Report &amp; Visuals
                </button>
              </div>

              <div className="hidden md:flex items-center text-xs text-slate-400 font-medium pr-3">
                <span>{analysisResult.cpgDyads.length} Hotspots Identified</span>
              </div>
            </div>

            {/* Step View Render */}
            {(activeTab === 'ALL' || activeTab === 'T1') && (
              <T1EvolutionaryDepletion t1={analysisResult.t1} geneSymbol={analysisResult.geneSymbol} />
            )}

            {(activeTab === 'ALL' || activeTab === 'T2') && (
              <T2ClinVarAnalysis
                t2={analysisResult.t2}
                cpgSites={analysisResult.cpgDyads}
                geneSymbol={analysisResult.geneSymbol}
              />
            )}

            {(activeTab === 'ALL' || activeTab === 'T3') && (
              <T3GnomadAnalysis
                t3={analysisResult.t3}
                cpgSites={analysisResult.allCpGSites}
                geneSymbol={analysisResult.geneSymbol}
              />
            )}

            {(activeTab === 'ALL' || activeTab === 'T4') && (
              <T4Report result={analysisResult} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-500">
            Methyl-CpG Hotspot Explorer • Clinical Genetics Platform for Collagen Disorders
          </div>
          <div className="text-slate-500 sm:text-right">
            Based on research published in <em>Journal of the American Society of Nephrology (JASN)</em>{' '}
            <span className="font-medium">DOI:</span>{' '}
            <a
              href="https://doi.org/10.1681/ASN.0000001308"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-mono transition-colors"
            >
              10.1681/ASN.0000001308
            </a>
          </div>
        </div>
        <div className="mt-3 px-4 text-center text-slate-500">
          This project is open-source for noncommercial use under the terms of the PolyForm Noncommercial License 1.0.0.
        </div>
      </footer>

      {/* Modals */}
      <CollagenTableModal
        isOpen={isCollagenModalOpen}
        onClose={() => setIsCollagenModalOpen(false)}
        onSelectGene={handleSelectGeneFromModal}
      />

      <PaperModal
        isOpen={isPaperModalOpen}
        onClose={() => setIsPaperModalOpen(false)}
      />
    </div>
  );
}

export default App;
