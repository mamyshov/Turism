"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-700 text-lg">
          <span aria-hidden>🏔️</span>
          KyrgyzTour Hub
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/search" className="hover:text-brand-700">Каталог</Link>
          <Link href="/about" className="hover:text-brand-700">О проекте</Link>
          <Link href="/contacts" className="hover:text-brand-700">Контакты</Link>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {status === "authenticated" ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin/moderation" className="text-gray-600 hover:text-brand-700">
                  Админ
                </Link>
              )}
              <Link
                href="/dashboard/profile"
                className="text-gray-600 hover:text-brand-700"
              >
                Кабинет
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-brand-700">
                Войти
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-brand-600 px-3 py-1.5 font-medium text-white hover:bg-brand-700"
              >
                Для турфирм
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
