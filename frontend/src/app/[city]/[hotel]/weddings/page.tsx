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
  return buildMetadata({ fallbackTitle: `Weddings | ${hotel.name}`, path: `/${city}/${hotelSlug}/weddings` });
}

// `HotelPageSectionKey` has no "weddings" value, so there is no ingested
// content source for this route yet — honest placeholder only, per Phase 4 scope.
export default async function CityHotelWeddingsPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/weddings" fallbackTitle="Weddings">
      <p className="text-ink/60">Wedding packages for this hotel are being updated — check back soon.</p>
    </CityHotelSectionContent>
  );
}
