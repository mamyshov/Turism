"use client";

export type TabItem = { key: string; label: string; icon?: React.ReactNode; count?: number };

export function Tabs({
  items,
  active,
  onChange,
  className,
}: {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`no-scrollbar flex gap-1 overflow-x-auto border-b border-line ${className ?? ""}`}
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.key)}
            className={`focus-ring flex flex-none items-center gap-1.5 whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-ink-secondary hover:text-ink"
            }`}
          >
            {item.icon}
            {item.label}
            {typeof item.count === "number" && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${
                  isActive ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-ink-muted"
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
