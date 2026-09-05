import { cookies } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE, Locale } from "./locales";

/**
 * Reads the visitor's chosen locale from a cookie (set by
 * `LanguageSwitcher`). No URL prefixing — this is a deliberately lighter
 * alternative to a full next-intl routing setup for the MVP (see README).
 * Only callable from Server Components/Route Handlers — kept in its own
 * module so client components can still import the plain constants from
 * ./locales without pulling in next/headers.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return (LOCALES as string[]).includes(value ?? "") ? (value as Locale) : DEFAULT_LOCALE;
}
