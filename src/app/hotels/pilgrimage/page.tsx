import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Pilgrimage Hotels",
  fallbackDescription: "Sarovar hotels near pilgrimage destinations.",
  path: "/hotels/pilgrimage",
});

export default function PilgrimagePage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Pilgrimage Hotels"
      description="Sarovar hotels near pilgrimage destinations."
    />
  );
}
