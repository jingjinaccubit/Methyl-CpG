import React from 'react';
import type { StatisticalMetric } from '../types';

export interface ForestPlotItem {
  id: string;
  name: string;
  category: string;
  metric: StatisticalMetric;
  interpretation: string;
  direction: 'depleted' | 'enriched';
}

interface ForestPlotProps {
  items: ForestPlotItem[];
  title?: string;
}

export const ForestPlot: React.FC<ForestPlotProps> = ({
  items,
  title = 'Odds Ratios & 95% Confidence Intervals (Forest Plot)'
}) => {
  // Use log scale for Odds Ratio from 0.03 to 100
  const minLog = Math.log(0.04);
  const maxLog = Math.log(80);
  const plotWidth = 340;
  const rowHeight = 44;
  const headerHeight = 35;
  const totalHeight = headerHeight + items.length * rowHeight + 40;

  const getX = (val: number) => {
    const clamped = Math.max(0.04, Math.min(80, val));
    const logVal = Math.log(clamped);
    return ((logVal - minLog) / (maxLog - minLog)) * plotWidth;
  };

  const xNull = getX(1.0); // Neutral line at OR = 1.0

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-base font-semibold text-slate-800">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Two-sided Fisher Exact Test • Log scale • Reference line at OR = 1.0 (No Effect)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="text-slate-600">Depleted (&lt; 1.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span className="text-slate-600">Enriched / Hotspot (&gt; 1.0)</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: '700px' }}>
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200 uppercase tracking-wider">
            <div className="col-span-4">Hypothesis / Comparison</div>
            <div className="col-span-5 text-center">Odds Ratio & 95% CI (Log Scale)</div>
            <div className="col-span-3 text-right">OR (95% CI) &amp; P-Value</div>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item, idx) => {
              const xPoint = getX(item.metric.or);
              const xLower = getX(item.metric.ciLower);
              const xUpper = getX(item.metric.ciUpper);
              const isEnriched = item.metric.or > 1.0;
              const barColor = isEnriched ? '#d97706' : '#2563eb';

              return (
                <div key={item.id} className="grid grid-cols-12 gap-2 py-3 items-center hover:bg-slate-50 transition-colors">
                  {/* Title and Category */}
                  <div className="col-span-4 pr-2">
                    <div className="font-medium text-slate-800 text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.interpretation}</div>
                  </div>

                  {/* SVG Plot Column */}
                  <div className="col-span-5 flex justify-center">
                    <svg width={plotWidth + 40} height="28" className="overflow-visible">
                      {/* Neutral dashed line at OR = 1.0 */}
                      <line
                        x1={xNull + 20}
                        y1="0"
                        x2={xNull + 20}
                        y2="28"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      {/* 95% CI horizontal line */}
                      <line
                        x1={xLower + 20}
                        y1="14"
                        x2={xUpper + 20}
                        y2="14"
                        stroke={barColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      {/* Left tick */}
                      <line
                        x1={xLower + 20}
                        y1="9"
                        x2={xLower + 20}
                        y2="19"
                        stroke={barColor}
                        strokeWidth="1.5"
                      />

                      {/* Right tick */}
                      <line
                        x1={xUpper + 20}
                        y1="9"
                        x2={xUpper + 20}
                        y2="19"
                        stroke={barColor}
                        strokeWidth="1.5"
                      />

                      {/* Center Point Estimate */}
                      <rect
                        x={xPoint + 20 - 4}
                        y="10"
                        width="8"
                        height="8"
                        fill={barColor}
                        transform={`rotate(45, ${xPoint + 20}, 14)`}
                      />
                    </svg>
                  </div>

                  {/* Numbers Column */}
                  <div className="col-span-3 text-right">
                    <div className="font-mono text-sm font-semibold text-slate-800">
                      {item.metric.or.toFixed(2)}
                      <span className="text-xs font-normal text-slate-500 ml-1">
                        [{item.metric.ciLower.toFixed(2)} - {item.metric.ciUpper.toFixed(2)}]
                      </span>
                    </div>
                    <div className="text-xs font-medium text-emerald-700">
                      {item.metric.formattedP}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scale Axis underneath */}
          <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-200">
            <div className="col-span-4"></div>
            <div className="col-span-5 flex justify-center">
              <svg width={plotWidth + 40} height="20" className="overflow-visible">
                {[0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 50.0].map(tick => {
                  const x = getX(tick) + 20;
                  return (
                    <g key={tick}>
                      <line x1={x} y1="0" x2={x} y2="4" stroke="#94a3b8" />
                      <text x={x} y="15" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="monospace">
                        {tick}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="col-span-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
