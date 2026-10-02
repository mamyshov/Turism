import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { labelFor, REGIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { AdminCompanyActions } from "./AdminCompanyActions";

const STATUS: Record<string, { label: string; tone: "warning" | "success" | "danger" }> = {
  PENDING: { label: "На модерации", tone: "warning" },
  APPROVED: { label: "Одобрена", tone: "success" },
  REJECTED: { label: "Отклонена", tone: "danger" },
};

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany({
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">Турфирмы</h2>
      <p className="mb-6 text-sm text-ink-secondary">Всего: {companies.length}</p>

      {/* Desktop/tablet: table */}
      <div className="hidden overflow-x-auto rounded-card border border-line bg-white shadow-card md:block">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Название</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Регион</th>
              <th className="px-4 py-3 font-medium">Статус</th>
              <th className="px-4 py-3 font-medium">Просмотры</th>
              <th className="px-4 py-3 font-medium">Тариф / Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {companies.map((c) => {
              const status = STATUS[c.verificationStatus];
              return (
                <tr key={c.id} className={c.isBlocked ? "bg-red-50/40" : "hover:bg-gray-50"}>
                  <td className="px-4 py-3 font-medium text-ink">
                    {c.verificationStatus === "APPROVED" ? (
                      <Link href={`/company/${c.slug}`} className="focus-ring rounded text-brand-700 hover:underline" target="_blank">
                        {c.name}
                      </Link>
                    ) : (
                      c.name
                    )}
                    {c.isBlocked && (
                      <Badge tone="danger" className="ml-2">
                        Заблокирована
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{c.user.email}</td>
                  <td className="px-4 py-3">{labelFor(REGIONS, c.region) || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                  <td className="px-4 py-3">{c.viewCount}</td>
                  <td className="px-4 py-3">
                    <AdminCompanyActions companyId={c.id} isBlocked={c.isBlocked} tariff={c.tariff} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per company */}
      <div className="space-y-3 md:hidden">
        {companies.map((c) => {
          const status = STATUS[c.verificationStatus];
          return (
            <div
              key={c.id}
              className={`rounded-card border bg-white p-4 shadow-card ${c.isBlocked ? "border-red-200 bg-red-50/40" : "border-line"}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                {c.verificationStatus === "APPROVED" ? (
                  <Link
                    href={`/company/${c.slug}`}
                    target="_blank"
                    className="focus-ring text-balance-wrap inline-block rounded py-1.5 font-semibold text-brand-700"
                  >
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-balance-wrap font-semibold text-ink">{c.name}</span>
                )}
                <Badge tone={status.tone}>{status.label}</Badge>
                {c.isBlocked && <Badge tone="danger">Заблокирована</Badge>}
              </div>
              <dl className="mt-2 space-y-0.5 text-sm text-ink-secondary">
                <div className="break-all">{c.user.email}</div>
                <div>
                  {labelFor(REGIONS, c.region) || "—"} · {c.viewCount} просм.
                </div>
              </dl>
              <div className="mt-3 border-t border-line pt-3">
                <AdminCompanyActions companyId={c.id} isBlocked={c.isBlocked} tariff={c.tariff} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
