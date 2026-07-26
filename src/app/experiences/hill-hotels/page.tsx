import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hill Hotels",
  fallbackDescription: "Sarovar hotels in the hills.",
  path: "/experiences/hill-hotels",
});

export default function HillHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Hill Hotels"
      description="Sarovar hotels in the hills."
    />
  );
}
