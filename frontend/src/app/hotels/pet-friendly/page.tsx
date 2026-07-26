import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Pet Friendly Hotels",
  fallbackDescription: "Sarovar hotels that welcome pets.",
  path: "/hotels/pet-friendly",
});

export default function PetFriendlyPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Pet Friendly Hotels"
      description="Sarovar hotels that welcome pets."
    />
  );
}
