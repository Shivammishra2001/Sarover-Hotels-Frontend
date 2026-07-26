import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Destination Weddings",
  fallbackDescription: "Plan a destination wedding at a Sarovar hotel.",
  path: "/weddings/destination-weddings",
});

export default function DestinationWeddingsPage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Destination Weddings"
      description="Plan a destination wedding at a Sarovar hotel."
    />
  );
}
