"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2, AlertCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Photo = { id: string; url: string };

export function TourPhotosModal({
  open,
  onClose,
  tourId,
  tourTitle,
  photos,
  onChange,
  limit,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  tourId: string;
  tourTitle: string;
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  limit: number;
  dict: Dictionary["dashboard"]["tours"];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    setUploading(true);
    const form = new FormData();
    form.append("photo", file);
    try {
      const res = await fetch(`/api/companies/me/tours/${tourId}/photos`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? dict.photosError);
        return;
      }
      onChange([...photos, data.photo]);
      router.refresh();
    } catch {
      setError(dict.photosError);
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    onChange(photos.filter((p) => p.id !== id));
    await fetch(`/api/companies/me/tours/${tourId}/photos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${dict.photosTitle}: ${tourTitle}`}
      footer={<Button onClick={onClose}>{dict.done}</Button>}
    >
      <p className="mb-3 text-sm text-ink-secondary">{dict.photosHint.replace("{limit}", String(limit))}</p>
      <div className="grid max-h-[50vh] grid-cols-3 gap-2 overflow-y-auto">
        {photos.map((photo, i) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md bg-gray-100">
            <Image src={photo.url} alt={`${tourTitle} ${i + 1}`} fill className="object-cover" sizes="140px" />
            <button
              type="button"
              onClick={() => remove(photo.id)}
              aria-label={dict.photosDelete}
              className="focus-ring absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        {photos.length < limit ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="focus-ring flex aspect-square flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-line text-xs text-ink-muted transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Plus className="size-5" aria-hidden />}
            {uploading ? dict.photosUploading : dict.photosAdd}
          </button>
        ) : (
          <p className="col-span-3 text-xs text-ink-muted">{dict.photosLimit.replace("{limit}", String(limit))}</p>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
      {error && (
        <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      )}
    </Modal>
  );
}
