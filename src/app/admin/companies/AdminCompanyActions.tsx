"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CircleCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    setBusy(true);
    await fetch(`/api/admin/companies/${companyId}`, { method: "DELETE" });
    setConfirmDelete(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        aria-label="Тариф"
        value={tariff}
        disabled={busy}
        onChange={(e) => changeTariff(e.target.value)}
        className="focus-ring h-9 rounded-md border border-line bg-white px-2 text-xs disabled:opacity-50"
      >
        {TARIFFS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <Button
        variant="outline"
        size="sm"
        disabled={busy}
        icon={isBlocked ? <CircleCheck className="size-4" /> : <Ban className="size-4" />}
        onClick={toggleBlock}
      >
        {isBlocked ? "Разблокировать" : "Заблокировать"}
      </Button>
      <Button variant="ghost" size="sm" aria-label="Удалить" disabled={busy} onClick={() => setConfirmDelete(true)}>
        <Trash2 className="size-4 text-danger" />
      </Button>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Удалить турфирму?"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Отмена
            </Button>
            <Button variant="danger" loading={busy} onClick={handleDelete}>
              Удалить
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-secondary">Турфирма и все её данные будут удалены безвозвратно.</p>
      </Modal>
    </div>
  );
}
