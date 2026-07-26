import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wellness Resorts",
  fallbackDescription: "Resorts focused on rest and wellness.",
  path: "/experiences/wellness-resorts",
});

export default function WellnessResortsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Wellness Resorts"
      description="Resorts focused on rest and wellness."
    />
  );
}
