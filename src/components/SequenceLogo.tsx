import React from 'react';

interface SequenceLogoProps {
  data: {
    position: string;
    label: string;
    freq: { A: number; C: number; G: number; T: number };
  }[];
  title?: string;
  subtitle?: string;
}

const BASE_COLORS: Record<string, string> = {
  A: '#16a34a', // green
  C: '#2563eb', // blue
  G: '#d97706', // amber/orange
  T: '#dc2626', // red
};

export const SequenceLogo: React.FC<SequenceLogoProps> = ({
  data,
  title = 'Nucleotide Frequency Across Collagenous Gly-Xaa-Yaa Triplets',
  subtitle = 'Probability units (stack height = 1.0). Highlights Yaa 3rd-base Cytosine depletion and Gly 1st-base Guanine invariance.'
}) => {
  const stackWidth = 50;
  const logoHeight = 140;
  const paddingLeft = 45;
  const paddingTop = 25;
  const paddingBottom = 40;
  const totalWidth = paddingLeft + data.length * stackWidth + 20;
  const totalHeight = paddingTop + logoHeight + paddingBottom;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="mb-4">
        <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <span>{title}</span>
          <span className="text-xs font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Probability Scale (0.0 - 1.0)
          </span>
        </h4>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="w-full max-w-full select-none"
          style={{ minWidth: '550px' }}
        >
          {/* Y Axis line and ticks */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + logoHeight}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          {[0, 0.25, 0.5, 0.75, 1.0].map(val => {
            const y = paddingTop + logoHeight * (1 - val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft - 4}
                  y1={y}
                  x2={paddingLeft}
                  y2={y}
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748b"
                  fontFamily="monospace"
                >
                  {val.toFixed(2)}
                </text>
                {/* Dotted horizontal grid line */}
                {val > 0 && val < 1.0 && (
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={totalWidth - 10}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}

          {/* Stacks for each position */}
          {data.map((item, idx) => {
            const x = paddingLeft + idx * stackWidth;
            const bases = [
              { base: 'A', f: item.freq.A },
              { base: 'C', f: item.freq.C },
              { base: 'G', f: item.freq.G },
              { base: 'T', f: item.freq.T },
            ].sort((a, b) => a.f - b.f); // sort ascending so largest is on top

            let currentY = paddingTop + logoHeight;
            const isYaaC = item.position === 'Yaa-3';
            const isGlyG = item.position === 'Gly-1';

            return (
              <g key={item.position}>
                {/* Highlight box for CpG Dyad boundary (Yaa-3 and Gly-1) */}
                {(isYaaC || isGlyG) && (
                  <rect
                    x={x + 3}
                    y={paddingTop - 6}
                    width={stackWidth - 6}
                    height={logoHeight + 10}
                    fill={isYaaC ? '#eff6ff' : '#fffbeb'}
                    stroke={isYaaC ? '#93c5fd' : '#fcd34d'}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    rx="4"
                  />
                )}

                {bases.map(({ base, f }) => {
                  const letterH = f * logoHeight;
                  if (letterH < 0.5) return null;
                  const y = currentY - letterH;
                  currentY = y;

                  return (
                    <g key={base}>
                      <text
                        x={x + stackWidth / 2}
                        y={y + letterH * 0.9}
                        textAnchor="middle"
                        fontSize={Math.max(10, letterH * 1.15)}
                        fontWeight="bold"
                        fill={BASE_COLORS[base]}
                        fontFamily="system-ui, sans-serif"
                        transform={`scale(1, ${letterH / (letterH || 1)})`}
                        style={{ transformOrigin: `${x + stackWidth / 2}px ${y + letterH}px` }}
                      >
                        {base}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis ticks and labels */}
                <line
                  x1={x + stackWidth / 2}
                  y1={paddingTop + logoHeight}
                  x2={x + stackWidth / 2}
                  y2={paddingTop + logoHeight + 4}
                  stroke="#94a3b8"
                />
                <text
                  x={x + stackWidth / 2}
                  y={paddingTop + logoHeight + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isYaaC || isGlyG ? 'bold' : 'normal'}
                  fill={isYaaC ? '#1d4ed8' : (isGlyG ? '#b45309' : '#475569')}
                >
                  {item.label}
                </text>
                <text
                  x={x + stackWidth / 2}
                  y={paddingTop + logoHeight + 28}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94a3b8"
                >
                  {isYaaC ? 'CpG-1' : (isGlyG ? 'CpG-2' : `pos ${(idx % 3) + 1}`)}
                </text>
              </g>
            );
          })}

          {/* Group brackets for Yaa, Gly, Xaa */}
          {[
            { label: 'Preceding Yaa Codon', start: 0, count: 3, color: '#3b82f6' },
            { label: 'Central Glycine (GGN)', start: 3, count: 3, color: '#d97706' },
            { label: 'Downstream Xaa Codon', start: 6, count: 3, color: '#64748b' },
          ].map((grp, i) => {
            const x1 = paddingLeft + grp.start * stackWidth + 4;
            const x2 = paddingLeft + (grp.start + grp.count) * stackWidth - 4;
            const mid = (x1 + x2) / 2;
            return (
              <g key={i}>
                <line x1={x1} y1={paddingTop - 12} x2={x2} y2={paddingTop - 12} stroke={grp.color} strokeWidth="1.5" />
                <line x1={x1} y1={paddingTop - 12} x2={x1} y2={paddingTop - 8} stroke={grp.color} strokeWidth="1.5" />
                <line x1={x2} y1={paddingTop - 12} x2={x2} y2={paddingTop - 8} stroke={grp.color} strokeWidth="1.5" />
                <text
                  x={mid}
                  y={paddingTop - 15}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={grp.color}
                >
                  {grp.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-medium text-slate-700">Nucleotides:</span>
          {Object.entries(BASE_COLORS).map(([base, color]) => (
            <div key={base} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
              <span className="font-semibold" style={{ color }}>{base}</span>
            </div>
          ))}
        </div>
        <div className="text-slate-500 text-xs">
          Notice <strong className="text-blue-600">Yaa-3 Cytosine</strong> is strongly suppressed (~3%), while <strong className="text-amber-600">Gly-1 Guanine</strong> is invariant (100%).
        </div>
      </div>
    </div>
  );
};
