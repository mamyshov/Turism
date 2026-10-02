"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

export function ModerationActions({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [showReject, setShowReject] = useState(false);
  const [comment, setComment] = useState("");

  async function act(status: "APPROVED" | "REJECTED") {
    setBusy(status);
    await fetch(`/api/admin/companies/${companyId}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, comment }),
    });
    router.refresh();
  }

  if (showReject) {
    return (
      <div className="flex w-full flex-col gap-2 lg:w-72">
        <Textarea
          label="Причина отклонения"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
        <div className="flex gap-2">
          <Button
            variant="danger"
            size="sm"
            loading={busy === "REJECTED"}
            disabled={!comment.trim()}
            onClick={() => act("REJECTED")}
          >
            Отклонить
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowReject(false)}>
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" icon={<Check className="size-4" />} loading={busy === "APPROVED"} disabled={busy !== null} onClick={() => act("APPROVED")}>
        Одобрить
      </Button>
      <Button variant="outline" size="sm" icon={<X className="size-4 text-danger" />} disabled={busy !== null} onClick={() => setShowReject(true)}>
        Отклонить
      </Button>
    </div>
  );
}
