import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Business Offers",
  fallbackDescription: "Offers for business and corporate travellers.",
  path: "/offers/business",
});

export default function BusinessPage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Business Offers"
      description="Offers for business and corporate travellers."
    />
  );
}
