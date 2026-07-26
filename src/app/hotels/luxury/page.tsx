import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Luxury Hotels",
  fallbackDescription: "Sarovar most indulgent stays.",
  path: "/hotels/luxury",
});

export default function LuxuryPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Luxury Hotels"
      description="Sarovar most indulgent stays."
    />
  );
}
