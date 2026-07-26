import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug } from "@/lib/api";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ city: string; hotel: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCityHotelParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) return { title: "Not Found" };
  return buildMetadata({ fallbackTitle: `Reviews | ${hotel.name}`, path: `/${city}/${hotelSlug}/reviews` });
}

// No review data model exists in the current schema and `HotelPageSectionKey`
// has no "reviews" value — honest placeholder only, per Phase 4 scope.
export default async function CityHotelReviewsPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/reviews" fallbackTitle="Reviews">
      <p className="text-ink/60">Guest reviews for this hotel are coming soon.</p>
    </CityHotelSectionContent>
  );
}
