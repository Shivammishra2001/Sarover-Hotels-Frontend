import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Hotels",
  fallbackDescription: "Sarovar hotels equipped to host weddings.",
  path: "/hotels/wedding",
});

export default function WeddingPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Wedding Hotels"
      description="Sarovar hotels equipped to host weddings."
    />
  );
}
