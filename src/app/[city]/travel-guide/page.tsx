import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
    fallbackTitle: `Travel Guide – ${destination.name}`,
    fallbackDescription: `A travel guide to ${destination.name} — places to see and things to know before you go.`,
    path: `/${city}/travel-guide`,
  });
}

export default async function TravelGuidePage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const attractions = destination.attractions ?? [];

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Travel Guide", path: `/${city}/travel-guide/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Travel Guide" title={`Travel Guide to ${destination.name}`} />
        {destination.description ? (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink/70">{destination.description}</p>
        ) : (
          <p className="mt-6 text-sm text-ink/60">Travel guide coming soon for {destination.name}.</p>
        )}

        {attractions.length > 0 && (
          <div className="mt-12">
            <SectionHeading title="Places to See" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <li
                  key={attraction.documentId}
                  className="rounded-xl border border-border bg-white p-4 text-sm font-semibold text-navy"
                >
                  {attraction.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
