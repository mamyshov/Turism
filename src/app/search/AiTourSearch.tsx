"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Sparkles, Lightbulb, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
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
    <div className="rounded-card border border-brand-200 bg-brand-50/60 p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="size-5 text-brand-700" aria-hidden />
        <h2 className="font-semibold text-brand-900">{dict.aiTitle}</h2>
      </div>
      <p className="mt-1 text-sm text-ink-secondary">{dict.aiSubtitle}</p>

      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.aiPlaceholder}
          rows={2}
          className="focus-ring flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm hover:border-ink-secondary/60"
        />
        <Button type="submit" disabled={!query.trim()} loading={loading} className="sm:self-end">
          {loading ? dict.aiLoading : dict.aiButton}
        </Button>
      </form>

      {loading && (
        <div className="mt-4 space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}

      {error && !loading && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      )}

      {results !== null && !error && !loading && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-ink-secondary">{dict.aiResultsTitle}</h3>
          {results.length === 0 ? (
            <EmptyState icon={Sparkles} title={dict.aiEmpty} />
          ) : (
            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r.tourId}
                  href={`/company/${r.companySlug}#tour-${r.tourId}`}
                  className="focus-ring block rounded-md border border-line bg-white p-3 transition-colors hover:border-brand-400 hover:shadow-card"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-ink">{r.title}</p>
                      <p className="text-xs text-ink-muted">{r.companyName}</p>
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
                      {r.price.toLocaleString()} сом
                    </span>
                  </div>
                  <p className="mt-1.5 flex items-start gap-1.5 text-sm text-ink-secondary">
                    <Lightbulb className="mt-0.5 size-4 flex-none text-amber-500" aria-hidden />
                    {r.reason}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
