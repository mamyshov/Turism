"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
        <div key={video.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm">
          <div>
            <span className="font-medium">
              {video.title || (video.type === "EMBED" ? dict.videoLinkLabel : dict.videoFileLabel)}
            </span>
            <p className="truncate text-xs text-gray-400 max-w-xs">{video.url}</p>
          </div>
          <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:underline">
            {dict.delete}
          </button>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 p-4">
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1.5">
            <input type="radio" checked={mode === "EMBED"} onChange={() => setMode("EMBED")} />
            {dict.videoEmbedOption}
          </label>
          <label className="flex items-center gap-1.5">
            <input type="radio" checked={mode === "UPLOAD"} onChange={() => setMode("UPLOAD")} />
            {dict.videoUploadOption}
          </label>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={dict.videoTitlePlaceholder}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        {mode === "EMBED" ? (
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={dict.videoUrlPlaceholder}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        ) : (
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-brand-700"
          />
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? dict.uploading : dict.addVideo}
        </button>
      </form>
    </div>
  );
}
