import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Festive Offers",
  fallbackDescription: "Festive season offers across the Sarovar collection.",
  path: "/offers/festive",
});

export default function FestivePage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Festive Offers"
      description="Festive season offers across the Sarovar collection."
    />
  );
}
