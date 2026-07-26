import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Beach Destinations",
  fallbackDescription: "Coastal destinations across the Sarovar map.",
  path: "/destinations/beaches",
});

export default function BeachesPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Beach Destinations"
      description="Coastal destinations across the Sarovar map."
    />
  );
}
