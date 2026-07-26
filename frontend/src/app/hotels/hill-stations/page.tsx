import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hotels in the Hills",
  fallbackDescription: "Sarovar hotels set in the hills.",
  path: "/hotels/hill-stations",
});

export default function HillStationsPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Hotels in the Hills"
      description="Sarovar hotels set in the hills."
    />
  );
}
