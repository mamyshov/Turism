"use client";

import { useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Heart, X, AlertCircle, Upload, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Reel = { id: string; url: string; caption: string | null; likeCount: number };

export function ReelManager({
  initialReels,
  limit,
  dict,
}: {
  initialReels: Reel[];
  limit: number;
  dict: Dictionary["dashboard"]["reels"];
}) {
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
      setError(dict.selectFileError);
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
      setError(data.error ?? dict.selectFileError);
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
        <form onSubmit={handleSubmit} className="space-y-3 rounded-card border border-line bg-white p-4 shadow-card">
          <input
            ref={fileRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="focus-ring block w-full rounded-md text-sm text-ink-secondary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
          <Input aria-label={dict.captionPlaceholder} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={dict.captionPlaceholder} />
          {error && (
            <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
              <AlertCircle className="size-4" aria-hidden />
              {error}
            </p>
          )}
          <Button type="submit" loading={uploading} icon={uploading ? undefined : <Upload className="size-4" />}>
            {uploading ? dict.uploading : dict.add}
          </Button>
        </form>
      ) : (
        <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-800">{dict.limitReached.replace("{limit}", String(limit))}</p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {reels.map((reel) => (
          <div key={reel.id} className="relative overflow-hidden rounded-card bg-black">
            <video src={reel.url} className="aspect-[9/16] w-full object-cover" muted playsInline />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
              {reel.caption && <p className="line-clamp-2 text-xs">{reel.caption}</p>}
              <p className="flex items-center gap-1 text-xs text-white/80"><Heart className="size-3.5" aria-hidden />{reel.likeCount}</p>
            </div>
            <button
              onClick={() => handleDelete(reel.id)}
              aria-label={dict.delete}
              className="focus-ring absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
      {reels.length === 0 && <EmptyState icon={Clapperboard} title={dict.empty} />}
    </div>
  );
}
