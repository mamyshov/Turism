import Link from "next/link";
import { requireCurrentCompany } from "@/lib/current-company";

const NAV = [
  { href: "/dashboard/profile", label: "Профиль" },
  { href: "/dashboard/media", label: "Фото и медиа" },
  { href: "/dashboard/reels", label: "🎬 Reels" },
  { href: "/dashboard/tours", label: "Туры" },
  { href: "/dashboard/stats", label: "Статистика" },
  { href: "/dashboard/billing", label: "Тариф" },
];

const STATUS_LABEL: Record<string, { text: string; className: string }> = {
  PENDING: { text: "На модерации", className: "bg-amber-100 text-amber-800" },
  APPROVED: { text: "Одобрено", className: "bg-green-100 text-green-800" },
  REJECTED: { text: "Отклонено", className: "bg-red-100 text-red-800" },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const company = await requireCurrentCompany();
  const status = STATUS_LABEL[company.verificationStatus];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{company.name}</h1>
          {company.verificationStatus !== "APPROVED" && (
            <p className="mt-1 text-sm text-gray-500">
              {company.verificationStatus === "PENDING"
                ? "Ваш профиль ещё не виден в каталоге, пока администратор не одобрит заявку."
                : `Заявка отклонена${company.verificationComment ? ": " + company.verificationComment : "."}`}
            </p>
          )}
          {company.isBlocked && (
            <p className="mt-1 text-sm text-red-600">
              Профиль заблокирован администратором и скрыт из каталога.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {company.isBlocked && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
              Заблокирован
            </span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
