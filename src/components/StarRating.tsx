export function StarRating({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "text-sm" : "text-base";
  return (
    <span className={`${cls} text-amber-500`} aria-label={`Рейтинг ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= Math.round(value) ? "★" : "☆"}</span>
      ))}
    </span>
  );
}
