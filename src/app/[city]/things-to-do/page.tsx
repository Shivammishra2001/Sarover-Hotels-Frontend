import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMediaUrl } from "@/lib/utils";
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
    fallbackTitle: `Things to Do in ${destination.name}`,
    fallbackDescription: `Popular attractions and things to do near Sarovar hotels in ${destination.name}.`,
    path: `/${city}/things-to-do`,
  });
}

export default async function ThingsToDoPage({ params }: Props) {
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
          { name: "Things to Do", path: `/${city}/things-to-do/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Explore" title={`Things to Do in ${destination.name}`} />
        {attractions.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction) => (
              <Card key={attraction.documentId} className="flex h-full flex-col overflow-hidden p-0">
                {attraction.image_url && (
                  <div className="aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getMediaUrl(attraction.image_url)}
                      alt={attraction.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-navy">{attraction.name}</h3>
                  {attraction.distance_km && (
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                      {attraction.distance_km} km away
                    </p>
                  )}
                  {attraction.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">
                      {attraction.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No attractions listed for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
