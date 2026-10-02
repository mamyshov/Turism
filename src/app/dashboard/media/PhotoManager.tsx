"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X, Plus, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Photo = { id: string; url: string };

export function PhotoManager({
  initialPhotos,
  limit,
  dict,
}: {
  initialPhotos: Photo[];
  limit: number;
  dict: Dictionary["dashboard"]["media"];
}) {
  const router = useRouter();
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("/api/companies/me/photos", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error ?? dict.selectFileError);
      return;
    }
    setPhotos((prev) => [...prev, data.photo]);
    router.refresh();
  }

  async function handleDelete(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/companies/me/photos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-card bg-gray-100">
            <Image src={photo.url} alt="" fill className="object-cover" sizes="150px" />
            <button
              onClick={() => handleDelete(photo.id)}
              aria-label={dict.delete}
              className="focus-ring absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}

        {photos.length < limit && (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="focus-ring flex aspect-square flex-col items-center justify-center gap-1 rounded-card border-2 border-dashed border-line text-sm text-ink-muted transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Plus className="size-5" aria-hidden />}
            {uploading ? dict.uploading : dict.add.replace(/^\+\s*/, "")}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && (
        <p role="alert" className="mb-2 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="size-4" aria-hidden />
          {error}
        </p>
      )}
      <p className="text-xs text-ink-muted">
        {dict.photosCount.replace("{count}", String(photos.length)).replace("{limit}", String(limit))}
      </p>
    </div>
  );
}
