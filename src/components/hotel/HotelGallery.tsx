"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";
import type { HotelGallery as HotelGalleryType } from "@/types";

export function HotelGallery({ images }: { images: HotelGalleryType[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.slice(0, 8).map((image, index) => (
          <button
            key={image.documentId}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-xl ${
              index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : ""
            }`}
          >
            <Image
              src={getMediaUrl(image.media_url)}
              alt={image.alt_text ?? "Hotel gallery image"}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
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
              src={getMediaUrl(images[activeIndex].media_url)}
              alt={images[activeIndex].alt_text ?? "Hotel gallery image"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
