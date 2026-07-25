import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import type { Hotel, HotelPage } from "@/types";

const HOTEL_SECTIONS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Banquets", href: "/banquets" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Amenities", href: "/amenities" },
  { label: "Nearby", href: "/nearby" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function HotelSectionContent({
  hotel,
  current,
  fallbackTitle,
  page,
  children,
}: {
  hotel: Hotel;
  current: string;
  fallbackTitle: string;
  page?: HotelPage;
  children?: React.ReactNode;
}) {
  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        {/* Ingested page.title is often the full scraped <title>/<h1> text
            (already includes the hotel name) — the clean fallback label
            reads better as an on-page heading than that raw scraped string. */}
        <SectionHeading title={fallbackTitle} className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current={current} sections={HOTEL_SECTIONS} />
        </div>
        <div className="mt-10 space-y-10">
          {page?.body && <BlockRenderer blocks={page.body} />}
          {children}
        </div>
      </Container>
    </div>
  );
}
