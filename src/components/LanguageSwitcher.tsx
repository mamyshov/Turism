"use client";

import { useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-300">/</span>}
          <button
            onClick={() => setLocale(l)}
            className={l === locale ? "font-semibold text-brand-700" : "hover:text-brand-700"}
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
