import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Beach Resorts",
  fallbackDescription: "Sarovar resorts by the coast.",
  path: "/experiences/beach-resorts",
});

export default function BeachResortsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Beach Resorts"
      description="Sarovar resorts by the coast."
    />
  );
}
