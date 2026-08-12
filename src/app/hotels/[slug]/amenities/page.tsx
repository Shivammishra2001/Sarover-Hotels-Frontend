import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { HotelHero } from "@/components/hotel/HotelHero";
import { HotelPageNav } from "@/components/hotel/HotelPageNav";
import { HotelFacilities } from "@/components/hotel/HotelFacilities";
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
  return buildMetadata({ fallbackTitle: `Amenities | ${hotel.name}`, path: `/hotels/${slug}/amenities` });
}

// Same hero + page-nav shell as /rooms, /dining and /banquets, with real
// amenities (aggregated across rooms) rendered through the "Hotel
// Facilities" icon grid (Figma node 1274:3390) already built for the main
// hotel-overview page.
export default async function HotelAmenitiesPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const amenities = (hotel.rooms ?? []).flatMap((room) => room.amenities ?? []);
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
      <HotelPageNav links={navLinks} current={`${basePath}/amenities`} />

      {amenities.length > 0 ? (
        <HotelFacilities amenities={amenities} id="amenities" />
      ) : (
        <section className="bg-white py-20">
          <Container>
            <p className="text-center text-[#2d3e50]/60">Amenity details for this hotel are being updated.</p>
          </Container>
        </section>
      )}
    </div>
  );
}
