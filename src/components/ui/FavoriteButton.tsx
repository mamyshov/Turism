"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "kth_favorites";

function readFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function writeFavorites(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable (private mode, etc.) — favorite stays visual-only for this view
  }
}

// Client-only, device-local "favorite" toggle — no account/DB involved, so it
// never conflicts with the backend's business logic. Purely a UI affordance
// requested by the design spec's Tour Card layout.
export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(readFavorites().has(id));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const favorites = readFavorites();
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    writeFavorites(favorites);
    setActive(favorites.has(id));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
      className={`focus-ring inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-secondary shadow-sm transition-colors hover:text-danger active:scale-95 ${className ?? ""}`}
    >
      <Heart className={`size-4 transition-colors ${active ? "fill-danger text-danger" : "fill-transparent"}`} />
    </button>
  );
}
