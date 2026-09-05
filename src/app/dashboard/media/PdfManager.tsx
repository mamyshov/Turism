"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type PdfItem = { id: string; title: string; url: string };

export function PdfManager({ initialPdfs }: { initialPdfs: PdfItem[] }) {
  const router = useRouter();
  const [pdfs, setPdfs] = useState(initialPdfs);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !file) {
      setError("Укажите название и выберите файл.");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const res = await fetch("/api/companies/me/pdfs", { method: "POST", body: formData });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Не удалось загрузить файл.");
      return;
    }
    setPdfs((prev) => [...prev, data.pdf]);
    setTitle("");
    setFile(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    setPdfs((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/companies/me/pdfs/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {pdfs.map((pdf) => (
        <div key={pdf.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm">
          <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 hover:underline">
            📄 {pdf.title}
          </a>
          <button onClick={() => handleDelete(pdf.id)} className="text-red-600 hover:underline">
            Удалить
          </button>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-gray-200 p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название гида, например «Маршрут на Ала-Кёль»"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-brand-700"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Загрузка…" : "Добавить PDF"}
        </button>
      </form>
    </div>
  );
}
