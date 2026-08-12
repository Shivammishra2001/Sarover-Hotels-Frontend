import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Attraction, Destination } from "@/types";

// Figma nodes 1261:13405 (city intro) + 1274:3524 etc. ("Top Experiences").
// The design's curated experience copy is city-specific marketing text with
// no CMS equivalent — this uses the real `Attraction` records instead
// (name, description, image, distance_km only; there's no duration field).
export function HotelExplore({
  destination,
  attractions,
}: {
  destination?: Destination;
  attractions: Attraction[];
}) {
  if (!destination && attractions.length === 0) return null;

  // "Top Experiences" is the photo-forward showcase — only attractions with
  // a real image earn a card here; the full list (photo or not) still shows
  // in the compact Nearby Locations list elsewhere on the page.
  const withPhotos = attractions.filter((a) => a.image_url).slice(0, 8);

  return (
    <section id="explore" className="scroll-mt-[150px] bg-white py-20">
      <Container>
        {destination && (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <p className="eyebrow text-accent">Discover {destination.city}</p>
              <h2 className="font-display text-3xl font-normal text-[#2d3e50] sm:text-4xl">
                Explore {destination.name}
              </h2>
              {destination.description && (
                <p className="text-lg leading-relaxed text-[#2d3e50]/80">{destination.description}</p>
              )}
            </div>
            {destination.hero_image_url && (
              <div className="relative aspect-[776/442] overflow-hidden rounded-[24px]">
                <Image
                  src={getMediaUrl(destination.hero_image_url)}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(destination.hero_image_url))}
                />
              </div>
            )}
          </div>
        )}

        {withPhotos.length > 0 && (
          <div className="mt-16">
            <h3 className="text-center font-display text-2xl font-normal text-[#2d3e50] sm:text-3xl">
              Top Experiences in {destination?.city ?? "the Area"}
            </h3>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {withPhotos.map((attraction) => (
                <div
                  key={attraction.slug}
                  className="overflow-hidden rounded-[24px] border border-[#eae4dc] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="relative aspect-[378/240] w-full bg-muted">
                    {attraction.image_url && (
                      <Image
                        src={getMediaUrl(attraction.image_url)}
                        alt={attraction.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                        unoptimized={isUnoptimizedMediaUrl(getMediaUrl(attraction.image_url))}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <p className="font-display text-xl font-semibold text-[#1e1e1e]">{attraction.name}</p>
                    {typeof attraction.distance_km === "number" && (
                      <span className="flex items-center gap-2 text-sm text-[#2d3e50]/80">
                        <MapPin size={16} />
                        {attraction.distance_km} km away
                      </span>
                    )}
                    {attraction.description && (
                      <p className="text-sm leading-relaxed text-[#2d3e50]/80">{attraction.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
