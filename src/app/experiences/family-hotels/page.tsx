import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Family Hotels",
  fallbackDescription: "Hotels great for family holidays.",
  path: "/experiences/family-hotels",
});

export default function FamilyHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Family Hotels"
      description="Hotels great for family holidays."
    />
  );
}
