import { FileText, ClipboardCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { labelFor, COMPANY_TYPES, REGIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ModerationActions } from "./ModerationActions";

export default async function ModerationPage() {
  const pending = await prisma.company.findMany({
    where: { verificationStatus: "PENDING" },
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">Заявки на модерацию</h2>
      <p className="mb-6 text-sm text-ink-secondary">{pending.length} заявок ожидают проверки</p>

      {pending.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title="Новых заявок нет." />
      ) : (
        <div className="space-y-3">
          {pending.map((company) => (
            <div key={company.id} className="rounded-card border border-line bg-white p-4 shadow-card sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-balance-wrap font-semibold text-ink">{company.name}</h3>
                    <Badge tone="warning">На модерации</Badge>
                  </div>
                  <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm text-ink-secondary sm:grid-cols-2">
                    <div><dt className="inline text-ink-muted">Тип: </dt><dd className="inline">{labelFor(COMPANY_TYPES, company.type)}</dd></div>
                    <div><dt className="inline text-ink-muted">Регион: </dt><dd className="inline">{labelFor(REGIONS, company.region) || "—"}</dd></div>
                    <div className="min-w-0"><dt className="inline text-ink-muted">Email: </dt><dd className="inline break-all">{company.user.email}</dd></div>
                    <div><dt className="inline text-ink-muted">Телефон: </dt><dd className="inline">{company.phone || "—"}</dd></div>
                    <div><dt className="inline text-ink-muted">Дата заявки: </dt><dd className="inline">{company.createdAt.toLocaleDateString("ru-RU")}</dd></div>
                  </dl>
                  {company.verificationDocument && (
                    <a
                      href={company.verificationDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring mt-2 inline-flex items-center gap-1.5 rounded text-sm font-medium text-brand-700 hover:underline"
                    >
                      <FileText className="size-4" aria-hidden />
                      Документ для верификации
                    </a>
                  )}
                </div>
                <ModerationActions companyId={company.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
