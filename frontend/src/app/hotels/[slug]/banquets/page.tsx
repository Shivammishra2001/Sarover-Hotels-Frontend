import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { HotelHero } from "@/components/hotel/HotelHero";
import { HotelPageNav } from "@/components/hotel/HotelPageNav";
import { HotelBanquets } from "@/components/hotel/HotelBanquets";
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
  return buildMetadata({ fallbackTitle: `Banquets & Conferences | ${hotel.name}`, path: `/hotels/${slug}/banquets` });
}

// Same hero + page-nav shell as /rooms and /dining, with the real Banquet
// data rendered through the "Plan Your Events with Us" band (Figma node
// 1297:788) already built for the main hotel-overview page.
export default async function HotelBanquetsPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const banquets = hotel.banquets ?? [];
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
      <HotelPageNav links={navLinks} current={`${basePath}/banquets`} />

      {banquets.length > 0 ? (
        <HotelBanquets banquets={banquets} basePath={basePath} />
      ) : (
        <section className="bg-white py-20">
          <Container>
            <p className="text-center text-[#2d3e50]/60">Event space details for this hotel are being updated.</p>
          </Container>
        </section>
      )}
    </div>
  );
}
