import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Planning Guide",
  fallbackDescription: "A step-by-step guide to planning your wedding with Sarovar Hotels.",
  path: "/weddings/planning-guide",
});

export default function PlanningGuidePage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Wedding Planning Guide"
      description="A step-by-step guide to planning your wedding with Sarovar Hotels."
    />
  );
}
