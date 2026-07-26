import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Hotels",
  fallbackDescription: "Hotels equipped to host your wedding.",
  path: "/experiences/wedding-hotels",
});

export default function WeddingHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Wedding Hotels"
      description="Hotels equipped to host your wedding."
    />
  );
}
