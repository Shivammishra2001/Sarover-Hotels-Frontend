import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug, findHotelPage } from "@/lib/api";
import { HotelSectionContent } from "@/components/hotel/HotelSectionContent";
import { DiningCard } from "@/components/hotel/DiningCard";
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
  const page = findHotelPage(hotel.hotel_pages, "dining_listing");
  return buildMetadata({ seo: page?.seo, fallbackTitle: `Dining | ${hotel.name}`, path: `/hotels/${slug}/dining` });
}

export default async function HotelDiningPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "dining_listing");
  const dinings = hotel.dinings ?? [];

  return (
    <HotelSectionContent hotel={hotel} current="/dining" fallbackTitle="Dining" page={page}>
      {dinings.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {dinings.map((dining) => (
            <DiningCard key={dining.documentId} dining={dining} hotelSlug={hotel.slug} />
          ))}
        </div>
      ) : (
        <p className="text-ink/60">Dining information for this hotel is being updated.</p>
      )}
    </HotelSectionContent>
  );
}
