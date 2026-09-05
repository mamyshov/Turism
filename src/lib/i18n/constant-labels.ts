import { Locale } from "./locales";
import { REGIONS, TOUR_CATEGORIES, LANGUAGES } from "@/lib/constants";

// Localized labels for the tourist-facing filter/browse UI (catalog, home,
// company page). Dashboard/admin forms keep the Russian labels from
// lib/constants.ts — those are used by company owners and admins, out of
// scope for this MVP's i18n pass (see README).
const REGION_LABELS: Record<Locale, Record<string, string>> = {
  ru: {},
  ky: {
    "issyk-kul": "Ысык-Көл",
    osh: "Ош",
    naryn: "Нарын",
    "jalal-abad": "Жалал-Абад",
    batken: "Баткен",
    talas: "Талас",
    chuy: "Чүй",
    bishkek: "Бишкек",
  },
  en: {
    "issyk-kul": "Issyk-Kul",
    osh: "Osh",
    naryn: "Naryn",
    "jalal-abad": "Jalal-Abad",
    batken: "Batken",
    talas: "Talas",
    chuy: "Chuy",
    bishkek: "Bishkek",
  },
};

const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  ru: {},
  ky: {
    trekking: "Трекинг",
    horse: "Ат үстүндөгү турлар",
    cultural: "Маданий туризм",
    gastro: "Гастротуризм",
    adventure: "Экстрим/адвенчер",
    eco: "Эко-туризм",
    pilgrimage: "Зыярат",
    winter: "Кышкы турлар",
  },
  en: {
    trekking: "Trekking",
    horse: "Horseback tours",
    cultural: "Cultural tourism",
    gastro: "Food tourism",
    adventure: "Adventure",
    eco: "Eco-tourism",
    pilgrimage: "Pilgrimage",
    winter: "Winter tours",
  },
};

const LANGUAGE_LABELS: Record<Locale, Record<string, string>> = {
  ru: {},
  ky: { ky: "Кыргызча", ru: "Орусча", en: "Англисче", other: "Башка" },
  en: { ky: "Kyrgyz", ru: "Russian", en: "English", other: "Other" },
};

function translate(
  table: Record<Locale, Record<string, string>>,
  locale: Locale,
  key: string,
  fallback: string
): string {
  return table[locale]?.[key] ?? fallback;
}

export function localizeRegion(key: string, locale: Locale): string {
  const fallback = REGIONS.find((r) => r.key === key)?.label ?? key;
  return translate(REGION_LABELS, locale, key, fallback);
}

export function localizeCategory(key: string, locale: Locale): string {
  const fallback = TOUR_CATEGORIES.find((c) => c.key === key)?.label ?? key;
  return translate(CATEGORY_LABELS, locale, key, fallback);
}

export function localizeLanguage(key: string, locale: Locale): string {
  const fallback = LANGUAGES.find((l) => l.key === key)?.label ?? key;
  return translate(LANGUAGE_LABELS, locale, key, fallback);
}

/** Returns REGIONS/TOUR_CATEGORIES/LANGUAGES-shaped lists with labels translated for `locale`. */
export function localizedRegions(locale: Locale) {
  return REGIONS.map((r) => ({ key: r.key, label: localizeRegion(r.key, locale) }));
}
export function localizedCategories(locale: Locale) {
  return TOUR_CATEGORIES.map((c) => ({ key: c.key, label: localizeCategory(c.key, locale) }));
}
export function localizedLanguages(locale: Locale) {
  return LANGUAGES.map((l) => ({ key: l.key, label: localizeLanguage(l.key, locale) }));
}
