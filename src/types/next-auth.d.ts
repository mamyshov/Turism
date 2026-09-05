import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "COMPANY" | "ADMIN";
      companyId: string | null;
      companySlug: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "COMPANY" | "ADMIN";
    companyId: string | null;
    companySlug: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "COMPANY" | "ADMIN";
    companyId: string | null;
    companySlug: string | null;
  }
}
