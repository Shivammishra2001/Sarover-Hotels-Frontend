import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CityHotelSectionNav } from "@/components/hotel/CityHotelSectionNav";
import { CITY_HOTEL_SECTIONS } from "@/components/hotel/CityHotelSectionContent";
import { HotelGallery } from "@/components/hotel/HotelGallery";
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
  return buildMetadata({ fallbackTitle: `Gallery | ${hotel.name}`, path: `/${city}/${hotelSlug}/gallery` });
}

export default async function CityHotelGalleryPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const images = hotel.hotel_galleries ?? [];
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title="Gallery" className="mt-2" />
        <div className="mt-8">
          <CityHotelSectionNav basePath={basePath} current="/gallery" sections={CITY_HOTEL_SECTIONS} />
        </div>
        <div className="mt-10">
          {images.length > 0 ? (
            <HotelGallery images={images} limit={48} />
          ) : (
            <p className="text-ink/60">Photos for this hotel are being updated.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
