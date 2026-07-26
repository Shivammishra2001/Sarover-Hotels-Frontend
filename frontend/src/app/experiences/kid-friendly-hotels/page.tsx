import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Kid Friendly Hotels",
  fallbackDescription: "Hotels with amenities for travelling with kids.",
  path: "/experiences/kid-friendly-hotels",
});

export default function KidFriendlyHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Kid Friendly Hotels"
      description="Hotels with amenities for travelling with kids."
    />
  );
}
