import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { HotelViewAllLink } from "@/components/hotel/HotelViewAllLink";
import { getMediaUrl, humanizeEnum, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Dining, HotelGallery } from "@/types";

// Figma nodes 1285:11173/11174 — full-width image + eyebrow/title/description
// band per dining outlet with a "View Menu" CTA. `Dining` has no image field
// of its own, so this borrows the hotel's own gallery photo tagged
// `category: "dining"` (falling back to no image) rather than inventing one.
export function HotelDining({
  dinings,
  gallery,
  viewAllHref,
}: {
  dinings: Dining[];
  gallery: HotelGallery[];
  viewAllHref?: string;
}) {
  if (dinings.length === 0) return null;

  const diningPhotos = gallery.filter((img) => img.category === "dining");

  return (
    <section id="dining" className="scroll-mt-[150px] bg-[#fafaf5] py-20">
      <Container>
        <HotelSectionHeading eyebrow="Dining" title="Restaurants & Bars" />

        <div className="mt-14 flex flex-col gap-10">
          {dinings.map((dining, index) => {
            const photo = diningPhotos[index % Math.max(diningPhotos.length, 1)];
            return (
              <div
                key={dining.documentId}
                className="grid gap-8 overflow-hidden rounded-[24px] bg-[#0e1b2e] lg:grid-cols-2"
              >
                <div className={`relative aspect-[16/10] lg:aspect-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {photo?.media_url ? (
                    <Image
                      src={getMediaUrl(photo.media_url)}
                      alt={photo.alt_text ?? dining.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized={isUnoptimizedMediaUrl(getMediaUrl(photo.media_url))}
                    />
                  ) : (
                    <div className="h-full w-full bg-navy" />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-5 px-8 py-10 text-white lg:px-4">
                  <div>
                    <p className="eyebrow text-white/70">{humanizeEnum(dining.outlet_type ?? "Dining")}</p>
                    <h3 className="mt-3 font-display text-3xl font-normal">{dining.name}</h3>
                    {dining.cuisine_type && <p className="mt-1 text-white/70">{dining.cuisine_type}</p>}
                  </div>
                  {dining.description && <p className="text-lg leading-relaxed text-white/80">{dining.description}</p>}
                  <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {dining.is_24_hours
                        ? "Open 24 hours"
                        : `${dining.opening_time?.slice(0, 5) ?? ""} – ${dining.closing_time?.slice(0, 5) ?? ""}`}
                    </span>
                    {dining.seating_capacity && (
                      <span className="flex items-center gap-1.5">
                        <Users size={16} />
                        Seats {dining.seating_capacity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {viewAllHref && (
          <div className="mt-10 flex justify-center">
            <HotelViewAllLink href={viewAllHref} label="View All Dining" />
          </div>
        )}
      </Container>
    </section>
  );
}
