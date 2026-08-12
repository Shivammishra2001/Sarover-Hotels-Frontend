import Image from "next/image";
import { Check } from "lucide-react";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

// Figma node 1307:8699/8711 "Why Choose Our Rooms" — brand-wide copy (not
// per-hotel data), reused across hotels the same way the design reuses it
// across destinations; only the last bullet and the photo are parameterised
// with real hotel/destination data.
export function HotelWhyChooseRooms({ city, gallery }: { city?: string; gallery: HotelGallery[] }) {
  const photo = gallery.find((img) => img.category === "room") ?? gallery[0];
  const features = [
    "Spacious Interiors",
    "Contemporary Design",
    "Business Friendly",
    "Family Friendly",
    city ? `Prime ${city} Location` : "Prime Location",
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="flex flex-col gap-6">
        <div>
          <p className="eyebrow text-accent">Experience</p>
          <h2 className="mt-3 font-display text-3xl font-normal text-[#2d3e50] sm:text-4xl">Why Choose Our Rooms</h2>
        </div>
        <p className="text-lg leading-relaxed text-[#2d3e50]/80">
          Relax in stylish, well-appointed rooms featuring modern amenities, plush comfort, and warm hospitality
          for an unforgettable stay.
        </p>
        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-base text-[#2d3e50]">
              <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check size={14} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {photo?.media_url && (
        <div className="relative aspect-[800/538] overflow-hidden rounded-[24px]">
          <Image
            src={getMediaUrl(photo.media_url)}
            alt={photo.alt_text ?? "Room interior"}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(photo.media_url))}
          />
        </div>
      )}
    </div>
  );
}
