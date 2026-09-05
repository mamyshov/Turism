"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function ReviewForm({ companyId, dict }: { companyId: string; dict: Dictionary["company"] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch(`/api/companies/${companyId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorName, authorEmail, rating, text }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Error");
      return;
    }
    setDone(true);
    router.refresh();
  }

  if (done) {
    return <p className="text-sm text-green-700">{dict.reviewThanks}</p>;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        {dict.leaveReview}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3 rounded-lg border border-gray-200 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{dict.reviewFormRating}</label>
        <div className="flex gap-1 text-2xl text-amber-500">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i)}
              aria-label={`${i} / 5`}
              className="leading-none"
            >
              {i <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>
      <input
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder={dict.reviewFormName}
        required
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        type="email"
        value={authorEmail}
        onChange={(e) => setAuthorEmail(e.target.value)}
        placeholder={dict.reviewFormEmail}
        required
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={dict.reviewFormText}
        rows={3}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "…" : dict.reviewFormSubmit}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-gray-300 px-4 py-2 text-sm">
          {dict.reviewFormCancel}
        </button>
      </div>
    </form>
  );
}
