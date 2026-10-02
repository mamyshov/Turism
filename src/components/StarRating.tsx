import { Star } from "lucide-react";

export function StarRating({ value, size = "md" }: { value: number; size?: "sm" | "md" | "lg" }) {
  const iconSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Рейтинг ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${iconSize} ${i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}
