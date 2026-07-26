import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Luxury Hotels",
  fallbackDescription: "Sarovar most indulgent luxury stays.",
  path: "/experiences/luxury-hotels",
});

export default function LuxuryHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Luxury Hotels"
      description="Sarovar most indulgent luxury stays."
    />
  );
}
