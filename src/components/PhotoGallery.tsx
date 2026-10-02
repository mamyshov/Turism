"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoGallery({
  photos,
  companyName,
}: {
  photos: { id: string; url: string }[];
  companyName: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-gray-100 sm:aspect-[16/9]">
        <Image
          src={photos[active].url}
          alt={`${companyName} — ${active + 1}/${photos.length}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 800px, 100vw"
          priority
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActive((i) => (i - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
              className="focus-ring absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => setActive((i) => (i + 1) % photos.length)}
              aria-label="Next photo"
              className="focus-ring absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              aria-current={i === active}
              className={`focus-ring relative h-16 w-24 flex-none overflow-hidden rounded-sm ${
                i === active ? "ring-2 ring-brand-600" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={photo.url} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
