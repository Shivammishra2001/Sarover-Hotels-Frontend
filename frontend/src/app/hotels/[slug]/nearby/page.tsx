import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { NearbyList } from "@/components/hotel/NearbyList";
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
  return buildMetadata({ fallbackTitle: `Nearby Attractions | ${hotel.name}`, path: `/hotels/${slug}/nearby` });
}

export default async function HotelNearbyPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const attractions = hotel.attractions ?? [];

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title="Nearby Attractions" className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current="/nearby" sections={[]} />
        </div>
        <div className="mt-10">
          {attractions.length > 0 ? (
            <NearbyList hotelSlug={hotel.slug} attractions={attractions} />
          ) : (
            <p className="text-ink/60">Nearby attraction guides for this hotel are coming soon.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
