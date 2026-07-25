import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAttractionBySlug, getAllAttractionParams } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { getMediaUrl } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string; attraction: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const params = await getAllAttractionParams();
  return params.map((p) => ({ slug: p.hotel, attraction: p.attraction }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, attraction: attractionSlug } = await params;
  const attraction = await getAttractionBySlug(slug, attractionSlug);
  if (!attraction) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: `${attraction.name} | ${attraction.hotel?.name ?? ""}`,
    fallbackDescription: attraction.description,
    path: `/hotels/${slug}/nearby/${attractionSlug}`,
  });
}

export default async function AttractionDetailPage({ params }: Props) {
  const { slug, attraction: attractionSlug } = await params;
  const attraction = await getAttractionBySlug(slug, attractionSlug);
  if (!attraction || !attraction.hotel) notFound();

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{attraction.hotel.name}</p>
        <SectionHeading title={attraction.name} className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={slug} current="/nearby" sections={[]} />
        </div>

        <div className="mt-10 max-w-3xl space-y-6">
          {attraction.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getMediaUrl(attraction.image_url)}
              alt={attraction.name}
              loading="lazy"
              className="aspect-video w-full rounded-xl object-cover"
            />
          )}
          {attraction.distance_km && (
            <p className="text-sm uppercase tracking-wide text-ink/50">{attraction.distance_km} km from the hotel</p>
          )}
          {attraction.description && (
            <p className="text-base leading-relaxed text-ink/70">{attraction.description}</p>
          )}
        </div>
      </Container>
    </div>
  );
}
