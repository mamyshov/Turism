"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { FAVORITES_COOKIE, MAX_FAVORITES, parseFavorites } from "@/lib/favorites";

function readFavorites(): string[] {
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${FAVORITES_COOKIE}=`));
  const fromCookie = parseFavorites(match ? decodeURIComponent(match.split("=")[1]) : "");
  if (fromCookie.length > 0) return fromCookie;
  // one-time migration from the earlier localStorage-only version
  try {
    const legacy = JSON.parse(localStorage.getItem("kth_favorites") ?? "[]");
    if (Array.isArray(legacy) && legacy.length > 0) {
      writeFavorites(legacy);
      return legacy;
    }
  } catch {}
  return [];
}

function writeFavorites(ids: string[]) {
  document.cookie = `${FAVORITES_COOKIE}=${encodeURIComponent(ids.slice(0, MAX_FAVORITES).join(","))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

// Device-local favorite toggle — no account or DB involved.
export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActive(readFavorites().includes(id));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const list = readFavorites();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [id, ...list];
    writeFavorites(next);
    setActive(next.includes(id));
    if (pathname === "/favorites") router.refresh();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`focus-ring inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-secondary shadow-sm transition-colors hover:text-danger active:scale-95 ${className ?? ""}`}
    >
      <Heart className={`size-4 transition-colors ${active ? "fill-danger text-danger" : "fill-transparent"}`} />
    </button>
  );
}
