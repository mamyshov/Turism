"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Reel = {
  id: string;
  url: string;
  caption: string | null;
  companyName: string;
  companySlug: string;
  likeCount: number;
  liked: boolean;
};

export function ReelsFeed({ reels, dict }: { reels: Reel[]; dict: Dictionary["reels"] }) {
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Autoplay only the reel currently in view; pause the rest so we don't
  // run 50 decoders at once.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.6 }
    );
    for (const video of videoRefs.current.values()) observer.observe(video);
    return () => observer.disconnect();
  }, [reels]);

  useEffect(() => {
    for (const video of videoRefs.current.values()) video.muted = muted;
  }, [muted]);

  if (reels.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-center px-4">
        <div>
          <h1 className="text-xl font-bold mb-2">{dict.title}</h1>
          <p className="text-gray-500">{dict.empty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] snap-y snap-mandatory overflow-y-scroll bg-black">
      {reels.map((reel) => (
        <ReelSlide
          key={reel.id}
          reel={reel}
          dict={dict}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          videoRef={(el) => {
            if (el) videoRefs.current.set(reel.id, el);
            else videoRefs.current.delete(reel.id);
          }}
        />
      ))}
    </div>
  );
}

function ReelSlide({
  reel,
  dict,
  muted,
  onToggleMute,
  videoRef,
}: {
  reel: Reel;
  dict: Dictionary["reels"];
  muted: boolean;
  onToggleMute: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  const [liked, setLiked] = useState(reel.liked);
  const [count, setCount] = useState(reel.likeCount);
  const [busy, setBusy] = useState(false);

  async function handleLike() {
    if (busy) return;
    setBusy(true);
    // Optimistic update — a failed request is rare and low-stakes here.
    setLiked((l) => !l);
    setCount((c) => (liked ? c - 1 : c + 1));
    try {
      const res = await fetch(`/api/reels/${reel.id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setLiked(data.liked);
        setCount(data.count);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex h-full w-full snap-start items-center justify-center">
      <video
        ref={videoRef}
        src={reel.url}
        loop
        playsInline
        muted={muted}
        onClick={onToggleMute}
        className="h-full w-full cursor-pointer object-contain sm:object-cover"
      />

      {muted && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {dict.tapToUnmute}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-4 pb-8 text-white">
        <div className="min-w-0">
          <Link href={`/company/${reel.companySlug}`} className="font-semibold hover:underline">
            {reel.companyName}
          </Link>
          {reel.caption && <p className="mt-1 text-sm text-white/90 line-clamp-3">{reel.caption}</p>}
          <Link
            href={`/company/${reel.companySlug}`}
            className="mt-2 inline-block rounded-full border border-white/60 px-3 py-1 text-xs hover:bg-white/10"
          >
            {dict.viewProfile}
          </Link>
        </div>

        <button
          onClick={handleLike}
          className="flex flex-none flex-col items-center gap-1 text-2xl"
          aria-label="like"
        >
          <span className={liked ? "text-red-500" : "text-white"}>{liked ? "❤️" : "🤍"}</span>
          <span className="text-xs text-white/90">{count}</span>
        </button>
      </div>
    </div>
  );
}
