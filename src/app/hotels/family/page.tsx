import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Family Hotels",
  fallbackDescription: "Sarovar hotels great for family travel.",
  path: "/hotels/family",
});

export default function FamilyPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Family Hotels"
      description="Sarovar hotels great for family travel."
    />
  );
}
