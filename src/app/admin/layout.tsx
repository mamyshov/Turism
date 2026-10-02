import { Sidebar, type SidebarItem } from "@/components/layout/Sidebar";
import { SidebarLogout } from "@/components/layout/SidebarLogout";

const NAV: SidebarItem[] = [
  { href: "/admin/moderation", label: "Модерация", icon: "moderation" },
  { href: "/admin/companies", label: "Турфирмы", icon: "companies" },
  { href: "/admin/reviews", label: "Отзывы", icon: "reviews" },
  { href: "/admin/reels", label: "Reels", icon: "reels" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-container px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <Sidebar
          items={NAV}
          title="Панель администратора"
          footer={
            <div className="border-t border-line pt-2">
              <SidebarLogout label="Выйти" />
            </div>
          }
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
