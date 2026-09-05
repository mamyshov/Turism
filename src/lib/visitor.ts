import { cookies } from "next/headers";

const VISITOR_COOKIE = "visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Read-only lookup — safe to call from a page/layout render. Returns null
 * if the visitor has never liked anything yet (no cookie set).
 */
export function getVisitorId(): string | null {
  return cookies().get(VISITOR_COOKIE)?.value ?? null;
}

/**
 * Returns a stable anonymous id for the current browser, creating one if
 * needed. This is NOT a user account — just enough to stop a visitor from
 * spamming the like button on a reel, without building tourist auth.
 *
 * Only callable from a Route Handler (where `cookies().set` is allowed),
 * not from a page/layout render.
 */
export function getOrCreateVisitorId(): string {
  const store = cookies();
  const existing = store.get(VISITOR_COOKIE)?.value;
  if (existing) return existing;

  const id = crypto.randomUUID();
  store.set(VISITOR_COOKIE, id, {
    maxAge: ONE_YEAR_SECONDS,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return id;
}
