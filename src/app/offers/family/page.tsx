import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Family Offers",
  fallbackDescription: "Offers designed for family stays.",
  path: "/offers/family",
});

export default function FamilyPage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Family Offers"
      description="Offers designed for family stays."
    />
  );
}
