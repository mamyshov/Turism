"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, AlertCircle, Map, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { TourPhotosModal } from "./TourPhotos";

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
  photos: { id: string; url: string }[];
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

const CURRENCY: Record<Locale, string> = { ru: "сом", ky: "сом", en: "KGS" };

export function TourManager({
  initialTours,
  dict,
  locale,
  photoLimit,
}: {
  photoLimit: number;
  initialTours: Tour[];
  dict: Dictionary["dashboard"]["tours"];
  locale: Locale;
}) {
  const router = useRouter();
  const [tours, setTours] = useState(initialTours);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [photoTourId, setPhotoTourId] = useState<string | null>(null);

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
      setError(data.error ?? dict.errorGeneric);
      return;
    }

    setTours((prev) => [{ ...data.tour, photos: [] }, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setTours((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/companies/me/tours/${id}`, { method: "DELETE" });
    setDeletingId(null);
    router.refresh();
  }

  const durationOf = (t: Tour) =>
    [
      t.durationDays ? `${t.durationDays} ${dict.daysSuffix}` : null,
      t.durationHours ? `${t.durationHours} ${dict.hoursSuffix}` : null,
      t.maxPeople ? dict.maxPeopleSuffix.replace("{n}", String(t.maxPeople)) : null,
    ]
      .filter(Boolean)
      .join(" · ") || "—";

  const photoButton = (tour: Tour) => (
    <Button
      variant="ghost"
      size="sm"
      icon={<ImagePlus className="size-4" />}
      onClick={() => setPhotoTourId(tour.id)}
    >
      {dict.photosButton} ({tour.photos.length})
    </Button>
  );

  const thumb = (tour: Tour, cls: string) => (
    <div className={`relative flex-none overflow-hidden rounded-md bg-gray-100 ${cls}`}>
      {tour.photos[0] ? (
        <Image src={tour.photos[0].url} alt="" fill className="object-cover" sizes="96px" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-300">
          <ImagePlus className="size-5" aria-hidden />
        </div>
      )}
    </div>
  );

  const deleteButton = (tour: Tour) => (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`${dict.delete}: ${tour.title}`}
      loading={deletingId === tour.id}
      icon={<Trash2 className="size-4 text-danger" />}
      onClick={() => handleDelete(tour.id)}
    >
      <span className="text-danger">{dict.delete}</span>
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {!showForm && (
          <Button icon={<Plus className="size-4" />} onClick={() => setShowForm(true)}>
            {dict.add.replace(/^\+\s*/, "")}
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-line bg-white p-5 shadow-card">
          <Input label={dict.titleLabel} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Textarea
            label={dict.descriptionLabel}
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Input label={dict.daysLabel} type="number" min={0} value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: e.target.value })} />
            <Input label={dict.hoursLabel} type="number" min={0} value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: e.target.value })} />
            <Input label={dict.priceLabel} type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <Input label={dict.maxPeopleLabel} type="number" min={1} value={form.maxPeople} onChange={(e) => setForm({ ...form, maxPeople: e.target.value })} />
          </div>
          <Input label={dict.includedLabel} value={form.included} onChange={(e) => setForm({ ...form, included: e.target.value })} placeholder={dict.includedPlaceholder} />
          <Input label={dict.excludedLabel} value={form.excluded} onChange={(e) => setForm({ ...form, excluded: e.target.value })} placeholder={dict.excludedPlaceholder} />

          {error && (
            <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
              <AlertCircle className="size-4" aria-hidden />
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" loading={saving}>
              {dict.addButton}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              {dict.cancel}
            </Button>
          </div>
        </form>
      )}

      {tours.length === 0 && !showForm ? (
        <EmptyState icon={Map} title={dict.empty} />
      ) : (
        tours.length > 0 && (
          <>
            {/* Desktop/tablet: table */}
            <div className="hidden overflow-hidden rounded-card border border-line bg-white shadow-card md:block">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">{dict.titleLabel}</th>
                    <th className="px-4 py-3 font-medium">{dict.durationLabel}</th>
                    <th className="px-4 py-3 font-medium">{dict.priceLabel}</th>
                    <th className="px-4 py-3 text-right font-medium">{dict.actionsLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {tours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {thumb(tour, "h-12 w-16")}
                          <span className="text-balance-wrap max-w-xs font-medium text-ink">{tour.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ink-secondary">{durationOf(tour)}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-brand-700">
                        {tour.price.toLocaleString()} {CURRENCY[locale]}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">{photoButton(tour)}{deleteButton(tour)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: one card per tour */}
            <div className="space-y-3 md:hidden">
              {tours.map((tour) => (
                <div key={tour.id} className="rounded-card border border-line bg-white p-4 shadow-card">
                  <div className="mb-3 aspect-[16/9] w-full">{thumb(tour, "h-full w-full")}</div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-balance-wrap font-semibold text-ink">{tour.title}</h3>
                    <span className="whitespace-nowrap font-semibold text-brand-700">
                      {tour.price.toLocaleString()} {CURRENCY[locale]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-secondary">{durationOf(tour)}</p>
                  <div className="mt-3 flex justify-end gap-1 border-t border-line pt-2">{photoButton(tour)}{deleteButton(tour)}</div>
                </div>
              ))}
            </div>
          </>
        )
      )}
      {photoTourId && (() => {
        const tour = tours.find((t) => t.id === photoTourId);
        if (!tour) return null;
        return (
          <TourPhotosModal
            open
            onClose={() => setPhotoTourId(null)}
            tourId={tour.id}
            tourTitle={tour.title}
            photos={tour.photos}
            onChange={(photos) => setTours((prev) => prev.map((t) => (t.id === tour.id ? { ...t, photos } : t)))}
            limit={photoLimit}
            dict={dict}
          />
        );
      })()}
    </div>
  );
}
