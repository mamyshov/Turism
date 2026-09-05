import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Loads the Company owned by the current session's user. Only meant to be
 * called from pages under /dashboard, which the middleware already gates
 * behind an authenticated session — this just resolves the row.
 */
export async function requireCurrentCompany() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    redirect("/login");
  }

  const company = await prisma.company.findUnique({
    where: { id: session.user.companyId },
    include: {
      photos: { orderBy: { order: "asc" } },
      tours: { orderBy: { createdAt: "desc" } },
      videos: true,
      pdfGuides: true,
      reels: { orderBy: { createdAt: "desc" }, include: { _count: { select: { likes: true } } } },
    },
  });

  if (!company) redirect("/login");
  return company;
}
