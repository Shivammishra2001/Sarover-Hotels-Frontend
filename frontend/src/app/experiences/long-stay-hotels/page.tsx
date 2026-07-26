import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Long Stay Hotels",
  fallbackDescription: "Hotels suited for extended stays.",
  path: "/experiences/long-stay-hotels",
});

export default function LongStayHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Long Stay Hotels"
      description="Hotels suited for extended stays."
    />
  );
}
