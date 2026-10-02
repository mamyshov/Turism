import { StarRating } from "@/components/StarRating";
import type { Locale } from "@/lib/i18n/locales";

const BCP47: Record<Locale, string> = { ru: "ru-RU", ky: "ky-KG", en: "en-US" };

export function ReviewCard({
  authorName,
  rating,
  text,
  createdAt,
  locale,
}: {
  authorName: string;
  rating: number;
  text: string | null;
  createdAt: Date | string;
  locale: Locale;
}) {
  const date = new Date(createdAt).toLocaleDateString(BCP47[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="rounded-card border border-line bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <p className="text-balance-wrap font-medium text-ink">{authorName}</p>
        <StarRating value={rating} size="sm" />
      </div>
      <p className="mt-1 text-xs text-ink-muted">{date}</p>
      {text && <p className="mt-2 text-sm text-ink-secondary">{text}</p>}
    </div>
  );
}
