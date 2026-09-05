"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ModerationActions({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [comment, setComment] = useState("");

  async function act(status: "APPROVED" | "REJECTED") {
    setBusy(true);
    await fetch(`/api/admin/companies/${companyId}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, comment }),
    });
    router.refresh();
  }

  if (showReject) {
    return (
      <div className="flex flex-col gap-2 w-64">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Причина отклонения (необязательно)"
          rows={2}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={() => act("REJECTED")}
            disabled={busy}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-50"
          >
            Отклонить
          </button>
          <button onClick={() => setShowReject(false)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => act("APPROVED")}
        disabled={busy}
        className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
      >
        Одобрить
      </button>
      <button
        onClick={() => setShowReject(true)}
        disabled={busy}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Отклонить
      </button>
    </div>
  );
}
