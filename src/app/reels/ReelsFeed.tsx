"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, Share2, VolumeX, Volume2, Film } from "lucide-react";
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
      <div className="flex h-[calc(100dvh-4rem)] items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 text-ink-muted">
            <Film className="size-6" aria-hidden />
          </div>
          <h1 className="mb-1 text-xl font-bold text-ink">{dict.title}</h1>
          <p className="text-ink-secondary">{dict.empty}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="no-scrollbar h-[calc(100dvh-4rem)] snap-y snap-mandatory overflow-y-scroll bg-black">
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

  async function handleShare() {
    const url = `${window.location.origin}/company/${reel.companySlug}`;
    try {
      if (navigator.share) await navigator.share({ title: reel.companyName, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      // user cancelled or clipboard blocked — nothing to recover
    }
  }

  return (
    <div className="relative flex h-full w-full snap-start snap-always items-center justify-center">
      <div className="relative h-full w-full sm:aspect-[9/16] sm:h-full sm:w-auto">
      <video
        ref={videoRef}
        src={reel.url}
        loop
        playsInline
        muted={muted}
        onClick={onToggleMute}
        preload="metadata"
        aria-label={reel.caption ?? reel.companyName}
        className="h-full w-full cursor-pointer object-cover"
      />

      <button
        onClick={onToggleMute}
        aria-label={muted ? dict.tapToUnmute : dict.muted}
        className="focus-ring absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white hover:bg-black/70"
      >
        {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
        {muted && dict.tapToUnmute}
      </button>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-4 pb-8 text-white">
        <div className="min-w-0">
          <Link href={`/company/${reel.companySlug}`} className="focus-ring rounded font-semibold hover:underline">
            {reel.companyName}
          </Link>
          {reel.caption && <p className="mt-1 text-sm text-white/90 line-clamp-3">{reel.caption}</p>}
          <Link
            href={`/company/${reel.companySlug}`}
            className="focus-ring mt-2 inline-block rounded-full border border-white/60 px-3 py-1.5 text-xs hover:bg-white/10"
          >
            {dict.viewProfile}
          </Link>
        </div>

        <div className="flex flex-none flex-col items-center gap-4">
          <button
            onClick={handleLike}
            className="focus-ring flex flex-col items-center gap-1 rounded-full p-1"
            aria-label="Like"
            aria-pressed={liked}
          >
            <Heart className={`size-8 transition-transform active:scale-90 ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
            <span className="text-xs text-white/90">{count}</span>
          </button>
          <button onClick={handleShare} className="focus-ring rounded-full p-1" aria-label="Share">
            <Share2 className="size-7 text-white" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
