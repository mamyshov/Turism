import type { LucideIcon } from "lucide-react";
import { Inbox, AlertTriangle, RotateCw } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  actionHref,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Client-side callback (e.g. retry). Omit this and use `actionHref` from Server Components. */
  action?: { label: string; onClick: () => void };
  /** Server-safe alternative to `action` — renders a plain navigation link. */
  actionHref?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white px-6 py-12 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 text-ink-muted">
        <Icon className="size-6" aria-hidden />
      </div>
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-secondary">{description}</p>}
      {action && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
      {actionHref && (
        <LinkButton href={actionHref.href} variant="secondary" size="sm" className="mt-4">
          {actionHref.label}
        </LinkButton>
      )}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Повторить",
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-line bg-white px-6 py-12 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-red-50 text-danger">
        <AlertTriangle className="size-6" aria-hidden />
      </div>
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-secondary">{description}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" icon={<RotateCw className="size-4" />} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
