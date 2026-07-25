import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug, findHotelPage } from "@/lib/api";
import { HotelSectionContent } from "@/components/hotel/HotelSectionContent";
import { BanquetTable } from "@/components/hotel/BanquetTable";
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
  const page = findHotelPage(hotel.hotel_pages, "banquets_listing");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Banquets & Conferences | ${hotel.name}`,
    path: `/hotels/${slug}/banquets`,
  });
}

export default async function HotelBanquetsPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "banquets_listing");
  const banquets = hotel.banquets ?? [];

  return (
    <HotelSectionContent hotel={hotel} current="/banquets" fallbackTitle="Banquets & Conferences" page={page}>
      {banquets.length > 0 ? (
        <BanquetTable banquets={banquets} hotelSlug={hotel.slug} />
      ) : (
        <p className="text-ink/60">Event space details for this hotel are being updated.</p>
      )}
    </HotelSectionContent>
  );
}
