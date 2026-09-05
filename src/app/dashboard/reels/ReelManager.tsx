"use client";

import { useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type Reel = { id: string; url: string; caption: string | null; likeCount: number };

export function ReelManager({ initialReels, limit }: { initialReels: Reel[]; limit: number }) {
  const router = useRouter();
  const [reels, setReels] = useState(initialReels);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Выберите видеофайл.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    const res = await fetch("/api/companies/me/reels", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error ?? "Не удалось загрузить видео.");
      return;
    }

    setReels((prev) => [{ ...data.reel, likeCount: 0 }, ...prev]);
    setCaption("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    router.refresh();
  }

  async function handleDelete(id: string) {
    setReels((prev) => prev.filter((r) => r.id !== id));
    await fetch(`/api/companies/me/reels/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {reels.length < limit ? (
        <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 p-4">
          <input
            ref={fileRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-brand-700"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Подпись (необязательно)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={uploading}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {uploading ? "Загрузка…" : "Добавить ролик"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500">
          Достигнут лимит роликов ({limit}). Удалите старый, чтобы добавить новый.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {reels.map((reel) => (
          <div key={reel.id} className="relative overflow-hidden rounded-lg bg-black">
            <video src={reel.url} className="aspect-[9/16] w-full object-cover" muted playsInline />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
              {reel.caption && <p className="line-clamp-2 text-xs">{reel.caption}</p>}
              <p className="text-xs text-white/70">❤️ {reel.likeCount}</p>
            </div>
            <button
              onClick={() => handleDelete(reel.id)}
              className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {reels.length === 0 && <p className="text-sm text-gray-500">Пока нет роликов.</p>}
    </div>
  );
}
