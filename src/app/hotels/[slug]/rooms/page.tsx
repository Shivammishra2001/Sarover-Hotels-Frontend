import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug, findHotelPage } from "@/lib/api";
import { HotelSectionContent } from "@/components/hotel/HotelSectionContent";
import { RoomCard } from "@/components/hotel/RoomCard";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllHotelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return { title: "Not Found" };
  const page = findHotelPage(hotel.hotel_pages, "rooms_listing");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Rooms & Suites | ${hotel.name}`,
    path: `/hotels/${slug}/rooms`,
  });
}

export default async function HotelRoomsPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "rooms_listing");
  const rooms = hotel.rooms ?? [];

  return (
    <HotelSectionContent hotel={hotel} current="/rooms" fallbackTitle="Rooms & Suites" page={page}>
      {rooms.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.documentId} room={room} hotelSlug={hotel.slug} />
          ))}
        </div>
      ) : (
        <p className="text-ink/60">Room details for this hotel are being updated.</p>
      )}
    </HotelSectionContent>
  );
}
