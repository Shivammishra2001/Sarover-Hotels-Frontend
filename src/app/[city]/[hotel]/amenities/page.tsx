import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug, findHotelPage } from "@/lib/api";
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
  const page = findHotelPage(hotel.hotel_pages, "amenities");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Amenities | ${hotel.name}`,
    path: `/${city}/${hotelSlug}/amenities`,
  });
}

export default async function CityHotelAmenitiesPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "amenities");
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/amenities" fallbackTitle="Amenities" page={page}>
      {!page && <p className="text-ink/60">Amenity details for this hotel are being updated — check back soon.</p>}
    </CityHotelSectionContent>
  );
}
