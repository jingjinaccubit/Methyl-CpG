import React from 'react';
import { X, BookOpen, ExternalLink, Dna, FileText } from 'lucide-react';

interface PaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaperModal: React.FC<PaperModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200 cursor-default"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Paper Methodology Reference
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
                <span>Journal of the American Society of Nephrology (JASN)</span>
                <span>•</span>
                <span>DOI:</span>
                <a
                  href="https://doi.org/10.1681/ASN.0000001308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline font-mono inline-flex items-center gap-0.5 font-medium"
                >
                  10.1681/ASN.0000001308
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4">
            <h4 className="font-bold text-indigo-950 text-base mb-1">
              Methyl-CpG Sites and Mutational Hotspots in Alport Syndrome
            </h4>
            <p className="text-xs text-indigo-800">
              <strong>Running Title:</strong> Methyl-CpG Hotspots in COL4A5 • <strong>Journal:</strong> JASN (Genetics / Basic Science)
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Dna className="w-4 h-4 text-blue-600" />
              1. Biological Rationale: Asymmetric Methyl-CpG Mutagenesis
            </h5>
            <p className="text-xs text-slate-600 mb-2">
              Collagen proteins are defined by repeating tripeptides <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">[Gly-Xaa-Yaa]</code>. Invariant Glycine (encoded by GGN) is essential for triple-helix packings. When the preceding Yaa codon ends with Cytosine (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">NNC</code>), a CpG dinucleotide dyad spans the codon boundary (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">NNC-GGN</code>).
            </p>
            <p className="text-xs text-slate-600">
              Cytosine methylation followed by spontaneous hydrolytic deamination raises mutability ~10-fold. On the reverse strand, a <strong className="text-rose-600 font-mono">C→T</strong> deamination appears as a <strong className="text-rose-600 font-mono">G→A</strong> transition at the first position of the Glycine codon upon forward replication, replacing Glycine with Arginine (GGA/GGG → AGA/AGG) or Serine (GGT/GGC → AGT/AGC). Arginine causes severe triple-helix disruption and accelerates median onset of kidney failure by 7 years.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              2. Core Discoveries in COL4A5 (Prototype)
            </h5>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>
                <strong>Evolutionary Purge of CpG Dyads:</strong> Only 12 of 449 (2.7%) collagenous glycines in COL4A5 are preceded by C, compared with 14.3% genome-wide (<span className="font-mono text-blue-700 font-bold">OR = 0.16, 95% CI 0.08-0.29, P &lt; 0.001</span>).
              </li>
              <li>
                <strong>Yaa Proline CCC Depletion:</strong> Proline accounts for 57% of Yaa residues. Only 8 of 254 (3.1%) use CCC, vs 17.4% elsewhere in the gene and 32% genome-wide (<span className="font-mono text-blue-700 font-bold">χ² = 151.3, P &lt; 0.001</span>).
              </li>
              <li>
                <strong>ClinVar Hotspots:</strong> 10 of the 12 CpG dyad positions have reported G→A variants in ClinVar vs 39.6% at non-CpG codons (<span className="font-mono text-amber-700 font-bold">OR = 7.6, P = 0.005</span>).
              </li>
              <li>
                <strong>Multiple-Submitter Recurrence:</strong> 100% (10/10) of CpG G→A variants were submitted by multiple independent clinical laboratories.
              </li>
              <li>
                <strong>Predicted Candidate Hotspots:</strong> Two predicted variants not yet reported in ClinVar: <span className="font-mono font-bold text-slate-900">p.Gly626Ser (c.1876G&gt;A)</span> and <span className="font-mono font-bold text-slate-900">p.Gly1170Ser (c.3508G&gt;A)</span>.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
            <h6 className="font-bold text-slate-800 mb-1">Translational Extension &amp; Methodology Calibration</h6>
            <p className="text-slate-600 mb-2 leading-relaxed">
              This software platform generalizes this analytical pipeline (T1 Depletion, T2 ClinVar Hotspots, T3 gnomAD Recurrent De Novo, T4 Odds Ratio Report) to all 44 human collagen genes encoding types I through XXVIII (e.g. COL1A1/COL1A2 in OI, COL3A1/COL5A1 in EDS, COL2A1/COL11A1 in Stickler syndrome).
            </p>
            <p className="text-slate-500 m-0 leading-relaxed border-t border-slate-200/60 pt-1.5 text-[11px]">
              <em>Calibration Note:</em> The published paper evaluated &ldquo;Alport syndrome-associated G&rarr;A variants reported in ClinVar&rdquo; in COL4A5 (10 of 12 dyad sites vs. 173 of 437 non-CpG sites, OR = 7.63 / ~7.6; authors&rsquo; June 2024 pipeline data freeze). This platform applies symmetrical Pathogenic / Likely Pathogenic (P/LP) filtering across all reported phenotypes (10 of 12 vs. 182 of 437 in the current snapshot, OR = 7.01). The minor numerical difference reflects both phenotypic categorization boundaries and ongoing ClinVar submission growth over time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <a
            href="https://doi.org/10.1681/ASN.0000001308"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 hover:underline font-mono"
          >
            <span>DOI: 10.1681/ASN.0000001308</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
