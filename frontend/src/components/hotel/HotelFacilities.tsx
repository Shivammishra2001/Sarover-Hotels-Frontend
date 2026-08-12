import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { HotelViewAllLink } from "@/components/hotel/HotelViewAllLink";
import { AmenityIcon } from "@/lib/amenityIcon";
import type { Amenity } from "@/types";

// Figma node 1274:3390 "Hotel Facilities" — icon-card grid. The CMS has no
// hotel-level facilities list (only Room.amenities), so this dedupes
// amenities across every room by slug and caps the grid like the design's
// 10-item, 2-row layout.
export function HotelFacilities({
  amenities,
  eyebrow = "Hotel Facilities",
  title = "Everything You Need for a Comfortable Stay",
  id = "facilities",
  viewAllHref,
}: {
  amenities: Amenity[];
  eyebrow?: string;
  title?: string;
  id?: string;
  viewAllHref?: string;
}) {
  const seen = new Map<string, Amenity>();
  for (const amenity of amenities) {
    if (!seen.has(amenity.slug)) seen.set(amenity.slug, amenity);
  }
  const unique = Array.from(seen.values()).slice(0, 10);

  if (unique.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-[150px] bg-[#fafaf5] py-20">
      <Container>
        <HotelSectionHeading eyebrow={eyebrow} title={title} />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {unique.map((amenity) => (
            <div
              key={amenity.slug}
              className="flex flex-col items-center gap-4 rounded-2xl border border-[#eae4dc] bg-white px-4 py-8 text-center shadow-[4px_4px_36px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="flex size-[80px] items-center justify-center rounded-2xl bg-[#fafaf5] text-accent">
                <AmenityIcon category={amenity.category} size={34} />
              </div>
              <p className="text-base font-medium leading-tight text-[#192128]">{amenity.name}</p>
            </div>
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-10 flex justify-center">
            <HotelViewAllLink href={viewAllHref} label="View All Facilities" />
          </div>
        )}
      </Container>
    </section>
  );
}
