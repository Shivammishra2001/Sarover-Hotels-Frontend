import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug, findHotelPage } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { HotelHero } from "@/components/hotel/HotelHero";
import { HotelPageNav } from "@/components/hotel/HotelPageNav";
import { HotelRoomTypeCards } from "@/components/hotel/HotelRoomTypeCards";
import { HotelFacilities } from "@/components/hotel/HotelFacilities";
import { HotelWhyChooseRooms } from "@/components/hotel/HotelWhyChooseRooms";
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

// Figma node 1301:2470 "Rooms" — same hero as the hotel-overview page, a
// featured room-type card grid, the shared room-amenities grid, and a
// "Why Choose Our Rooms" band. Restyled to match; still real, CMS-backed
// room data throughout (see HotelRoomTypeCards' notes on the two fields
// Figma's meta row shows that aren't in the schema).
export default async function HotelRoomsPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const rooms = hotel.rooms ?? [];
  const gallery = hotel.hotel_galleries ?? [];
  const amenities = rooms.flatMap((room) => room.amenities ?? []);
  const basePath = `/hotels/${hotel.slug}`;

  const navLinks = [
    { href: basePath, label: hotel.name },
    { href: `${basePath}/rooms`, label: "Rooms" },
    { href: `${basePath}/dining`, label: "Dining" },
    { href: `${basePath}/banquets`, label: "Banquets & Conferences" },
    { href: `${basePath}/amenities`, label: "Facilities" },
    { href: `${basePath}/gallery`, label: "Gallery" },
    { href: `${basePath}/nearby`, label: `Explore ${hotel.destination?.city ?? ""}`.trim() },
  ];

  return (
    <div className="pb-20">
      <HotelHero hotel={hotel} basePath={basePath} />
      <HotelPageNav links={navLinks} current={`${basePath}/rooms`} />

      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-normal text-[#2d3e50] sm:text-4xl">
              Rooms at {hotel.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#2d3e50]/80">
              Stay in spacious, modern rooms at {hotel.name}, featuring elegant interiors, contemporary
              amenities, and warm hospitality for a truly comfortable and memorable experience.
            </p>
          </div>

          <div className="mt-14">
            {rooms.length > 0 ? (
              <HotelRoomTypeCards rooms={rooms} gallery={gallery} basePath={basePath} />
            ) : (
              <p className="text-center text-[#2d3e50]/60">Room details for this hotel are being updated.</p>
            )}
          </div>
        </Container>
      </section>

      <HotelFacilities amenities={amenities} eyebrow="Room Amenities" title="What Every Room Includes" id="room-amenities" />

      <section className="bg-white py-20">
        <Container>
          <HotelWhyChooseRooms city={hotel.destination?.city} gallery={gallery} />
        </Container>
      </section>
    </div>
  );
}
