import Link from "next/link";
import { requireCurrentCompany } from "@/lib/current-company";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

const STATUS_CLASS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard;

  const NAV = [
    { href: "/dashboard/profile", label: dict.nav.profile },
    { href: "/dashboard/media", label: dict.nav.media },
    { href: "/dashboard/reels", label: dict.nav.reels },
    { href: "/dashboard/tours", label: dict.nav.tours },
    { href: "/dashboard/stats", label: dict.nav.stats },
    { href: "/dashboard/billing", label: dict.nav.billing },
  ];

  const statusText =
    company.verificationStatus === "PENDING"
      ? dict.status.pending
      : company.verificationStatus === "APPROVED"
      ? dict.status.approved
      : dict.status.rejected;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{company.name}</h1>
          {company.verificationStatus !== "APPROVED" && (
            <p className="mt-1 text-sm text-gray-500">
              {company.verificationStatus === "PENDING"
                ? dict.pendingNotice
                : `${dict.rejectedNotice}${company.verificationComment ? ": " + company.verificationComment : "."}`}
            </p>
          )}
          {company.isBlocked && (
            <p className="mt-1 text-sm text-red-600">{dict.blockedNotice}</p>
          )}
        </div>
        <div className="flex gap-2">
          {company.isBlocked && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
              {dict.status.blocked}
            </span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_CLASS[company.verificationStatus]}`}>
            {statusText}
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
