"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery as HotelGalleryType } from "@/types";

export function HotelGallery({ images, limit = 8 }: { images: HotelGalleryType[]; limit?: number }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;
  const visible = images.slice(0, limit);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visible.map((image, index) => (
          <button
            key={image.documentId}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded-xl ${
              index === 0 && visible.length > 1
                ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                : index === 0
                  ? "col-span-2 aspect-[21/9] sm:col-span-4"
                  : "aspect-square"
            }`}
          >
            <Image
              src={getMediaUrl(image.media_url)}
              alt={image.alt_text ?? "Hotel gallery image"}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized={isUnoptimizedMediaUrl(getMediaUrl(image.media_url))}
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-6 top-6 text-white"
            onClick={() => setActiveIndex(null)}
          >
            <X size={28} />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image
              src={getMediaUrl(visible[activeIndex].media_url)}
              alt={visible[activeIndex].alt_text ?? "Hotel gallery image"}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized={isUnoptimizedMediaUrl(getMediaUrl(visible[activeIndex].media_url))}
            />
          </div>
        </div>
      )}
    </>
  );
}
