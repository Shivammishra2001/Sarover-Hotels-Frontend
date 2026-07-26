import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Pilgrimage Destinations",
  fallbackDescription: "Destinations near major pilgrimage sites.",
  path: "/destinations/pilgrimage",
});

export default function PilgrimagePage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Pilgrimage Destinations"
      description="Destinations near major pilgrimage sites."
    />
  );
}
