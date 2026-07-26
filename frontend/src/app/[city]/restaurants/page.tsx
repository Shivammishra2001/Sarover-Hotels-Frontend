import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { DiningCard } from "@/components/hotel/DiningCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import type { Dining } from "@/types";

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
    fallbackTitle: `Restaurants in ${destination.name}`,
    fallbackDescription: `Discover restaurants and dining outlets at Sarovar hotels in ${destination.name}.`,
    path: `/${city}/restaurants`,
  });
}

export default async function RestaurantsPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const hotels = destination.hotels ?? [];
  const dinings = hotels.flatMap((hotel) =>
    (hotel.dinings ?? []).map((dining): { dining: Dining; hotelSlug: string; basePath: string } => ({
      dining,
      hotelSlug: hotel.slug,
      basePath: `/${city}/${hotel.slug}`,
    }))
  );

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Restaurants", path: `/${city}/restaurants/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Dining" title={`Restaurants in ${destination.name}`} />
        {dinings.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dinings.map(({ dining, hotelSlug, basePath }) => (
              <DiningCard key={dining.documentId} dining={dining} hotelSlug={hotelSlug} basePath={basePath} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No restaurants listed for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
