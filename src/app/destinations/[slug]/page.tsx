import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllCountrySlugs,
  getAllDestinationSlugs,
  getCountryBySlug,
  getDestinationBySlug,
} from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

// This single dynamic segment does double duty: a real destination slug
// (e.g. "jaipur") renders the destination detail page below; a real country
// slug (e.g. "india") renders a states/destinations browse page instead.
// Next.js disallows two differently-named dynamic segments as siblings at
// the same depth, so — same as the theme/category collections before them —
// both live cases share this one `[slug]` route rather than a sibling
// `[country]` folder.
export async function generateStaticParams() {
  const [destinationSlugs, countrySlugs] = await Promise.all([getAllDestinationSlugs(), getAllCountrySlugs()]);
  return [...destinationSlugs, ...countrySlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const country = await getCountryBySlug(slug);
  if (country) {
    return buildMetadata({
      seo: country.seo,
      fallbackTitle: `Destinations in ${country.name}`,
      fallbackDescription: `Explore Sarovar destinations across ${country.name}.`,
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

  const country = await getCountryBySlug(slug);
  if (country) {
    return (
      <div className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Browse by State" title={`Destinations in ${country.name}`} />
          {country.states && country.states.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {country.states.map((state) => (
                <Link
                  key={state.documentId}
                  href={`/destinations/${country.slug}/${state.slug}`}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
                >
                  <p className="font-display text-lg font-semibold">{state.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-ink/60">No states listed for {country.name} yet.</p>
          )}
        </Container>
      </div>
    );
  }

  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  // Prefer the real `hero_image` media relation (Content Manager -> Destination
  // -> Upload/Replace) over the legacy `hero_image_url` ingested string.
  const heroImageSrc = pickMediaUrl(destination.hero_image, destination.hero_image_url);

  return (
    <div className="pb-20">
      <section className="relative flex h-[45vh] min-h-[320px] items-end">
        {heroImageSrc ? (
          <Image
            src={getMediaUrl(heroImageSrc)}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(heroImageSrc))}
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
