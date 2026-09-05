import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: {
    default: "KyrgyzTour Hub — турфирмы и гиды Кыргызстана",
    template: "%s · KyrgyzTour Hub",
  },
  description:
    "Найдите проверенные турфирмы и частных гидов по Кыргызстану: треккинг, конные туры, культурный и гастротуризм и многое другое.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar locale={locale} dict={dict.nav} />
          <main className="flex-1">{children}</main>
          <Footer tagline={dict.footer.tagline} nav={dict.nav} />
        </Providers>
      </body>
    </html>
  );
}
