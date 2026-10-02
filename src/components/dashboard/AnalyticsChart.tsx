"use client";

import { useMemo, useState } from "react";

type Point = { date: string; count: number };
type PeriodKey = 7 | 30 | 90;

function formatDate(date: string | undefined): string {
  if (!date) return "";
  const [, month, day] = date.split("-");
  return `${day}.${month}`;
}

export function AnalyticsChart({
  series,
  viewsSuffix,
  periodLabels,
}: {
  /** Ascending by date, up to 90 trailing days. */
  series: Point[];
  viewsSuffix: string;
  periodLabels: Record<PeriodKey, string>;
}) {
  const [period, setPeriod] = useState<PeriodKey>(30);
  const slice = useMemo(() => series.slice(-period), [series, period]);
  const total = useMemo(() => slice.reduce((sum, p) => sum + p.count, 0), [slice]);
  const max = Math.max(1, ...slice.map((p) => p.count));

  const width = 600;
  const height = 140;
  const points = slice.map((p, i) => {
    const x = slice.length > 1 ? (i / (slice.length - 1)) * width : width / 2;
    const y = height - (p.count / max) * (height - 12) - 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = points.length > 0 ? `M${points.join(" L")}` : "";
  const areaPath = points.length > 0 ? `${linePath} L${width},${height} L0,${height} Z` : "";

  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-secondary">
          {total.toLocaleString()} <span className="text-ink-muted">{viewsSuffix}</span>
        </p>
        <div className="flex gap-1 rounded-md bg-gray-100 p-1 text-xs font-medium">
          {([7, 30, 90] as PeriodKey[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              aria-pressed={period === p}
              className={`focus-ring rounded px-3 py-2 transition-colors ${
                period === p ? "bg-white text-brand-700 shadow-sm" : "text-ink-secondary hover:text-ink"
              }`}
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {slice.every((p) => p.count === 0) ? (
        <div className="flex h-32 items-center justify-center text-sm text-ink-muted">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full" preserveAspectRatio="none" aria-hidden>
            <line x1="0" y1={height - 1} x2={width} y2={height - 1} stroke="#E5E7EB" strokeWidth="1" />
          </svg>
        </div>
      ) : (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16854F" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#16854F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#chart-fill)" />
          <path d={linePath} fill="none" stroke="#16854F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      )}

      <div className="mt-2 flex justify-between text-xs text-ink-muted">
        <span>{formatDate(slice[0]?.date)}</span>
        <span>{formatDate(slice[slice.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
