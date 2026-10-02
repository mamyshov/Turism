"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 text-sm text-ink-secondary">
      <Globe className="size-4 text-ink-muted" aria-hidden />
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-muted/50">/</span>}
          <button
            onClick={() => setLocale(l)}
            aria-current={l === locale}
            className={`focus-ring rounded px-0.5 transition-colors ${
              l === locale ? "font-semibold text-brand-700" : "hover:text-brand-700"
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
