import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllDestinationSlugs, getDestinationBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { getMediaUrl } from "@/lib/utils";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: "Destination Not Found" };

  return {
    title: destination.name,
    description: destination.description?.slice(0, 160),
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
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
