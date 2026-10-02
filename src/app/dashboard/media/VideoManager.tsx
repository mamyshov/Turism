"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Video as VideoIcon, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Dictionary } from "@/lib/i18n/dictionary";

type VideoItem = { id: string; type: string; url: string; title: string | null };

export function VideoManager({
  initialVideos,
  dict,
}: {
  initialVideos: VideoItem[];
  dict: Dictionary["dashboard"]["media"];
}) {
  const router = useRouter();
  const [videos, setVideos] = useState(initialVideos);
  const [mode, setMode] = useState<"EMBED" | "UPLOAD">("EMBED");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData();
    formData.append("type", mode);
    formData.append("title", title);
    if (mode === "EMBED") {
      formData.append("url", url);
    } else if (file) {
      formData.append("file", file);
    } else {
      setSaving(false);
      setError(dict.selectFileError);
      return;
    }

    const res = await fetch("/api/companies/me/videos", { method: "POST", body: formData });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? dict.selectFileError);
      return;
    }
    setVideos((prev) => [...prev, data.video]);
    setTitle("");
    setUrl("");
    setFile(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    await fetch(`/api/companies/me/videos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="flex items-center justify-between gap-3 rounded-card border border-line bg-white p-3 text-sm shadow-card">
          <VideoIcon className="size-5 flex-none text-brand-600" aria-hidden />
          <div className="min-w-0 flex-1">
            <span className="font-medium text-ink">
              {video.title || (video.type === "EMBED" ? dict.videoLinkLabel : dict.videoFileLabel)}
            </span>
            <p className="truncate text-xs text-ink-muted">{video.url}</p>
          </div>
          <Button variant="ghost" size="sm" aria-label={dict.delete} icon={<Trash2 className="size-4 text-danger" />} onClick={() => handleDelete(video.id)}>
            <span className="hidden text-danger sm:inline">{dict.delete}</span>
          </Button>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-3 rounded-card border border-line bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <label className="flex items-center gap-1.5">
            <input type="radio" className="accent-brand-600" checked={mode === "EMBED"} onChange={() => setMode("EMBED")} />
            {dict.videoEmbedOption}
          </label>
          <label className="flex items-center gap-1.5">
            <input type="radio" className="accent-brand-600" checked={mode === "UPLOAD"} onChange={() => setMode("UPLOAD")} />
            {dict.videoUploadOption}
          </label>
        </div>

        <Input aria-label={dict.videoTitlePlaceholder} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={dict.videoTitlePlaceholder} />

        {mode === "EMBED" ? (
          <Input aria-label={dict.videoLinkLabel} value={url} onChange={(e) => setUrl(e.target.value)} placeholder={dict.videoUrlPlaceholder} />
        ) : (
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="focus-ring block w-full rounded-md text-sm text-ink-secondary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
        )}

        {error && (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
            <AlertCircle className="size-4" aria-hidden />
            {error}
          </p>
        )}

        <Button type="submit" loading={saving}>
          {saving ? dict.uploading : dict.addVideo}
        </Button>
      </form>
    </div>
  );
}
