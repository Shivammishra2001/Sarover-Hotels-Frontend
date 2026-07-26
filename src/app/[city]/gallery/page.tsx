import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelGallery } from "@/components/hotel/HotelGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) return { title: "Not Found" };

  return buildMetadata({
    fallbackTitle: `Gallery – Hotels in ${destination.name}`,
    fallbackDescription: `Photo gallery of Sarovar hotels in ${destination.name}.`,
    path: `/${city}/gallery`,
  });
}

export default async function GalleryPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const hotels = destination.hotels ?? [];
  const images = hotels.flatMap((hotel) => hotel.hotel_galleries ?? []);

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Gallery", path: `/${city}/gallery/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Gallery" title={`Photos of Hotels in ${destination.name}`} />
        {images.length > 0 ? (
          <div className="mt-10">
            <HotelGallery images={images} limit={24} />
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No gallery images available for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
