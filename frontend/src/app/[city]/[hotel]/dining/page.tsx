import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug, findHotelPage } from "@/lib/api";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { DiningCard } from "@/components/hotel/DiningCard";
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
  const page = findHotelPage(hotel.hotel_pages, "dining_listing");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Dining | ${hotel.name}`,
    path: `/${city}/${hotelSlug}/dining`,
  });
}

export default async function CityHotelDiningPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "dining_listing");
  const dinings = hotel.dinings ?? [];
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/dining" fallbackTitle="Dining" page={page}>
      {dinings.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {dinings.map((dining) => (
            <DiningCard key={dining.documentId} dining={dining} hotelSlug={hotel.slug} basePath={basePath} />
          ))}
        </div>
      ) : (
        <p className="text-ink/60">Dining information for this hotel is being updated.</p>
      )}
    </CityHotelSectionContent>
  );
}
