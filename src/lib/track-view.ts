import { prisma } from "@/lib/prisma";

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

/**
 * Records a profile view: bumps the fast-to-read running total on Company
 * and the per-day breakdown used by the dashboard stats chart. Best-effort
 * by design — a failure here must never break the page render, so callers
 * fire-and-forget this (no await) and it swallows its own errors.
 */
export async function trackCompanyView(companyId: string): Promise<void> {
  const date = todayUtc();
  await Promise.all([
    prisma.company.update({ where: { id: companyId }, data: { viewCount: { increment: 1 } } }),
    prisma.dailyView.upsert({
      where: { companyId_date: { companyId, date } },
      create: { companyId, date, count: 1 },
      update: { count: { increment: 1 } },
    }),
  ]);
}
