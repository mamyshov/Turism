"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Photo = { id: string; url: string };

export function PhotoManager({
  initialPhotos,
  limit,
}: {
  initialPhotos: Photo[];
  limit: number;
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
      setError(data.error ?? "Не удалось загрузить фото.");
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
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image src={photo.url} alt="" fill className="object-cover" sizes="150px" />
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}

        {photos.length < limit && (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-brand-500 hover:text-brand-600 disabled:opacity-50"
          >
            {uploading ? "Загрузка…" : "+ Добавить"}
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

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-gray-400">{photos.length} / {limit} фото загружено</p>
    </div>
  );
}
