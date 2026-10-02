import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="flex items-center gap-2 text-ink-secondary">
        <Icon className="size-4" aria-hidden />
        <p className="text-sm">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
