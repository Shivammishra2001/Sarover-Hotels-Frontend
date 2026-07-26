import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Pet Friendly Hotels",
  fallbackDescription: "Hotels that welcome your pets.",
  path: "/experiences/pet-friendly-hotels",
});

export default function PetFriendlyHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Pet Friendly Hotels"
      description="Hotels that welcome your pets."
    />
  );
}
