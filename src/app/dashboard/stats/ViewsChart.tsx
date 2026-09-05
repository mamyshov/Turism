type Point = { date: string; count: number };

// Plain bars with native title tooltips — no client JS or chart library
// needed for a simple 30-day sparkline.
export function ViewsChart({ series }: { series: Point[] }) {
  const max = Math.max(1, ...series.map((p) => p.count));

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-end gap-[2px] h-32">
        {series.map((p) => (
          <div
            key={p.date}
            title={`${formatDate(p.date)}: ${p.count} просм.`}
            className="flex-1 rounded-t bg-brand-500/80 hover:bg-brand-600 transition-colors"
            style={{ height: `${Math.max(2, (p.count / max) * 100)}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{formatDate(series[0]?.date)}</span>
        <span>{formatDate(series[series.length - 1]?.date)}</span>
      </div>
    </div>
  );
}

function formatDate(date: string | undefined): string {
  if (!date) return "";
  const [, month, day] = date.split("-");
  return `${day}.${month}`;
}
