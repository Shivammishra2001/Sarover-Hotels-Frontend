"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Homepage, HotelGallery } from "@/types";

export function EditorialBand({
  images = [],
  totalHotels,
  totalDestinations,
  content,
}: {
  images?: HotelGallery[];
  totalHotels?: number;
  totalDestinations?: number;
  content?: Homepage;
}) {
  const [videoOpen, setVideoOpen] = useState(false);

  if (content?.editorial?.is_enabled === false) return null;

  const [mainImage, thumbImage] = images;
  // Prefer an operator-chosen image (Content Manager -> Homepage -> Editorial)
  // over the arbitrary gallery-sample photo passed in as a fallback.
  const mainImageSrc =
    pickMediaUrl(content?.editorial?.main_image, undefined) ?? pickMediaUrl(mainImage?.media, mainImage?.media_url);
  const thumbImageSrc =
    pickMediaUrl(content?.editorial?.thumb_image, undefined) ?? pickMediaUrl(thumbImage?.media, thumbImage?.media_url);
  const scaleCopy =
    totalHotels && totalDestinations
      ? `With ${totalHotels} hotels across ${totalDestinations} destinations in India, Nepal, and Africa, `
      : "Across India, Nepal, and Africa, ";

  const eyebrow = content?.editorial?.eyebrow ?? "Sarovar Hotels & Resorts";
  const title = content?.editorial?.title ?? "Stay Inspired. Stay Delighted. Stay Happy.";
  const bodyParagraphs = (
    content?.editorial?.body ??
    "Sarovar blends warm hospitality with modern comfort. Each property reflects its local charm while delivering consistent quality, thoughtful service, and well-appointed stays for business and leisure travelers alike.\n\nFrom vibrant city hubs to serene retreats, every Sarovar stay is designed to be welcoming, convenient, and reliably delightful—wherever your journey takes you."
  ).split("\n\n");
  const tagline = content?.editorial?.tagline ?? "Come explore the world of convenience and comfort!";
  const ctaLabel = content?.editorial?.cta_label ?? "Explore More";
  const videoModalHeading = content?.video_modal?.heading ?? "Video coming soon";
  const videoModalBody =
    content?.video_modal?.body ?? "Our showcase video is being finalized — check back shortly.";

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
          <HomeSectionHeading align="left" eyebrow={eyebrow} title={title} />
          {bodyParagraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className="mt-6 max-w-[790px] text-lg font-medium leading-[2] tracking-[-0.2px] text-[#2d3e50]/90 lg:text-[23px]"
            >
              {index === 0 ? scaleCopy : null}
              {paragraph}
            </p>
          ))}
          <p className="mt-6 max-w-[790px] font-display text-lg italic leading-[2] text-[#2d3e50] lg:text-[23px]">
            {tagline}
          </p>
          <div className="mt-8">
            <HomeCtaButton href="/hotels">{ctaLabel}</HomeCtaButton>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-navy shadow-lg">
            {mainImageSrc && (
              <Image
                src={getMediaUrl(mainImageSrc)}
                alt={mainImage?.alt_text ?? "A Sarovar hotel exterior"}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImageSrc))}
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play hotel showcase video"
            className="group absolute -bottom-8 left-0 aspect-[4/3] w-2/5 overflow-hidden rounded-xl bg-navy shadow-xl"
          >
            {thumbImageSrc && (
              <Image
                src={getMediaUrl(thumbImageSrc)}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(thumbImageSrc))}
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
            <p className="font-display text-lg font-semibold text-navy">{videoModalHeading}</p>
            <p className="mt-2 text-sm text-ink/60">{videoModalBody}</p>
          </div>
        </div>
      )}
    </section>
  );
}
