import { prisma } from "@/lib/prisma";
import { labelFor, COMPANY_TYPES } from "@/lib/constants";
import { ModerationActions } from "./ModerationActions";

export default async function ModerationPage() {
  const pending = await prisma.company.findMany({
    where: { verificationStatus: "PENDING" },
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Заявки на модерацию</h2>
      <p className="mb-6 text-sm text-gray-500">{pending.length} заявок ожидают проверки</p>

      {pending.length === 0 ? (
        <p className="text-gray-500 text-sm">Новых заявок нет.</p>
      ) : (
        <div className="space-y-4">
          {pending.map((company) => (
            <div key={company.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-500">
                    {labelFor(COMPANY_TYPES, company.type)} · {company.user.email} · {company.phone}
                  </p>
                  {company.verificationDocument && (
                    <a
                      href={company.verificationDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-brand-700 hover:underline"
                    >
                      📄 Документ для верификации
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
