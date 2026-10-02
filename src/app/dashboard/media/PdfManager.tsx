"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FileText, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Dictionary } from "@/lib/i18n/dictionary";

type PdfItem = { id: string; title: string; url: string };

export function PdfManager({
  initialPdfs,
  dict,
}: {
  initialPdfs: PdfItem[];
  dict: Dictionary["dashboard"]["media"];
}) {
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
      setError(dict.selectFileError);
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
      setError(data.error ?? dict.selectFileError);
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
        <div key={pdf.id} className="flex items-center justify-between gap-3 rounded-card border border-line bg-white p-3 text-sm shadow-card">
          <FileText className="size-5 flex-none text-brand-600" aria-hidden />
          <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="focus-ring text-balance-wrap min-w-0 flex-1 rounded font-medium text-brand-700 hover:underline">
            {pdf.title}
          </a>
          <Button variant="ghost" size="sm" aria-label={dict.delete} icon={<Trash2 className="size-4 text-danger" />} onClick={() => handleDelete(pdf.id)}>
            <span className="hidden text-danger sm:inline">{dict.delete}</span>
          </Button>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-3 rounded-card border border-line bg-white p-4 shadow-card">
        <Input aria-label={dict.pdfTitlePlaceholder} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={dict.pdfTitlePlaceholder} />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="focus-ring block w-full rounded-md text-sm text-ink-secondary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:font-medium file:text-brand-700 hover:file:bg-brand-100"
        />

        {error && (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
            <AlertCircle className="size-4" aria-hidden />
            {error}
          </p>
        )}

        <Button type="submit" loading={saving}>
          {saving ? dict.uploading : dict.addPdf}
        </Button>
      </form>
    </div>
  );
}
