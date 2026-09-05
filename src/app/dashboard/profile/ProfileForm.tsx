"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { REGIONS, LANGUAGES, TOUR_CATEGORIES } from "@/lib/constants";

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

export function ProfileForm({
  initial,
  companySlug,
}: {
  initial: ProfileData;
  companySlug: string;
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
      setError(body.error ?? "Не удалось сохранить.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Описание компании</label>
        <textarea
          rows={5}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="Расскажите туристам о вашей компании, опыте и турах…"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Регион работы</label>
        <select
          value={data.region}
          onChange={(e) => setData({ ...data, region: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="">Не указано</option>
          {REGIONS.map((r) => (
            <option key={r.key} value={r.key}>{r.label}</option>
          ))}
        </select>
      </div>

      <CheckboxGroup
        label="Языки гида"
        options={LANGUAGES}
        selected={data.languages}
        onChange={(key) => setData({ ...data, languages: toggle(data.languages, key) })}
      />

      <CheckboxGroup
        label="Типы туров"
        options={TOUR_CATEGORIES}
        selected={data.categories}
        onChange={(key) => setData({ ...data, categories: toggle(data.categories, key) })}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Телефон" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} placeholder="+996 700 000 000" />
        <TextField label="WhatsApp" value={data.whatsapp} onChange={(v) => setData({ ...data, whatsapp: v })} placeholder="996700000000" />
        <TextField label="Instagram" value={data.instagram} onChange={(v) => setData({ ...data, instagram: v })} placeholder="@yourcompany" />
        <TextField label="Email для связи" value={data.contactEmail} onChange={(v) => setData({ ...data, contactEmail: v })} type="email" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Сохранено ✓</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Сохранение…" : "Сохранить"}
        </button>
        <Link href={`/company/${companySlug}`} className="text-sm text-brand-700 hover:underline" target="_blank">
          Предпросмотр публичной страницы →
        </Link>
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly { key: string; label: string }[];
  selected: string[];
  onChange: (key: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.key}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm ${
              selected.includes(o.key)
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
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
