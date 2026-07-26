import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Seasonal Offers",
  fallbackDescription: "Limited-time seasonal offers across Sarovar hotels.",
  path: "/offers/seasonal",
});

export default function SeasonalPage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Seasonal Offers"
      description="Limited-time seasonal offers across Sarovar hotels."
    />
  );
}
