import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Business Hotels",
  fallbackDescription: "Hotels suited for business travellers.",
  path: "/experiences/business-hotels",
});

export default function BusinessHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Business Hotels"
      description="Hotels suited for business travellers."
    />
  );
}
