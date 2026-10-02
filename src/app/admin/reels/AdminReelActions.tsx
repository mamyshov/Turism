"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function AdminReelActions({ reelId }: { reelId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/reels/${reelId}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) {
      setError("Не удалось удалить ролик.");
      return;
    }
    setConfirming(false);
    router.refresh();
  }

  return (
    <>
      <Button variant="outline" size="sm" icon={<Trash2 className="size-4 text-danger" />} onClick={() => setConfirming(true)}>
        <span className="text-danger">Удалить</span>
      </Button>
      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Удалить ролик?"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              Отмена
            </Button>
            <Button variant="danger" loading={busy} onClick={handleDelete}>
              Удалить
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-secondary">Ролик и все его лайки будут удалены безвозвратно.</p>
        {error && (
          <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-danger">
            <AlertCircle className="size-4" aria-hidden />
            {error}
          </p>
        )}
      </Modal>
    </>
  );
}
