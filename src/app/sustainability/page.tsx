import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Sustainability",
  fallbackDescription: "Sarovar Hotels approach to sustainable and responsible hospitality.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <StubLanding
      eyebrow="Responsible Hospitality"
      title="Sustainability"
      description="Sarovar Hotels approach to sustainable and responsible hospitality."
    />
  );
}
