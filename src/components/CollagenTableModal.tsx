import React, { useState } from 'react';
import { X, Search, Dna, ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import { COLLAGEN_TABLE } from '../data/collagenTable';
import type { CollagenGeneInfo } from '../types';

interface CollagenTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGene: (gene: CollagenGeneInfo) => void;
}

export const CollagenTableModal: React.FC<CollagenTableModalProps> = ({
  isOpen,
  onClose,
  onSelectGene,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredGenes = COLLAGEN_TABLE.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.gene.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term) ||
      item.disease.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term) ||
      (item.hgncId && item.hgncId.toLowerCase().includes(term)) ||
      (item.ncbiGeneId && item.ncbiGeneId.includes(term)) ||
      (item.ensemblGeneId && item.ensemblGeneId.toLowerCase().includes(term)) ||
      (item.aliasSymbols && item.aliasSymbols.toLowerCase().includes(term)) ||
      (item.previousSymbols && item.previousSymbols.toLowerCase().includes(term)) ||
      (item.chromosomeBand && item.chromosomeBand.toLowerCase().includes(term)) ||
      item.omim.toLowerCase().includes(term);

    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const uniqueTypes = ['ALL', ...Array.from(new Set(COLLAGEN_TABLE.map(g => g.type)))];

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200 cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                28 Types of Human Collagen Genes &amp; Loci (Collagen Table)
              </h3>
              <p className="text-xs text-slate-500">
                Synchronized with HGNC Collagens (Group 490): 44 protein-coding genes + 2 pseudogenes across 28 distinct collagen types. Reference MANE Select Transcripts &amp; Clinical Phenotypes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-88">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gene, alias, HGNC, disease (e.g. COL6A4, DVWA, Alport, OI)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-500 whitespace-nowrap">Filter Type:</span>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'ALL' ? `All Collagens (28 Types / ${COLLAGEN_TABLE.length} Entries)` : t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Gene / Symbol</th>
                <th className="py-2.5 px-3">Chr / Band</th>
                <th className="py-2.5 px-3">Associated Collagen Disorder</th>
                <th className="py-2.5 px-3">Inheritance</th>
                <th className="py-2.5 px-3">Transcript / RefSeq</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredGenes.map(item => (
                <tr key={item.gene} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-blue-700 whitespace-nowrap align-top">
                    {item.type}
                  </td>
                  <td className="py-2.5 px-3 align-top">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900">{item.gene}</span>
                      {item.locusType === 'pseudogene' ? (
                        <span className="inline-flex items-center text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.2 rounded-full">
                          Pseudogene
                        </span>
                      ) : item.hasPreloadedCds ? (
                        <span className="inline-flex items-center text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.2 rounded-full">
                          <CheckCircle className="w-3 h-3 mr-0.5 inline" /> CDS Ready
                        </span>
                      ) : null}
                    </div>
                    {item.aliasSymbols && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Alias: <span className="text-slate-600">{item.aliasSymbols}</span>
                      </div>
                    )}
                    {item.hgncId && (
                      <div className="text-[10px] text-slate-400 font-mono">
                        {item.hgncId}
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 text-xs whitespace-nowrap align-top">
                    <div className="font-medium text-slate-800">chr{item.chr}</div>
                    {item.chromosomeBand && (
                      <div className="text-[11px] text-slate-400 font-mono">{item.chromosomeBand}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 text-xs max-w-xs align-top">
                    <div>{item.disease}</div>
                    {item.omim && item.omim !== '-' && (
                      <div className="mt-1">
                        <a
                          href={`https://omim.org/entry/${item.omim.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          OMIM: {item.omim}
                          <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-xs whitespace-nowrap align-top">
                    <span className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
                      item.inheritance === 'Pseudogene'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.inheritance}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-600 font-mono whitespace-nowrap align-top">
                    <div>{item.refseqId || item.transcriptId || '-'}</div>
                    {item.transcriptId && item.refseqId && (
                      <div className="text-[10px] text-slate-400">{item.transcriptId}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap align-top">
                    <button
                      onClick={() => {
                        onSelectGene(item);
                        onClose();
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Dna className="w-3.5 h-3.5" />
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredGenes.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No collagen genes or pseudogenes match the search criteria.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredGenes.length} of {COLLAGEN_TABLE.length} collagen entries (44 protein-coding + 2 pseudogenes)</span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.genenames.org/data/genegroup/#!/group/490"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              HGNC Collagens Group 490 <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
