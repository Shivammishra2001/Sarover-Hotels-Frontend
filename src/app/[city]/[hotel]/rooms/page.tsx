import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug, findHotelPage } from "@/lib/api";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { RoomCard } from "@/components/hotel/RoomCard";
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
  const page = findHotelPage(hotel.hotel_pages, "rooms_listing");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Rooms & Suites | ${hotel.name}`,
    path: `/${city}/${hotelSlug}/rooms`,
  });
}

export default async function CityHotelRoomsPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "rooms_listing");
  const rooms = hotel.rooms ?? [];
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/rooms" fallbackTitle="Rooms & Suites" page={page}>
      {rooms.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.documentId} room={room} hotelSlug={hotel.slug} basePath={basePath} />
          ))}
        </div>
      ) : (
        <p className="text-ink/60">Room details for this hotel are being updated.</p>
      )}
    </CityHotelSectionContent>
  );
}
