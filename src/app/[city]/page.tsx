import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllCitySlugs, getCityBySlug, getPageByPath } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

// A single dynamic segment `[city]` always wins Next.js route-matching
// precedence over the sibling catch-all `app/[...slug]/page.tsx` (dynamic
// beats catch-all) - so every single-segment path that ISN'T a real city
// (e.g. /about-us, /disclaimer) gets intercepted here, never reaching the
// generic `page` collection the catch-all serves. Falling back to that same
// lookup here (instead of notFound() as soon as the city lookup misses)
// restores those pages instead of 404ing every non-city single-segment path.

interface CityPageProps {
  params: Promise<{ city: string }>;
}

// The other 9 city sub-pages (restaurants, things-to-do, experiences,
// travel-guide, wedding-venues, meeting-venues, offers, gallery, faqs) stay
// Phase-1 stubs for a later phase - only /hotels is wired here (see report).
const CITY_SECTIONS = [
  { label: "Hotels", href: "/hotels" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Things to Do", href: "/things-to-do" },
  { label: "Experiences", href: "/experiences" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "Wedding Venues", href: "/wedding-venues" },
  { label: "Meeting Venues", href: "/meeting-venues" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
];

export async function generateStaticParams() {
  const slugs = await getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (destination) {
    return buildMetadata({
      seo: destination.seo,
      fallbackTitle: destination.name,
      fallbackDescription: destination.description,
      path: `/${city}`,
    });
  }

  const page = await getPageByPath(`/${city}`);
  if (!page) return { title: "Not Found" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: `/${city}`,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const destination = await getCityBySlug(city);

  if (!destination) {
    const page = await getPageByPath(`/${city}`);
    if (!page) notFound();
    return (
      <div className="pb-20 pt-10">
        <Container className="max-w-3xl">
          <SectionHeading title={page.title} description={page.excerpt} />
          <div className="mt-10">
            <BlockRenderer blocks={page.body} />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
        ])}
      />
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
          {(destination.state || destination.country) && (
            <p className="eyebrow text-gold">
              {[destination.state, destination.country].filter(Boolean).join(", ")}
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">{destination.name}</h1>
        </Container>
      </section>

      <Container className="mt-12">
        {destination.description && (
          <p className="max-w-3xl text-base leading-relaxed text-ink/70">{destination.description}</p>
        )}

        <nav className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4">
          {CITY_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={`/${city}${section.href}`}
              className="rounded-full bg-muted px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-navy/10"
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10">
          <SectionHeading eyebrow="Where to Stay" title={`Hotels in ${destination.name}`} />

          {destination.hotels && destination.hotels.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destination.hotels.map((hotel) => (
                <HotelCard
                  key={hotel.documentId}
                  hotel={hotel}
                  href={hotel.path ?? `/hotels/${hotel.slug}`}
                />
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
