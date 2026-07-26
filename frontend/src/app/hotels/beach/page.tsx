import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hotels on the Beach",
  fallbackDescription: "Sarovar hotels on the coast.",
  path: "/hotels/beach",
});

export default function BeachPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Hotels on the Beach"
      description="Sarovar hotels on the coast."
    />
  );
}
