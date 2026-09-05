"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

type Result = {
  tourId: string;
  reason: string;
  title: string;
  price: number;
  durationDays: number | null;
  durationHours: number | null;
  companyName: string;
  companySlug: string;
};

export function AiTourSearch({ dict, locale }: { dict: Dictionary["search"]; locale: Locale }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[] | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/ai/tour-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(res.status === 503 ? dict.aiUnavailable : dict.aiError);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError(dict.aiError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50/50 p-5">
      <h2 className="font-semibold text-brand-900">{dict.aiTitle}</h2>
      <p className="mt-1 text-sm text-gray-600">{dict.aiSubtitle}</p>

      <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row gap-2">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.aiPlaceholder}
          rows={2}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-md bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 sm:self-end"
        >
          {loading ? dict.aiLoading : dict.aiButton}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {results !== null && !error && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">{dict.aiResultsTitle}</h3>
          {results.length === 0 ? (
            <p className="text-sm text-gray-500">{dict.aiEmpty}</p>
          ) : (
            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r.tourId}
                  href={`/company/${r.companySlug}#tour-${r.tourId}`}
                  className="block rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-400 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-gray-500">{r.companyName}</p>
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
                      {r.price.toLocaleString()} сом
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-gray-600">💡 {r.reason}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
