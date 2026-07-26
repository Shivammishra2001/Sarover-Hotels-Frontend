import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CityHotelSectionNav } from "@/components/hotel/CityHotelSectionNav";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import type { Hotel, HotelPage } from "@/types";

export const CITY_HOTEL_SECTIONS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Meetings", href: "/meetings" },
  { label: "Weddings", href: "/weddings" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Amenities", href: "/amenities" },
  { label: "Experiences", href: "/experiences" },
  { label: "Offers", href: "/offers" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faqs" },
  { label: "Book", href: "/book" },
];

/** City-tree analog of HotelSectionContent — same shell (eyebrow, heading, nav,
 * dynamic-zone body, children), parameterized on `basePath` instead of a
 * `/hotels/{slug}` prefix so it can render under `/{city}/{hotel}/...`. */
export function CityHotelSectionContent({
  hotel,
  basePath,
  current,
  fallbackTitle,
  page,
  children,
}: {
  hotel: Hotel;
  basePath: string;
  current: string;
  fallbackTitle: string;
  page?: HotelPage;
  children?: React.ReactNode;
}) {
  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title={fallbackTitle} className="mt-2" />
        <div className="mt-8">
          <CityHotelSectionNav basePath={basePath} current={current} sections={CITY_HOTEL_SECTIONS} />
        </div>
        <div className="mt-10 space-y-10">
          {page?.body && <BlockRenderer blocks={page.body} />}
          {children}
        </div>
      </Container>
    </div>
  );
}
