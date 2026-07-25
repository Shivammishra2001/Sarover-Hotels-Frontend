"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export function FullBleedBanner() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      className="relative flex h-[55vh] min-h-[420px] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(https://picsum.photos/seed/atmospheric-banner/1920/900)" }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <button
        type="button"
        onClick={() => setVideoOpen(true)}
        aria-label="Play resort showcase video"
        className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white/10"
      >
        <span className="absolute h-24 w-24 animate-ping rounded-full border border-white/60" />
        <Play size={28} className="ml-1 fill-white" />
      </button>

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
            <p className="font-display text-lg font-semibold text-navy">Video coming soon</p>
            <p className="mt-2 text-sm text-ink/60">
              Our resort showcase video is being finalized — check back shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
