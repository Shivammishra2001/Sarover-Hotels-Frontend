import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { OfferCard } from "@/components/hotel/OfferCard";
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
    fallbackTitle: `Offers in ${destination.name}`,
    fallbackDescription: `Current offers and deals at Sarovar hotels in ${destination.name}.`,
    path: `/${city}/offers`,
  });
}

export default async function OffersPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const hotels = destination.hotels ?? [];
  const offers = hotels.flatMap((hotel) => hotel.offers ?? []);

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Offers", path: `/${city}/offers/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Deals" title={`Offers in ${destination.name}`} />
        {offers.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.documentId} offer={offer} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No offers available for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
