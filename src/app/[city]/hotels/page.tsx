import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
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
    fallbackTitle: `Hotels in ${destination.name}`,
    fallbackDescription: `Browse all Sarovar hotels in ${destination.name}.`,
    path: `/${city}/hotels`,
  });
}

export default async function CityHotelsPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const hotels = destination.hotels ?? [];

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Hotels", path: `/${city}/hotels/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Where to Stay" title={`Hotels in ${destination.name}`} />
        {hotels.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.documentId} hotel={hotel} href={hotel.path ?? `/hotels/${hotel.slug}`} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No hotels available in this destination yet.</p>
        )}
      </Container>
    </div>
  );
}
