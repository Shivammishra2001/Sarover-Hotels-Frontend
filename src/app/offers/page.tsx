import type { Metadata } from "next";
import { getActiveOffers } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { OfferCard } from "@/components/hotel/OfferCard";

export const metadata: Metadata = {
  title: "Offers & Packages",
  description: "Browse current offers and packages across Sarovar Hotels &amp; Resorts.",
};

export default async function OffersPage() {
  const offers = await getActiveOffers();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Save More"
          title="Offers & Packages"
          description="Handpicked deals across our brands and properties — updated regularly."
        />

        {offers.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.documentId} offer={offer} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No active offers right now — check back soon.</p>
        )}
      </Container>
    </div>
  );
}
