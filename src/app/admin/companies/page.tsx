import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { labelFor, REGIONS } from "@/lib/constants";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "На модерации",
  APPROVED: "Одобрено",
  REJECTED: "Отклонено",
};

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany({
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Все турфирмы</h2>
      <p className="mb-6 text-sm text-gray-500">Всего: {companies.length}</p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Регион</th>
              <th className="px-4 py-2">Тариф</th>
              <th className="px-4 py-2">Статус</th>
              <th className="px-4 py-2">Просмотры</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {companies.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-2 font-medium">
                  {c.verificationStatus === "APPROVED" ? (
                    <Link href={`/company/${c.slug}`} className="text-brand-700 hover:underline" target="_blank">
                      {c.name}
                    </Link>
                  ) : (
                    c.name
                  )}
                </td>
                <td className="px-4 py-2 text-gray-500">{c.user.email}</td>
                <td className="px-4 py-2">{labelFor(REGIONS, c.region)}</td>
                <td className="px-4 py-2">{c.tariff}</td>
                <td className="px-4 py-2">{STATUS_LABEL[c.verificationStatus]}</td>
                <td className="px-4 py-2">{c.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
