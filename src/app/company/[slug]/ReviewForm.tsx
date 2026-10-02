"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Star, CheckCircle2, AlertCircle, PenLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
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
    return (
      <p className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-success">
        <CheckCircle2 className="size-4" aria-hidden />
        {dict.reviewThanks}
      </p>
    );
  }

  if (!open) {
    return (
      <Button variant="outline" icon={<PenLine className="size-4" />} onClick={() => setOpen(true)}>
        {dict.leaveReview}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-card border border-line bg-white p-5 shadow-card">
      <div>
        <p className="mb-1.5 text-sm font-medium text-ink">{dict.reviewFormRating}</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i)}
              aria-label={`${i} / 5`}
              aria-pressed={i <= rating}
              className="focus-ring rounded p-0.5 transition-transform active:scale-90"
            >
              <Star
                className={`size-7 ${i <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <Input label={dict.reviewFormName} value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      <Input
        type="email"
        label={dict.reviewFormEmail}
        value={authorEmail}
        onChange={(e) => setAuthorEmail(e.target.value)}
        required
      />
      <Textarea label={dict.reviewFormText} value={text} onChange={(e) => setText(e.target.value)} rows={3} />

      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" loading={saving}>
          {dict.reviewFormSubmit}
        </Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          {dict.reviewFormCancel}
        </Button>
      </div>
    </form>
  );
}
