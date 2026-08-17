"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { getMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Homepage } from "@/types";

// The full-bleed video-teaser band ("Video" section in Content Manager ->
// Homepage). `fallbackImage` is an already-fetched real gallery photo passed
// in from app/page.tsx, used only until an operator sets a dedicated
// background_image on the Video section itself.
export function FullBleedBanner({
  content,
  fallbackImage,
}: {
  content?: Homepage;
  fallbackImage?: string;
}) {
  const [videoOpen, setVideoOpen] = useState(false);

  if (content?.video_modal?.is_enabled === false) return null;

  const imageSrc = pickMediaUrl(content?.video_modal?.background_image, undefined) ?? fallbackImage;
  const bgUrl = imageSrc ? getMediaUrl(imageSrc) : undefined;
  const videoUrl = content?.video_modal?.video_url;
  const videoModalHeading = content?.video_modal?.heading ?? "Video coming soon";
  const videoModalBody =
    content?.video_modal?.body ?? "Our showcase video is being finalized — check back shortly.";

  return (
    <section
      className="relative flex h-[55vh] min-h-[420px] items-center justify-center bg-navy bg-cover bg-center"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <div className="absolute inset-0 bg-black/20" />

      {videoUrl ? (
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Play resort showcase video"
          className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
        >
          <span className="absolute h-24 w-24 animate-ping rounded-full border border-white/60" />
          <Play size={28} className="ml-1 fill-white" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          aria-label="Play resort showcase video"
          className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
        >
          <span className="absolute h-24 w-24 animate-ping rounded-full border border-white/60" />
          <Play size={28} className="ml-1 fill-white" />
        </button>
      )}

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-surface p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              onClick={() => setVideoOpen(false)}
            >
              <X size={20} />
            </button>
            <p className="font-display text-lg font-semibold text-navy">{videoModalHeading}</p>
            <p className="mt-2 text-sm text-ink/60">{videoModalBody}</p>
          </div>
        </div>
      )}
    </section>
  );
}
