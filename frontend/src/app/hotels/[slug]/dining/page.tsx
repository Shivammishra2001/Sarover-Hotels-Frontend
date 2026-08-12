import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { HotelHero } from "@/components/hotel/HotelHero";
import { HotelPageNav } from "@/components/hotel/HotelPageNav";
import { HotelDining } from "@/components/hotel/HotelDining";
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
  return buildMetadata({ fallbackTitle: `Dining | ${hotel.name}`, path: `/hotels/${slug}/dining` });
}

// Same hero + page-nav treatment as /rooms (Figma node 1301:2470's sibling
// sub-pages share this shell), with the real Dining data rendered through
// the same image+text band component used on the main hotel page.
export default async function HotelDiningPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const dinings = hotel.dinings ?? [];
  const gallery = hotel.hotel_galleries ?? [];
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
      <HotelPageNav links={navLinks} current={`${basePath}/dining`} />

      {dinings.length > 0 ? (
        <HotelDining dinings={dinings} gallery={gallery} />
      ) : (
        <section className="bg-white py-20">
          <Container>
            <p className="text-center text-[#2d3e50]/60">Dining information for this hotel is being updated.</p>
          </Container>
        </section>
      )}
    </div>
  );
}
