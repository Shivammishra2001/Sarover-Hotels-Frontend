import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Restaurants",
  fallbackDescription: "Signature restaurants and dining concepts across Sarovar hotels.",
  path: "/restaurants",
});

export default function RestaurantsPage() {
  return (
    <StubLanding
      eyebrow="Dining"
      title="Restaurants"
      description="Signature restaurants and dining concepts across Sarovar hotels."
    />
  );
}
