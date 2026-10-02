type Tone = "brand" | "gray" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  gray: "bg-gray-100 text-ink-secondary",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700",
};

export function Badge({
  children,
  tone = "gray",
  icon,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]} ${className ?? ""}`}
    >
      {icon}
      {children}
    </span>
  );
}
