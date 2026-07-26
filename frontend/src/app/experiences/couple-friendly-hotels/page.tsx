import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Couple Friendly Hotels",
  fallbackDescription: "Romantic stays for couples.",
  path: "/experiences/couple-friendly-hotels",
});

export default function CoupleFriendlyHotelsPage() {
  return (
    <StubLanding
      eyebrow="Experiences"
      title="Couple Friendly Hotels"
      description="Romantic stays for couples."
    />
  );
}
