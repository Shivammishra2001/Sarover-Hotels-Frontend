import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Boutique Hotels",
  fallbackDescription: "Smaller, characterful boutique properties.",
  path: "/experiences/boutique-hotels",
});

export default function BoutiqueHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Boutique Hotels"
      description="Smaller, characterful boutique properties."
    />
  );
}
