"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

export function EditorialBand({
  images = [],
  totalHotels,
  totalDestinations,
}: {
  images?: HotelGallery[];
  totalHotels?: number;
  totalDestinations?: number;
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [mainImage, thumbImage] = images;
  const scaleCopy =
    totalHotels && totalDestinations
      ? `With ${totalHotels} hotels across ${totalDestinations} destinations in India, Nepal, and Africa, `
      : "Across India, Nepal, and Africa, ";

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
          <HomeSectionHeading align="left" eyebrow="Sarovar Hotels & Resorts" title="Stay Inspired. Stay Delighted. Stay Happy." />
          <p className="mt-6 max-w-[790px] text-lg font-medium leading-[2] tracking-[-0.2px] text-[#2d3e50]/90 lg:text-[23px]">
            {scaleCopy}Sarovar blends warm hospitality with modern comfort. Each property
            reflects its local charm while delivering consistent quality, thoughtful service,
            and well-appointed stays for business and leisure travelers alike.
          </p>
          <p className="mt-6 max-w-[790px] text-lg font-medium leading-[2] tracking-[-0.2px] text-[#2d3e50]/90 lg:text-[23px]">
            From vibrant city hubs to serene retreats, every Sarovar stay is designed to be
            welcoming, convenient, and reliably delightful—wherever your journey takes you.
          </p>
          <p className="mt-6 max-w-[790px] font-display text-lg italic leading-[2] text-[#2d3e50] lg:text-[23px]">
            Come explore the world of convenience and comfort!
          </p>
          <div className="mt-8">
            <HomeCtaButton href="/hotels">Explore More</HomeCtaButton>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-navy shadow-lg">
            {mainImage?.media_url && (
              <Image
                src={getMediaUrl(mainImage.media_url)}
                alt={mainImage.alt_text ?? "A Sarovar hotel exterior"}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImage.media_url))}
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play hotel showcase video"
            className="group absolute -bottom-8 left-0 aspect-[4/3] w-2/5 overflow-hidden rounded-xl bg-navy shadow-xl"
          >
            {thumbImage?.media_url && (
              <Image
                src={getMediaUrl(thumbImage.media_url)}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(thumbImage.media_url))}
              />
            )}
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
