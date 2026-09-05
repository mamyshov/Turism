"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminReviewActions({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm("Удалить этот отзыв безвозвратно?")) return;
    setBusy(true);
    await fetch(`/api/admin/reviews/${reviewId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="whitespace-nowrap rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      Удалить
    </button>
  );
}
