import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hill Destinations",
  fallbackDescription: "Hill station destinations across the Sarovar map.",
  path: "/destinations/hill-stations",
});

export default function HillStationsPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Hill Destinations"
      description="Hill station destinations across the Sarovar map."
    />
  );
}
