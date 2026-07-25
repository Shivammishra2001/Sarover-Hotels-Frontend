"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function EditorialBand() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      {/* Decorative geometric watermark — purely presentational */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 text-navy/5"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="250" cy="150" r="150" stroke="currentColor" />
        <path d="M100 300 L250 150 L340 260 L200 380 Z" stroke="currentColor" />
        <path d="M180 20 L340 260" stroke="currentColor" />
      </svg>

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-ink/60">Sarovar Hotels &amp; Resorts</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-navy sm:text-4xl">
            Stay Inspired. Stay Delighted. Stay Happy.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70">
            With 149 hotels across 87 destinations in India, Nepal, and Africa, Sarovar blends
            warm hospitality with modern comfort. Each property reflects its local charm while
            delivering consistent quality, thoughtful service, and well-appointed stays for
            business and leisure travelers alike.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/70">
            From vibrant city hubs to serene retreats, every Sarovar stay is designed to be
            welcoming, convenient, and reliably delightful—wherever your journey takes you.
          </p>
          <p className="mt-6 font-display italic text-navy">
            Come explore the world of convenience and comfort!
          </p>
          <div className="mt-8">
            <Button href="/hotels" variant="primary" className="uppercase tracking-wide">
              Explore More
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://picsum.photos/seed/editorial-sanctuary/1000/900"
              alt="A Sarovar hotel exterior at dusk"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play hotel showcase video"
            className="group absolute -bottom-8 left-0 aspect-[4/3] w-2/5 overflow-hidden rounded-xl shadow-xl"
          >
            <Image
              src="https://picsum.photos/seed/editorial-video-thumb/500/400"
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute h-12 w-12 animate-ping rounded-full border border-white/70" />
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white">
                <Play size={16} className="ml-0.5 fill-white" />
              </span>
            </span>
          </button>
        </div>
      </Container>

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
              Our hotel showcase video is being finalized — check back shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
