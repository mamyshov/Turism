// Favorites live in a plain (non-httpOnly) cookie so both the client heart
// buttons and the server-rendered /favorites page can read them without any
// account, API route or schema change.
export const FAVORITES_COOKIE = "kth_favorites";
export const MAX_FAVORITES = 50;

export function parseFavorites(raw: string | undefined | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter((s) => /^[a-z0-9]{10,40}$/i.test(s)).slice(0, MAX_FAVORITES);
}
