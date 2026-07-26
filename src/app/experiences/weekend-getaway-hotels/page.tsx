import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Weekend Getaway Hotels",
  fallbackDescription: "Hotels perfect for a short weekend trip.",
  path: "/experiences/weekend-getaway-hotels",
});

export default function WeekendGetawayHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Weekend Getaway Hotels"
      description="Hotels perfect for a short weekend trip."
    />
  );
}
