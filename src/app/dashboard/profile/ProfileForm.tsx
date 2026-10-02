"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import type { Dictionary } from "@/lib/i18n/dictionary";

type ProfileData = {
  description: string;
  region: string;
  languages: string[];
  categories: string[];
  phone: string;
  whatsapp: string;
  instagram: string;
  contactEmail: string;
};

type Option = { key: string; label: string };

export function ProfileForm({
  initial,
  companySlug,
  dict,
  regions,
  languages,
  categories,
}: {
  initial: ProfileData;
  companySlug: string;
  dict: Dictionary["dashboard"]["profile"];
  regions: Option[];
  languages: Option[];
  categories: Option[];
}) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(list: string[], key: string): string[] {
    return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/companies/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? dict.errorGeneric);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-card border border-line bg-white p-5 shadow-card sm:p-6">
      <Textarea
        label={dict.description}
        rows={5}
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        placeholder={dict.descriptionPlaceholder}
      />

      <Select label={dict.region} value={data.region} onChange={(e) => setData({ ...data, region: e.target.value })}>
        <option value="">{dict.regionNotSet}</option>
        {regions.map((r) => (
          <option key={r.key} value={r.key}>{r.label}</option>
        ))}
      </Select>

      <CheckboxGroup
        label={dict.languages}
        options={languages}
        selected={data.languages}
        onChange={(key) => setData({ ...data, languages: toggle(data.languages, key) })}
      />

      <CheckboxGroup
        label={dict.categories}
        options={categories}
        selected={data.categories}
        onChange={(key) => setData({ ...data, categories: toggle(data.categories, key) })}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={dict.phone} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="+996 700 000 000" />
        <Input label={dict.whatsapp} value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} placeholder="996700000000" />
        <Input label={dict.instagram} value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} placeholder="@yourcompany" />
        <Input label={dict.email} type="email" value={data.contactEmail} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} />
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="size-4" aria-hidden />
          {dict.saved}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" loading={saving}>
          {saving ? dict.saving : dict.save}
        </Button>
        <Link
          href={`/company/${companySlug}`}
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-medium text-brand-700 hover:underline"
          target="_blank"
        >
          <ExternalLink className="size-4" aria-hidden />
          {dict.preview.replace(/\s*→\s*$/, "")}
        </Link>
      </div>
    </form>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (key: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.key}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-brand-500 ${
              selected.includes(o.key)
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-line text-ink-secondary hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selected.includes(o.key)}
              onChange={() => onChange(o.key)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}
