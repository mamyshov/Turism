"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Tour = {
  id: string;
  title: string;
  description: string | null;
  durationDays: number | null;
  durationHours: number | null;
  price: number;
  maxPeople: number | null;
  included: string | null;
  excluded: string | null;
};

const EMPTY_FORM = {
  title: "",
  description: "",
  durationDays: "",
  durationHours: "",
  price: "",
  maxPeople: "",
  included: "",
  excluded: "",
};

export function TourManager({ initialTours }: { initialTours: Tour[] }) {
  const router = useRouter();
  const [tours, setTours] = useState(initialTours);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/companies/me/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Не удалось добавить тур.");
      return;
    }

    setTours((prev) => [data.tour, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    setTours((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/companies/me/tours/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {tours.map((tour) => (
        <div key={tour.id} className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{tour.title}</h3>
              <p className="text-sm text-gray-500">
                {[
                  tour.durationDays ? `${tour.durationDays} дн.` : null,
                  tour.durationHours ? `${tour.durationHours} ч.` : null,
                  tour.maxPeople ? `до ${tour.maxPeople} чел.` : null,
                ].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-brand-700">{tour.price.toLocaleString("ru-RU")} сом</span>
              <button onClick={() => handleDelete(tour.id)} className="text-sm text-red-600 hover:underline">
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-4">
          <Field label="Название тура" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Field label="Дней" type="number" value={form.durationDays} onChange={(v) => setForm({ ...form, durationDays: v })} />
            <Field label="Часов" type="number" value={form.durationHours} onChange={(v) => setForm({ ...form, durationHours: v })} />
            <Field label="Цена, сом" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} required />
            <Field label="Макс. чел." type="number" value={form.maxPeople} onChange={(v) => setForm({ ...form, maxPeople: v })} />
          </div>
          <Field label="Включено" value={form.included} onChange={(v) => setForm({ ...form, included: v })} placeholder="Транспорт, питание, гид…" />
          <Field label="Не включено" value={form.excluded} onChange={(v) => setForm({ ...form, excluded: v })} placeholder="Авиабилеты, страховка…" />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50">
              {saving ? "Сохранение…" : "Добавить тур"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-md border border-gray-300 px-4 py-2 text-sm">
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm text-gray-500 hover:border-brand-500 hover:text-brand-600"
        >
          + Добавить тур
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}
