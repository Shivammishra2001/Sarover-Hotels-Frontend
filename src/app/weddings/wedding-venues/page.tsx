import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Venues",
  fallbackDescription: "Explore wedding venues across the Sarovar collection.",
  path: "/weddings/wedding-venues",
});

export default function WeddingVenuesPage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Wedding Venues"
      description="Explore wedding venues across the Sarovar collection."
    />
  );
}
