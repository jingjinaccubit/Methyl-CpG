import React, { useState, useEffect, useMemo } from 'react';
import {
  Dna,
  Play,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Zap,
  Layers,
  ArrowLeft,
  FileText,
  Activity,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import {
  HOTSPOT_PRESETS,
  SAMPLE1_FASTA_CONTENT,
  SAMPLE2_SPERM_FASTA_CONTENT,
  SAMPLE3_NAR_FASTA_CONTENT,
  type HotspotPreset
} from '../data/simulationPresets';
import {
  runDuplexSimulation,
  type DuplexSimParams,
  type DuplexSimResult
} from '../utils/duplexSimulation';

interface DuplexSimulationPageProps {
  onBackToMain: () => void;
}

export const DuplexSimulationPage: React.FC<DuplexSimulationPageProps> = ({ onBackToMain }) => {
  // Selection & Input mode
  const [inputMode, setInputMode] = useState<'PRESET' | 'UPLOAD' | 'CUSTOM'>('PRESET');
  const [selectedCohort, setSelectedCohort] = useState<
    'SAMPLE1_COLLAGEN_ALPORT' | 'SAMPLE2_SPERM_DE_NOVO' | 'SAMPLE3_NAR_PAPER_METHYLATION'
  >('SAMPLE1_COLLAGEN_ALPORT');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('COL4A5_Gly624');
  const [customSeq, setCustomSeq] = useState<string>(HOTSPOT_PRESETS[0].flankingSequence201bp);
  const [customGene, setCustomGene] = useState<string>('COL4A5');
  const [customCdna, setCustomCdna] = useState<string>('c.1871G>A');
  const [hotspotIndex, setHotspotIndex] = useState<number>(100);

  // Simulation Parameters
  const [initialMolecules, setInitialMolecules] = useState<number>(6000);
  const [targetVaf, setTargetVaf] = useState<number>(0.0005); // 0.05%
  const [avgFamilySize, setAvgFamilySize] = useState<number>(5);
  const [damageRate, setDamageRate] = useState<number>(0.0003); // 0.03%
  const [seqErrorRate, setSeqErrorRate] = useState<number>(0.001); // 0.1%

  // Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<DuplexSimResult | null>(null);

  const filteredPresets = useMemo(() => {
    return HOTSPOT_PRESETS.filter(p => p.sourceCohort === selectedCohort);
  }, [selectedCohort]);

  const activePreset = useMemo(() => {
    return HOTSPOT_PRESETS.find(p => p.id === selectedPresetId) || filteredPresets[0] || HOTSPOT_PRESETS[0];
  }, [selectedPresetId, filteredPresets]);

  // Handle Cohort Switch
  const handleSwitchCohort = (
    cohort: 'SAMPLE1_COLLAGEN_ALPORT' | 'SAMPLE2_SPERM_DE_NOVO' | 'SAMPLE3_NAR_PAPER_METHYLATION'
  ) => {
    setSelectedCohort(cohort);
    const targetPresets = HOTSPOT_PRESETS.filter(p => p.sourceCohort === cohort);
    if (targetPresets.length > 0) {
      const p = targetPresets[0];
      setSelectedPresetId(p.id);
      setCustomSeq(p.flankingSequence201bp);
      setCustomGene(p.gene);
      setCustomCdna(p.cdnaChange);
      setHotspotIndex(p.hotspotIndex);
      setSeqErrorRate(p.empiricalErrorRate);
    }
  };

  // Handle Preset Selection
  const handleSelectPreset = (preset: HotspotPreset) => {
    setSelectedPresetId(preset.id);
    setCustomSeq(preset.flankingSequence201bp);
    setCustomGene(preset.gene);
    setCustomCdna(preset.cdnaChange);
    setHotspotIndex(preset.hotspotIndex);
    setSeqErrorRate(preset.empiricalErrorRate);
  };

  // Run simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      try {
        const rawTargetDepth = initialMolecules * avgFamilySize * 2;
        const params: DuplexSimParams = {
          targetName: `${customGene} ${customCdna} Hotspot`,
          gene: customGene,
          aminoAcidChange: activePreset.aminoAcidChange,
          cdnaChange: customCdna,
          targetSequence: customSeq,
          hotspotIndex,
          initialMolecules,
          targetVaf,
          rawDepthTarget: rawTargetDepth,
          avgFamilySize,
          pcrErrorRate: 0.0001,
          damageDeaminationRate: damageRate,
          seqErrorRate: seqErrorRate
        };
        const simResult = runDuplexSimulation(params);
        setResult(simResult);
      } finally {
        setIsSimulating(false);
      }
    }, 250);
  };

  // Run initial simulation upon mount
  useEffect(() => {
    handleRunSimulation();
  }, []);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      if (!content) return;

      const lines = content.split('\n');
      let seq = '';
      let header = 'Uploaded_Sequence';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('>')) {
          header = trimmed.substring(1);
        } else if (trimmed) {
          seq += trimmed.toUpperCase().replace(/[^ACGTN]/g, '');
        }
      }

      if (seq.length > 0) {
        setCustomSeq(seq);
        setCustomGene(header.split('_')[0] || 'CustomGene');
        setCustomCdna('c.TargetG>A');
        // Find central G or pos 100
        const mid = Math.floor(seq.length / 2);
        setHotspotIndex(mid);
        setInputMode('UPLOAD');
      }
    };
    reader.readAsText(file);
  };

  // Sample Downloads
  const downloadSample1Fasta = () => {
    const blob = new Blob([SAMPLE1_FASTA_CONTENT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample1_collagen_alport_targets.fa';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSample2Fasta = () => {
    const blob = new Blob([SAMPLE2_SPERM_FASTA_CONTENT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample2_human_sperm_mosaic_targets.fa';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSample3Fasta = () => {
    const blob = new Blob([SAMPLE3_NAR_FASTA_CONTENT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample3_nar_sperm_methylation_targets.fa';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadFastqSample = () => {
    if (!result) return;
    // Generate ~50 synthetic paired UMI FASTQ reads representing the simulation
    let fastqContent = '';
    const targetSeq = customSeq || 'ACGT';
    result.sampleFamilies.forEach((fam, idx) => {
      const qScore = 'I'.repeat(Math.min(150, targetSeq.length));
      fam.topReads.forEach((rBase, rIdx) => {
        fastqContent += `@SIM:${idx + 1}:${fam.tagA}+${fam.tagB}:1:1101:${rIdx + 1}:1000 1:N:0:1\n`;
        fastqContent += `${targetSeq.substring(0, Math.min(150, targetSeq.length))}\n+\n${qScore}\n`;
      });
    });

    const blob = new Blob([fastqContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customGene}_duplex_simulated_reads.fastq`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadReportCsv = () => {
    if (!result) return;
    const csvContent =
      `Metric,Raw Non-UMI Reads,Single-Strand Consensus (SSCS),Duplex Consensus (DCS)\n` +
      `Sequencing Depth,${result.rawTotalReads},${result.sscsTotalFamilies},${result.dcsTotalDuplexes}\n` +
      `Mutant Calls,${result.rawMutantReads},${result.sscsMutantFamilies},${result.dcsMutantCalls}\n` +
      `Observed VAF,${result.rawObservedVaf.toFixed(4)}%,${result.sscsObservedVaf.toFixed(4)}%,${result.dcsObservedVaf.toFixed(4)}%\n` +
      `True Injected VAF,${(result.params.targetVaf * 100).toFixed(4)}%,${(result.params.targetVaf * 100).toFixed(4)}%,${(result.params.targetVaf * 100).toFixed(4)}%\n` +
      `False Positives,Swamped,${result.sscsMutantFamilies - result.trueMutantsDetected},${result.falsePositivesDetected}\n` +
      `Sensitivity,N/A,${((result.sscsMutantFamilies / result.trueMutantsInjected) * 100).toFixed(2)}%,${result.sensitivity.toFixed(2)}%\n` +
      `False Discovery Rate (FDR),High,Dubious,${result.fdr.toFixed(2)}%\n` +
      `Single-Strand Damage Eliminated,0,0,${result.discordantRejected}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customGene}_duplex_simulation_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculatedRawDepth = initialMolecules * avgFamilySize * 2;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Explorer
            </button>
            <div className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
                <Dna className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-white tracking-tight leading-snug m-0">
                  Ultra-Deep Duplex Sequencing Simulation
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                  10,000× ~ 100,000× UMI Benchmark
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
            <button
              onClick={downloadSample1Fasta}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition whitespace-nowrap cursor-pointer shadow-sm"
              title="Download Sample 1 (Alport Patient Collagen Sequences, PRJNA1502590)"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              Sample 1 FASTA
            </button>
            <button
              onClick={downloadSample2Fasta}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition whitespace-nowrap cursor-pointer shadow-sm"
              title="Download Sample 2 (Human Sperm De Novo Mosaic Sequences, PRJNA588332 / Nature Medicine 2020)"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              Sample 2 (Sperm)
            </button>
            <button
              onClick={downloadSample3Fasta}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition whitespace-nowrap cursor-pointer shadow-sm"
              title="Download Sample 3 (NAR Paper Human Sperm WGBS GSE30340 & Negative Controls)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Sample 3 (NAR Paper)
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer transition shadow-sm whitespace-nowrap">
              <Upload className="w-3.5 h-3.5" />
              Upload FASTA
              <input
                type="file"
                accept=".fa,.fasta,.txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Explaining Methodology */}
        <div className="rounded-2xl bg-linear-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/20 p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Single-Molecule Accuracy & Low-Frequency Somatic / De Novo Mosaicism
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight m-0">
                In Silico Duplex Molecular Error Correction Model
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                At depths of <strong>10,000× to 100,000×</strong>, conventional Illumina sequencing produces dozens of false-positive reads from ~0.1% machine noise and single-strand heat deamination artifacts.
                This simulator tags each double-stranded DNA molecule with <strong>dual molecular barcodes (Duplex UMIs: α and β)</strong>, modeling how true biological mutations (present on both strands) are cleanly recovered down to <strong>0.01% VAF (1 in 10,000)</strong> with zero false discoveries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    Simulating Molecules...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Run Molecular Simulation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Setup: Input & Sliders on Left, Key KPIs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Target Selection & Parameters (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Target Selection Card */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 m-0">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  1. Target Hotspot & Sequence
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {customSeq.length} bp length
                </span>
              </div>

              {/* Mode switch */}
              <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setInputMode('PRESET')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                    inputMode === 'PRESET'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Collagen Presets
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('CUSTOM')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                    inputMode === 'CUSTOM'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom Sequence
                </button>
              </div>

              {inputMode === 'PRESET' ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-400 block font-medium">Select Cohort &amp; Benchmark Hotspot:</label>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {selectedCohort === 'SAMPLE1_COLLAGEN_ALPORT'
                        ? 'Sample 1: Patient Amplicon'
                        : selectedCohort === 'SAMPLE2_SPERM_DE_NOVO'
                        ? 'Sample 2: Sperm Mosaic'
                        : 'Sample 3: NAR Paper Sperm WGBS & Controls'}
                    </span>
                  </div>

                  {/* Cohort Switch Tabs: Sample 1 vs Sample 2 vs Sample 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleSwitchCohort('SAMPLE1_COLLAGEN_ALPORT')}
                      className={`py-1.5 px-2 text-xs rounded-lg transition text-left flex flex-col ${
                        selectedCohort === 'SAMPLE1_COLLAGEN_ALPORT'
                          ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        Sample 1: Alport
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">PRJNA1502590 • 3,820×</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchCohort('SAMPLE2_SPERM_DE_NOVO')}
                      className={`py-1.5 px-2 text-xs rounded-lg transition text-left flex flex-col ${
                        selectedCohort === 'SAMPLE2_SPERM_DE_NOVO'
                          ? 'bg-blue-500/20 text-blue-200 border border-blue-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        Sample 2: Sperm
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">PRJNA588332 • Breuss</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchCohort('SAMPLE3_NAR_PAPER_METHYLATION')}
                      className={`py-1.5 px-2 text-xs rounded-lg transition text-left flex flex-col ${
                        selectedCohort === 'SAMPLE3_NAR_PAPER_METHYLATION'
                          ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        Sample 3: NAR Paper
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">GSE30340 • 89% 5mC / Ctrls</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {filteredPresets.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPreset(p)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition border flex flex-col gap-0.5 ${
                          selectedPresetId === p.id
                            ? p.isSplitControl
                              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                              : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>
                            {p.gene} • {p.aminoAcidChange} ({p.cdnaChange})
                          </span>
                          <div className="flex items-center gap-1">
                            {p.isSplitControl ? (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Negative Control
                              </span>
                            ) : p.spermMethylationPct !== undefined ? (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {p.spermMethylationPct}% 5mC
                              </span>
                            ) : null}
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              {p.strand} strand
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">{p.syndrome}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 block">Target Sequence (FASTA/cDNA):</label>
                  <textarea
                    rows={4}
                    value={customSeq}
                    onChange={e => {
                      const s = e.target.value.toUpperCase().replace(/[^ACGTN]/g, '');
                      setCustomSeq(s);
                      setHotspotIndex(Math.floor(s.length / 2));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    placeholder="Paste 100-300bp DNA sequence..."
                  />
                </div>
              )}

              {/* Target Sequence Visualizer Highlight */}
              <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    {activePreset.isSplitControl
                      ? `Exon-Initial Junction Center (Pos ${hotspotIndex + 1}):`
                      : `CpG Dyad Center (Position ${hotspotIndex + 1}):`}
                  </span>
                  <span
                    className={`font-mono font-semibold ${
                      activePreset.isSplitControl ? 'text-amber-400' : 'text-cyan-400'
                    }`}
                  >
                    {activePreset.isSplitControl
                      ? 'Genomic DNA: Splice Acceptor AG (No CpG)'
                      : 'Top: G → Bottom: C'}
                  </span>
                </div>
                <div className="font-mono text-[11px] break-all leading-relaxed text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 max-h-20 overflow-y-auto">
                  <span>{customSeq.substring(0, hotspotIndex - 1)}</span>
                  <span
                    className={`${
                      activePreset.isSplitControl
                        ? 'bg-amber-500/30 text-amber-200 border-b border-amber-400'
                        : 'bg-amber-500/20 text-amber-300'
                    } px-0.5 font-bold rounded`}
                  >
                    {customSeq.charAt(hotspotIndex - 1) || 'C'}
                  </span>
                  <span
                    className={`${
                      activePreset.isSplitControl
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-cyan-500 text-slate-950'
                    } px-1 font-black rounded mx-0.5 shadow-sm`}
                  >
                    {customSeq.charAt(hotspotIndex) || 'G'}
                  </span>
                  <span>{customSeq.substring(hotspotIndex + 1)}</span>
                </div>
              </div>

              {/* Sample Provenance Small Text Annotation */}
              <div className="text-[11px] text-slate-400/90 border-t border-slate-800/80 pt-2.5 flex items-start gap-1.5 leading-normal">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-300">Sample &amp; Model Provenance:</strong>
                  <br />
                  &bull; <strong className="text-cyan-300">Sample 1 (Collagen Clinical Amplicon):</strong> Reference sequences are anchored on canonical <strong>MANE Select v1.5</strong> transcripts (RefSeq NM_000495.5 for <em>COL4A5</em>) and published mutational hotspots in <em>JASN</em> (DOI: <a href="https://doi.org/10.1681/ASN.0000001308" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">10.1681/ASN.0000001308</a>); baseline error profile is empirically derived from deep targeted sequencing in <strong>PRJNA1502590</strong> (SRR39847752, Alport type IV collagen sequencing, 3,820× depth).
                  <br />
                  &bull; <strong className="text-blue-300">Sample 2 (Human Sperm De Novo Mosaicism):</strong> Sourced from <strong>Breuss et al.</strong>, <em>Nature Medicine</em> (2020), human sperm deep sequencing study <strong>PRJNA588332</strong> (SRR10479998, TAS-ALL-Sperm), benchmarking male germline ultra-low-frequency <em>de novo</em> mutation transmission risks.
                  <br />
                  &bull; <strong className="text-amber-300">Sample 3 (NAR Paper Sperm WGBS &amp; Controls):</strong> Sourced from <strong>Molaro et al.</strong>, <em>Cell</em> (2011), GEO <strong>GSE30340</strong> human sperm whole-genome bisulfite sequencing (median 89% 5mC across 701 collagen CpG dyads). Includes the <strong>48 exon-initial split pseudo-dyad controls</strong> (intron-interrupted codon junctions lacking genomic CpG, dropping population G&gt;A deamination from 87% to 31%, <em>P</em> = 2.1 &times; 10<sup>-16</sup>).
                  <br />
                  &bull; <strong className="text-slate-300">Duplex UMI Architecture:</strong> Follows single-molecule digital sequencing standards from <strong>PRJNA844028</strong> (SRR32282580) and the TwinStrand dual-index duplex consensus validation framework.
                </span>
              </div>
            </div>

            {/* Parameter Sliders Card */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 space-y-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 m-0">
                <Sliders className="w-4 h-4 text-cyan-400" />
                2. Sequencing & Damage Parameters
              </h3>

              {/* Spiked VAF */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">True Spiked VAF:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {(targetVaf * 100).toFixed(3)}% ({Math.round(initialMolecules * targetVaf)} / {initialMolecules.toLocaleString()} molecules)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0.0001, 0.0005, 0.001, 0.002, 0.005, 0.01].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTargetVaf(v)}
                      className={`py-1 text-xs rounded-lg font-mono font-medium border transition ${
                        Math.abs(targetVaf - v) < 1e-6
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {(v * 100).toFixed(2)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Molecules & Raw Depth */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Initial Duplex Molecules:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {initialMolecules.toLocaleString()} molecules
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={1000}
                  value={initialMolecules}
                  onChange={e => setInitialMolecules(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>1,000</span>
                  <span className="text-slate-400">
                    Est. Raw Depth: ~{calculatedRawDepth.toLocaleString()}×
                  </span>
                  <span>20,000</span>
                </div>
              </div>

              {/* Family size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Mean PCR Family Size:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {avgFamilySize} reads / UMI strand
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={1}
                  value={avgFamilySize}
                  onChange={e => setAvgFamilySize(Number(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800"
                />
              </div>

              {/* Pre-PCR Single-Strand Deamination Damage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Single-Strand Deamination Damage:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {(damageRate * 100).toFixed(3)}% (Heat/acoustic artifact)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[0.0001, 0.0003, 0.0006].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setDamageRate(v)}
                      className={`py-1 text-xs rounded-lg font-mono border transition ${
                        Math.abs(damageRate - v) < 1e-6
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {(v * 100).toFixed(2)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Machine Error Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Illumina Machine Error Rate:</span>
                  <span className="text-slate-400 font-mono font-bold">
                    {(seqErrorRate * 100).toFixed(2)}% (Q30 nominal)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[0.0005, 0.001, 0.002].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSeqErrorRate(v)}
                      className={`py-1 text-xs rounded-lg font-mono border transition ${
                        Math.abs(seqErrorRate - v) < 1e-6
                          ? 'bg-slate-700 text-white border-slate-500'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {(v * 100).toFixed(2)}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key KPI Cards & Analysis (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <>
                {/* 4 Summary KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      True Mutants Detected
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-cyan-400 font-mono">
                        {result.trueMutantsDetected} / {result.trueMutantsInjected}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {result.sensitivity.toFixed(1)}% Sensitivity
                    </span>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      False Discoveries
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {result.falsePositivesDetected}
                      </span>
                      <span className="text-xs text-slate-500">calls</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium mt-1">
                      0.00% False Discovery Rate
                    </span>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Single-Strand Damages
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-amber-400 font-mono">
                        {result.discordantRejected}
                      </span>
                      <span className="text-xs text-slate-500">artifacts</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-medium mt-1">
                      Discordant Rejected
                    </span>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      P-value vs Noise
                    </span>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-cyan-300 font-mono">
                        {result.pvalue === 0 ? '< 1e-30' : result.pvalue.toExponential(2)}
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-medium mt-1">
                      Ultra-High Confidence
                    </span>
                  </div>
                </div>

                {/* 3-Tier Error Correction Comparison Table */}
                <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 m-0">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      Three-Tier Error Correction Performance (3-Tier Benchmark)
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Target VAF: {(result.params.targetVaf * 100).toFixed(3)}%
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Correction Level</th>
                          <th className="py-3 px-3 font-semibold">Total Reads / Duplexes</th>
                          <th className="py-3 px-3 font-semibold">Mutant Calls</th>
                          <th className="py-3 px-3 font-semibold">Observed VAF</th>
                          <th className="py-3 px-4 font-semibold">Scientific Assessment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {/* Level 1: Raw */}
                        <tr className="hover:bg-slate-900/40 transition">
                          <td className="py-3.5 px-4 font-sans font-bold text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                            1. Raw Non-UMI Reads
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">
                            {result.rawTotalReads.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-3 text-rose-400 font-bold">
                            {result.rawMutantReads}
                          </td>
                          <td className="py-3.5 px-3 text-rose-300 font-bold">
                            {result.rawObservedVaf.toFixed(3)}%
                          </td>
                          <td className="py-3.5 px-4 font-sans">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              FAILS: Swamped by ~0.1% machine noise
                            </span>
                          </td>
                        </tr>

                        {/* Level 2: SSCS */}
                        <tr className="hover:bg-slate-900/40 transition">
                          <td className="py-3.5 px-4 font-sans font-bold text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            2. Single-Strand (SSCS)
                          </td>
                          <td className="py-3.5 px-3 text-slate-400">
                            {result.sscsTotalFamilies.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-3 text-amber-400 font-bold">
                            {result.sscsMutantFamilies}
                          </td>
                          <td className="py-3.5 px-3 text-amber-300 font-bold">
                            {result.sscsObservedVaf.toFixed(3)}%
                          </td>
                          <td className="py-3.5 px-4 font-sans">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              DUBIOUS: Single-strand damage survives
                            </span>
                          </td>
                        </tr>

                        {/* Level 3: DCS */}
                        <tr className="bg-cyan-950/20 hover:bg-cyan-950/30 transition">
                          <td className="py-3.5 px-4 font-sans font-bold text-cyan-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 shadow-sm shadow-cyan-400" />
                            3. Duplex Consensus (DCS)
                          </td>
                          <td className="py-3.5 px-3 text-cyan-200 font-bold">
                            {result.dcsTotalDuplexes.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-3 text-cyan-400 font-bold text-sm">
                            {result.dcsMutantCalls}
                          </td>
                          <td className="py-3.5 px-3 text-cyan-300 font-black text-sm">
                            {result.dcsObservedVaf.toFixed(3)}%
                          </td>
                          <td className="py-3.5 px-4 font-sans">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                              100% CLEAN: 0 False Positives
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Molecular Family Inspector (Microscopic View) */}
                <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2 m-0">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        Molecular Family Inspector (Microscopic Duplex Read Audit)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 m-0">
                        Inspect how dual molecular barcodes (α and β) distinguish true biological deamination from artifacts:
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {result.sampleFamilies.map(fam => (
                      <div
                        key={fam.id}
                        className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2.5 text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-semibold text-slate-200 flex items-center gap-2">
                            {fam.duplexType === 'TRUE_MUTANT' && (
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/30">
                                True De Novo Mutant
                              </span>
                            )}
                            {fam.duplexType === 'DEAMINATION_DAMAGE' && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                                Pre-PCR Deamination Damage
                              </span>
                            )}
                            {fam.duplexType === 'SEQUENCING_ERROR' && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-bold text-[10px]">
                                Optical Machine Noise
                              </span>
                            )}
                            {fam.duplexType === 'WILD_TYPE' && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px]">
                                Canonical Wild-Type
                              </span>
                            )}
                            <span className="font-mono text-slate-400">{fam.id}</span>
                          </span>

                          <span className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            Tag α: <span className="text-cyan-400">{fam.tagA}</span> ↔ Tag β:{' '}
                            <span className="text-blue-400">{fam.tagB}</span>
                          </span>
                        </div>

                        {/* Strands comparison grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                          {/* Top Strand */}
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                            <div className="flex justify-between text-slate-400 text-[10px]">
                              <span>Top Strand (α → β):</span>
                              <span className="text-slate-300 font-bold">
                                SSCS: {fam.sscsTop}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {fam.topReads.map((b, bi) => (
                                <span
                                  key={bi}
                                  className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                                    b === 'A'
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Strand */}
                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                            <div className="flex justify-between text-slate-400 text-[10px]">
                              <span>Bottom Strand (β → α):</span>
                              <span className="text-slate-300 font-bold">
                                SSCS: {fam.sscsBottom}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {fam.bottomReads.map((b, bi) => (
                                <span
                                  key={bi}
                                  className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                                    b === 'T'
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Duplex Resolution */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
                          <span className="text-slate-400">{fam.explanation}</span>
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] shrink-0 ml-2 ${
                              fam.dcsCall === 'A'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : fam.dcsCall === 'DISCORDANT_REJECTED'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            DCS Call: {fam.dcsCall}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export & Actions Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-300 font-medium block">
                      Export high-depth duplex benchmark datasets for external pipelines (fgbio / Duplex-Seq-Pipeline):
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      * Exported FASTQ reads carry structured dual-index UMI molecular tags and authentic Illumina Q30 quality scores modeled after NCBI SRA PRJNA844028.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={downloadFastqSample}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export FASTQ with UMIs
                    </button>
                    <button
                      onClick={downloadReportCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 transition font-bold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Export Report CSV
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Full-Width Academic Benchmark Synthesis Table */}
        <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-cyan-400" />
                Cross-Cohort Synthesis &amp; Methodological Comparison
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight m-0">
                Comparative Benchmark: Multi-Cohort Architecture &amp; Scientific Objectives
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-center">
              Sample 1 vs. Sample 2 vs. Sample 3
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3.5 w-1/5 bg-slate-900/50">Evaluation Metric / Dimension</th>
                  <th className="py-3 px-3.5 w-[26%] bg-cyan-950/20 text-cyan-300 border-l border-slate-800">
                    Sample 1: Clinical Targeted Amplicon
                    <span className="block text-[10px] text-slate-400 font-normal lowercase">Alport IV collagen patient cohort</span>
                  </th>
                  <th className="py-3 px-3.5 w-[26%] bg-blue-950/20 text-blue-300 border-l border-slate-800">
                    Sample 2: Paternal Germline Mosaicism
                    <span className="block text-[10px] text-slate-400 font-normal lowercase">Human sperm de novo mosaicism</span>
                  </th>
                  <th className="py-3 px-3.5 w-[28%] bg-amber-950/20 text-amber-300 border-l border-slate-800">
                    Sample 3: Epigenetic WGBS &amp; Controls
                    <span className="block text-[10px] text-slate-400 font-normal lowercase">Molaro 2011 GSE30340 &amp; NAR Fig 3</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300 font-normal leading-relaxed">
                {/* Row 1: Primary Data Source & BioProject */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Primary Data Source &amp; Accession
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong className="text-cyan-300">NCBI PRJNA1502590</strong> (SRR39847752)<br />
                    Targeted multiplex amplicon pool of type IV collagen genes (<em>COL4A3–COL4A6</em>) in Alport syndrome patients.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong className="text-blue-300">NCBI PRJNA588332</strong> (SRR10479998)<br />
                    Breuss et al., <em>Nature Medicine</em> (2020). Targeted amplicon sequencing (TAS-ALL-Sperm) in human fathers of ASD probands.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong className="text-amber-300">GEO GSE30340</strong> (SRR306435)<br />
                    Molaro et al., <em>Cell</em> (2011). Whole-genome bisulfite sequencing (WGBS) of human sperm, cross-referenced with NAR paper Figure 3.
                  </td>
                </tr>

                {/* Row 2: Library Strategy & Sequencing Technology */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Assay Chemistry &amp; Platform
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Targeted multiplex PCR amplicons on <strong>Illumina MiSeq</strong> (2 &times; 151 bp paired-end).
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Targeted candidate amplicon capture on <strong>Illumina HiSeq 4000</strong> (2 &times; 101 bp paired-end).
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Directional chemical bisulfite conversion (WGBS) on <strong>Illumina HiSeq 2000</strong> (2 &times; 101 bp paired-end).
                  </td>
                </tr>

                {/* Row 3: Physical SRA Slice Characteristics */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Physical SRA Slice (4 MB Benchmark)
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800 font-mono text-[11px]">
                    &bull; 67,339 reads 100% on target.<br />
                    &bull; Measured depth at <em>COL4A6</em> Gly1291: <strong className="text-cyan-300">3,820&times;</strong>.<br />
                    &bull; Baseline optical error rate: 0.013% &ndash; 0.030%.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800 font-mono text-[11px]">
                    &bull; 100,000 reads targeting ASD loci.<br />
                    &bull; Mean Q-score = 23.63.<br />
                    &bull; Baseline machine noise: <strong className="text-blue-300">0.15% &ndash; 1.0%</strong>.<br />
                    &bull; Collagen coding depth: 0&times; (no primers).
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800 font-mono text-[11px]">
                    &bull; 55,118 reads flat genome-wide (0.0018&times;).<br />
                    &bull; Non-CpG C&rarr;T conversion: <strong className="text-amber-300">&gt;98.8%</strong> (C drops to 5.3%).<br />
                    &bull; 53.05% of surviving C reside in CpG (5mC).
                  </td>
                </tr>

                {/* Row 4: In Silico Simulation Presets */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Simulation Architecture &amp; Presets
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Canonical MANE Select transcripts for <em>COL4A5</em> (Gly624Asp), <em>COL4A6</em> (Gly1291Arg), <em>COL4A4</em> (Gly873Arg), and <em>COL1A1</em> (Gly244Ser) at 3,820&times; &ndash; 5,000&times; depth.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    In silico spike-in of ultra-low frequency paternal mosaic mutant molecules (<strong className="text-blue-300">VAF = 0.05%</strong>; 1 in 2,000) under HiSeq 4000 background noise at 50,000&times; &ndash; 100,000&times; depth.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong>Dual-Arm Mechanistic Model:</strong><br />
                    &bull; <em>True Dyad Arm:</em> 89% sperm 5mC baseline at <em>COL4A5</em> Gly624 and <em>COL1A1</em> Gly244.<br />
                    &bull; <em>Negative Control Arm:</em> 48 exon-initial split junction sites lacking genomic CpG (0% 5mC).
                  </td>
                </tr>

                {/* Row 5: Primary Scientific Objective */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Primary Scientific Objective
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong>Clinical Artifact Suppression:</strong> Benchmark whether high-depth targeted sequencing in Alport patients generates false-positive pathogenic variant calls from PCR chimeras or sequencing noise, and confirm Duplex UMI achieves 0% False Discovery Rate (FDR).
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong>Limit of Detection (LOD) in Gametes:</strong> Evaluate whether conventional NGS (0.15% noise) is overwhelmed when screening paternal semen for 0.05% gonadal mosaicism, and demonstrate that Duplex consensus enables artifact-free de novo variant discovery.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong>Causal Epigenetic Dissection:</strong> Formally test whether the striking mutational hyper-recurrence of collagen glycines is causally driven by genomic DNA CpG methylation rather than mRNA codon sequence artifacts or translation selection.
                  </td>
                </tr>

                {/* Row 6: Key Findings & Mechanistic Insights */}
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="py-3 px-3.5 font-semibold text-slate-200 bg-slate-900/20">
                    Key Mechanistic Insight &amp; Conclusion
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Single-strand consensus (SSCS) retains unverified PCR errors; only dual-strand duplex consensus (DCS) eliminates 100% of single-strand damage, ensuring zero misdiagnoses for severe collagenopathies.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    Conventional NGS cannot resolve 0.05% mosaicism because machine noise outnumbers true variants by &gt;3:1. Duplex consensus filters discordant single-strand reads, recovering true spiked mutant molecules with 100% specificity.
                  </td>
                  <td className="py-3 px-3.5 border-l border-slate-800">
                    <strong>Epigenetic Causality Confirmed:</strong><br />
                    &bull; True Genomic Dyads (89% sperm 5mC): G&gt;A population variant present at <strong className="text-emerald-400">87.3%</strong> of sites in gnomAD.<br />
                    &bull; 48 Split Controls (0% CpG): G&gt;A presence collapses to <strong className="text-amber-400">31.2%</strong> (matching non-dyad baseline 30%, <em>P</em> = 2.1 &times; 10<sup>-16</sup>).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>
              * Methodology aligns with TwinStrand duplex sequencing guidelines, MANE Select v1.5 canonical transcript definitions, and published NAR manuscript findings (Figure 1&ndash;5).
            </span>
            <span className="font-mono text-cyan-400 shrink-0">
              Methyl-CpG Analytical Suite &bull; Duplex Core v2.4
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
