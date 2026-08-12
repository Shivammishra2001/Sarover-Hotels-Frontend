import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { HotelDetailView } from "@/components/hotel/HotelDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, hotelJsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllHotelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;

  const hotel = await getHotelBySlug(slug);
  if (!hotel) return { title: "Hotel Not Found" };

  return buildMetadata({
    seo: hotel.seo,
    fallbackTitle: hotel.name,
    fallbackDescription: hotel.description,
    path: `/hotels/${slug}`,
  });
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { slug } = await params;

  const hotel = await getHotelBySlug(slug);

  if (!hotel) notFound();

  return (
    <>
      <JsonLd
        data={[
          hotelJsonLd(hotel),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Hotels", path: "/hotels" },
            { name: hotel.name, path: `/hotels/${hotel.slug}` },
          ]),
        ]}
      />
      <HotelDetailView hotel={hotel} basePath={`/hotels/${hotel.slug}`} />
    </>
  );
}
