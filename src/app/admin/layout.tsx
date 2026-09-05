import Link from "next/link";

const NAV = [
  { href: "/admin/moderation", label: "Модерация" },
  { href: "/admin/companies", label: "Все турфирмы" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Панель администратора</h1>
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
