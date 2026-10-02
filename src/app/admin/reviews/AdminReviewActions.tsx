"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function AdminReviewActions({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setBusy(true);
    await fetch(`/api/admin/reviews/${reviewId}`, { method: "DELETE" });
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
        title="Удалить отзыв?"
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
        <p className="text-sm text-ink-secondary">Отзыв будет удалён безвозвратно.</p>
      </Modal>
    </>
  );
}
