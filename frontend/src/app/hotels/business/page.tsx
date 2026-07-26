import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Business Hotels",
  fallbackDescription: "Sarovar hotels suited for business travel.",
  path: "/hotels/business",
});

export default function BusinessPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Business Hotels"
      description="Sarovar hotels suited for business travel."
    />
  );
}
