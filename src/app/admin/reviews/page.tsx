import { prisma } from "@/lib/prisma";
import { StarRating } from "@/components/StarRating";
import { AdminReviewActions } from "./AdminReviewActions";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { company: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Отзывы</h2>
      <p className="mb-6 text-sm text-gray-500">
        Удаляйте спам и накрутку. Последние {reviews.length} отзывов.
      </p>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">Отзывов пока нет.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.authorName}</span>
                    <StarRating value={review.rating} size="sm" />
                  </div>
                  <p className="text-xs text-gray-400">
                    {review.authorEmail} · {review.company.name} ·{" "}
                    {review.createdAt.toLocaleDateString("ru-RU")}
                  </p>
                  {review.text && <p className="mt-2 text-sm text-gray-700">{review.text}</p>}
                </div>
                <AdminReviewActions reviewId={review.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
