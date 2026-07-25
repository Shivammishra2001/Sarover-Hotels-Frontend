import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotelBySlug, findHotelPageByPathSegment } from "@/lib/api";
import { HotelSectionContent } from "@/components/hotel/HotelSectionContent";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string; section: string[] }>;
}

export const revalidate = 3600;

/**
 * Fallback for the long-tail hotel sub-pages that don't fit a named section
 * (weddings, day-use, corporate-travel-agent pages, etc. — ~199 of these,
 * folded into hotel-page with section_key="other" during ingestion). Named
 * routes (location/, amenities/, rooms/, ...) are literal folders and take
 * precedence over this catch-all automatically.
 */
// No generateStaticParams here: reconstructing the exact multi-segment path
// for each of the ~199 long-tail "other" hotel-pages ahead of time would need
// a second full query per hotel just to enumerate segments. Left dynamic —
// Next.js renders on first request and caches per `revalidate` (ISR).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, section } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return { title: "Not Found" };
  const page = findHotelPageByPathSegment(hotel.hotel_pages, section[section.length - 1]);
  if (!page) return { title: "Not Found" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title || hotel.name,
    path: `/hotels/${slug}/${section.join("/")}`,
  });
}

export default async function HotelOtherSectionPage({ params }: Props) {
  const { slug, section } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const page = findHotelPageByPathSegment(hotel.hotel_pages, section[section.length - 1]);
  if (!page) notFound();

  return (
    <HotelSectionContent hotel={hotel} current={`/${section.join("/")}`} fallbackTitle={page.title || hotel.name} page={page} />
  );
}
