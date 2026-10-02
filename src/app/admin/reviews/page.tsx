import { MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StarRating } from "@/components/StarRating";
import { EmptyState } from "@/components/ui/EmptyState";
import { AdminReviewActions } from "./AdminReviewActions";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { company: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">Отзывы</h2>
      <p className="mb-6 text-sm text-ink-secondary">
        Удаляйте спам и накрутку. Последние {reviews.length} отзывов.
      </p>

      {reviews.length === 0 ? (
        <EmptyState icon={MessageSquare} title="Отзывов пока нет." />
      ) : (
        <>
          {/* Desktop/tablet: table */}
          <div className="hidden overflow-x-auto rounded-card border border-line bg-white shadow-card md:block">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Компания</th>
                  <th className="px-4 py-3 font-medium">Автор</th>
                  <th className="px-4 py-3 font-medium">Рейтинг</th>
                  <th className="px-4 py-3 font-medium">Текст</th>
                  <th className="px-4 py-3 font-medium">Дата</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {reviews.map((r) => (
                  <tr key={r.id} className="align-top hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-ink">{r.company.name}</td>
                    <td className="px-4 py-3">
                      <p className="text-ink">{r.authorName}</p>
                      <p className="break-all text-xs text-ink-muted">{r.authorEmail}</p>
                    </td>
                    <td className="px-4 py-3"><StarRating value={r.rating} size="sm" /></td>
                    <td className="text-balance-wrap max-w-xs px-4 py-3 text-ink-secondary">{r.text || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-secondary">{r.createdAt.toLocaleDateString("ru-RU")}</td>
                    <td className="px-4 py-3 text-right"><AdminReviewActions reviewId={r.id} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="space-y-3 md:hidden">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-card border border-line bg-white p-4 shadow-card">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-balance-wrap font-medium text-ink">{r.authorName}</span>
                  <StarRating value={r.rating} size="sm" />
                </div>
                <p className="mt-0.5 break-all text-xs text-ink-muted">
                  {r.authorEmail} · {r.company.name} · {r.createdAt.toLocaleDateString("ru-RU")}
                </p>
                {r.text && <p className="mt-2 text-sm text-ink-secondary">{r.text}</p>}
                <div className="mt-3 flex justify-end border-t border-line pt-2">
                  <AdminReviewActions reviewId={r.id} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
