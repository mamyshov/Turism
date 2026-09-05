// SQLite has no native string[] column, so multi-select fields (languages,
// tour categories) are persisted as JSON-encoded strings. These helpers keep
// the (de)serialization in one place so a future Postgres migration to a
// real String[] column only touches this file.

export function toJsonArray(values: string[]): string {
  return JSON.stringify(values ?? []);
}

export function fromJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}
