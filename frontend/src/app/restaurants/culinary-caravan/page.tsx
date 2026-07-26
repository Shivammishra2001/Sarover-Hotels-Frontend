import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Culinary Caravan",
  fallbackDescription: "A rotating showcase of regional cuisines.",
  path: "/restaurants/culinary-caravan",
});

export default function CulinaryCaravanPage() {
  return (
    <StubLanding
      eyebrow="Restaurants"
      title="Culinary Caravan"
      description="A rotating showcase of regional cuisines."
    />
  );
}
