export type Locale = "ru" | "ky" | "en";
export const LOCALES: Locale[] = ["ru", "ky", "en"];
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_LABELS: Record<Locale, string> = { ru: "Рус", ky: "Кырг", en: "Eng" };
export const LOCALE_COOKIE = "locale";
