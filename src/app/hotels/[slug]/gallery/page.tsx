import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { HotelGallery } from "@/components/hotel/HotelGallery";
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
  return buildMetadata({ fallbackTitle: `Gallery | ${hotel.name}`, path: `/hotels/${slug}/gallery` });
}

export default async function HotelGalleryPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) notFound();

  const images = hotel.hotel_galleries ?? [];

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title="Gallery" className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current="/gallery" sections={[]} />
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
