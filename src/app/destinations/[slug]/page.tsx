import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAllDestinationSlugs,
  getDestinationBySlug,
  getDestinationsByCategory,
} from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { DESTINATION_CATEGORY_SLUGS, type DestinationCategorySlug } from "@/types";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

// Phase 7 IA: /destinations/[category]/ (popular, hot, trending, weekend,
// beaches, hill-stations, pilgrimage, international) shares this exact route
// file rather than a sibling dynamic route, for the same reason as
// /hotels/[theme]/ — see that file's comment.
const CATEGORY_LABELS: Record<DestinationCategorySlug, string> = {
  popular: "Popular Wedding Destinations",
  hot: "Hot Destinations",
  trending: "Trending Cities",
  weekend: "Weekend Destinations",
  beaches: "Beach Destinations",
  "hill-stations": "Hill Destinations",
  pilgrimage: "Pilgrimage Destinations",
  international: "International Destinations",
};

function isCategorySlug(value: string): value is DestinationCategorySlug {
  return (DESTINATION_CATEGORY_SLUGS as readonly string[]).includes(value);
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return [...slugs, ...DESTINATION_CATEGORY_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isCategorySlug(slug)) {
    return buildMetadata({
      fallbackTitle: CATEGORY_LABELS[slug],
      fallbackDescription: `Explore ${CATEGORY_LABELS[slug].toLowerCase()}.`,
      path: `/destinations/${slug}`,
    });
  }

  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: "Destination Not Found" };

  return buildMetadata({
    seo: destination.seo,
    fallbackTitle: destination.name,
    fallbackDescription: destination.description,
    path: `/destinations/${slug}`,
  });
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;

  if (isCategorySlug(slug)) {
    const destinations = await getDestinationsByCategory(slug);
    return (
      <DestinationCollectionView
        eyebrow="Popular Destinations"
        title={CATEGORY_LABELS[slug]}
        destinations={destinations}
        emptyMessage="No destinations tagged for this category yet — check back soon."
      />
    );
  }

  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  return (
    <div className="pb-20">
      <section className="relative flex h-[45vh] min-h-[320px] items-end">
        {destination.hero_image_url ? (
          <Image
            src={getMediaUrl(destination.hero_image_url)}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(destination.hero_image_url))}
          />
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <Container className="relative pb-10 text-white">
          <p className="eyebrow text-gold">{destination.state}</p>
          <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">{destination.name}</h1>
        </Container>
      </section>

      <Container className="mt-12">
        {destination.description && (
          <p className="max-w-3xl text-base leading-relaxed text-ink/70">{destination.description}</p>
        )}

        <div className="mt-10">
          <SectionHeading
            eyebrow="Where to Stay"
            title={`Hotels in ${destination.name}`}
          />

          {destination.hotels && destination.hotels.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destination.hotels.map((hotel) => (
                <HotelCard key={hotel.documentId} hotel={hotel} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink/60">No hotels available in this destination yet.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
