import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
