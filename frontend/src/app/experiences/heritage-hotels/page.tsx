import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Heritage Hotels",
  fallbackDescription: "Hotels with a story steeped in heritage.",
  path: "/experiences/heritage-hotels",
});

export default function HeritageHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Heritage Hotels"
      description="Hotels with a story steeped in heritage."
    />
  );
}
