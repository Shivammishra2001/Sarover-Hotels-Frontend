import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug, findHotelPage } from "@/lib/api";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { BanquetTable } from "@/components/hotel/BanquetTable";
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
  const page = findHotelPage(hotel.hotel_pages, "meetings");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Meetings & Banquets | ${hotel.name}`,
    path: `/${city}/${hotelSlug}/meetings`,
  });
}

export default async function CityHotelMeetingsPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "meetings");
  const banquets = hotel.banquets ?? [];
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/meetings" fallbackTitle="Meetings & Banquets" page={page}>
      {banquets.length > 0 ? (
        // No per-hall detail route exists under the city tree yet, so
        // hotelSlug/basePath are omitted here — rows render name-only, unlinked.
        <BanquetTable banquets={banquets} />
      ) : (
        <p className="text-ink/60">Event space details for this hotel are being updated.</p>
      )}
    </CityHotelSectionContent>
  );
}
