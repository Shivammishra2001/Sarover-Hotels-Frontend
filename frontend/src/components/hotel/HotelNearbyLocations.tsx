import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { AttractionIcon } from "@/lib/attractionIcon";
import type { Attraction, Destination } from "@/types";

// Figma nodes 1284:3570 "Nearby Locations" + 1285:5672 "Business Optimized
// Location". The design's two curated image cards ("Corporate & Business
// Hubs" / "Popular Tourist Attractions") are Jaipur-specific marketing copy
// with no CMS equivalent, so those two blurbs are written generically
// (parameterised by destination name) rather than inventing hotel-specific
// business claims; the location list itself uses real `Attraction` records.
export function HotelNearbyLocations({
  attractions,
  destination,
  latitude,
  longitude,
}: {
  attractions: Attraction[];
  destination?: Destination;
  latitude?: number;
  longitude?: number;
}) {
  if (attractions.length === 0 && !destination) return null;

  const mid = Math.ceil(attractions.length / 2);
  const columns = [attractions.slice(0, mid), attractions.slice(mid)];
  const mapHref =
    latitude && longitude ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}` : undefined;

  return (
    <section id="location" className="scroll-mt-[150px] bg-[#fafaf5] py-20">
      <Container>
        <HotelSectionHeading eyebrow="Getting Around" title="Nearby Locations" />

        {attractions.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-4xl gap-x-16 gap-y-4 sm:grid-cols-2">
            {columns.map((column, i) => (
              <div key={i} className="flex flex-col divide-y divide-border">
                {column.map((attraction) => (
                  <div key={attraction.slug} className="flex items-center justify-between gap-4 py-3">
                    <span className="flex items-center gap-3 text-[#2d3e50]">
                      <AttractionIcon category={attraction.category} className="text-accent" />
                      {attraction.name}
                    </span>
                    {typeof attraction.distance_km === "number" && (
                      <span className="shrink-0 text-sm text-[#2d3e50]/70">{attraction.distance_km} km</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {mapHref && (
          <div className="mt-8 flex justify-center">
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="flex h-[52px] items-center gap-2 rounded-full border border-[#2d3e50]/20 px-8 text-sm font-semibold uppercase tracking-wide text-[#2d3e50] hover:bg-white"
            >
              <MapPin size={18} />
              View on Map
            </a>
          </div>
        )}

        {destination && (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[24px] border border-[#eae4dc] bg-white p-8">
              <h3 className="font-display text-xl font-semibold text-[#2d3e50]">Corporate & Business Hubs</h3>
              <p className="mt-3 text-base leading-relaxed text-[#2d3e50]/80">
                Well connected to {destination.city}&apos;s major business and transit hubs, making this hotel a
                convenient base for corporate visits.
              </p>
            </div>
            <div className="rounded-[24px] border border-[#eae4dc] bg-white p-8">
              <h3 className="font-display text-xl font-semibold text-[#2d3e50]">Popular Tourist Attractions</h3>
              <p className="mt-3 text-base leading-relaxed text-[#2d3e50]/80">
                {destination.description ??
                  `${destination.name} is home to a range of sightseeing and cultural landmarks, many within easy reach of the hotel.`}
              </p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
