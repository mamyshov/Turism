import { requireCurrentCompany } from "@/lib/current-company";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { Sidebar, type SidebarItem } from "@/components/layout/Sidebar";
import { SidebarLogout } from "@/components/layout/SidebarLogout";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { Clock, XCircle, CheckCircle2, Ban } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const fullDict = getDictionary(locale);
  const dict = fullDict.dashboard;

  const NAV: SidebarItem[] = [
    { href: "/dashboard", label: dict.nav.home, icon: "home" },
    { href: "/dashboard/tours", label: dict.nav.tours, icon: "tours" },
    { href: "/dashboard/media", label: dict.nav.media, icon: "media" },
    { href: "/dashboard/reels", label: dict.nav.reels, icon: "reels" },
    { href: "/dashboard/reviews", label: dict.nav.reviews, icon: "reviews" },
    { href: "/dashboard/stats", label: dict.nav.stats, icon: "stats" },
    { href: "/dashboard/billing", label: dict.nav.billing, icon: "billing" },
    { href: "/dashboard/profile", label: dict.nav.profile, icon: "settings" },
  ];

  const status =
    company.verificationStatus === "PENDING"
      ? { text: dict.status.pending, tone: "warning" as const, icon: <Clock className="size-3.5" aria-hidden /> }
      : company.verificationStatus === "APPROVED"
      ? { text: dict.status.approved, tone: "success" as const, icon: <CheckCircle2 className="size-3.5" aria-hidden /> }
      : { text: dict.status.rejected, tone: "danger" as const, icon: <XCircle className="size-3.5" aria-hidden /> };

  return (
    <div className="mx-auto max-w-container px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-white p-4 shadow-card sm:p-5">
        <div className="min-w-0">
          <h1 className="text-balance-wrap text-lg font-bold text-ink sm:text-xl">{company.name}</h1>
          {company.verificationStatus !== "APPROVED" && (
            <p className="mt-1 text-sm text-ink-secondary">
              {company.verificationStatus === "PENDING"
                ? dict.pendingNotice
                : `${dict.rejectedNotice}${company.verificationComment ? ": " + company.verificationComment : "."}`}
            </p>
          )}
          {company.isBlocked && <p className="mt-1 text-sm text-danger">{dict.blockedNotice}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {company.verificationStatus === "APPROVED" && !company.isBlocked && (
            <ShareButton
              path={`/company/${company.slug}`}
              title={company.name}
              dict={fullDict.share}
              label={fullDict.share.myProfile}
            />
          )}
          {company.isBlocked && (
            <Badge tone="danger" icon={<Ban className="size-3.5" aria-hidden />}>
              {dict.status.blocked}
            </Badge>
          )}
          <Badge tone={status.tone} icon={status.icon}>
            {status.text}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <Sidebar
          items={NAV}
          title={company.name}
          footer={
            <div className="border-t border-line pt-2">
              <SidebarLogout label={dict.nav.logout} />
            </div>
          }
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
