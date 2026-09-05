"use client";

import { useState } from "react";
import Image from "next/image";

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
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={photos[active].url}
          alt={`Фото ${active + 1} — ${companyName}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 800px, 100vw"
          priority
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActive((i) => (i - 1 + photos.length) % photos.length)}
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((i) => (i + 1) % photos.length)}
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              ›
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 flex-none overflow-hidden rounded-md ${
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
