"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TARIFFS = ["BASIC", "STANDARD", "PRO"];

export function AdminCompanyActions({
  companyId,
  isBlocked,
  tariff,
}: {
  companyId: string;
  isBlocked: boolean;
  tariff: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleBlock() {
    setBusy(true);
    await fetch(`/api/admin/companies/${companyId}/block`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked: !isBlocked }),
    });
    setBusy(false);
    router.refresh();
  }

  async function changeTariff(newTariff: string) {
    setBusy(true);
    await fetch(`/api/admin/companies/${companyId}/tariff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tariff: newTariff }),
    });
    setBusy(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Удалить турфирму и все её данные безвозвратно?")) return;
    setBusy(true);
    await fetch(`/api/admin/companies/${companyId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={tariff}
        disabled={busy}
        onChange={(e) => changeTariff(e.target.value)}
        className="rounded-md border border-gray-300 px-1.5 py-1 text-xs bg-white disabled:opacity-50"
      >
        {TARIFFS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <button
        onClick={toggleBlock}
        disabled={busy}
        className="whitespace-nowrap rounded-md border border-gray-300 px-2.5 py-1 text-xs hover:bg-gray-50 disabled:opacity-50"
      >
        {isBlocked ? "Разблокировать" : "Заблокировать"}
      </button>
      <button
        onClick={handleDelete}
        disabled={busy}
        className="whitespace-nowrap rounded-md border border-red-300 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        Удалить
      </button>
    </div>
  );
}
