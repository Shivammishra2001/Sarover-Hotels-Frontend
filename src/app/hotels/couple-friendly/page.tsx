import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Couple Friendly Hotels",
  fallbackDescription: "Romantic Sarovar stays for couples.",
  path: "/hotels/couple-friendly",
});

export default function CoupleFriendlyPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Couple Friendly Hotels"
      description="Romantic Sarovar stays for couples."
    />
  );
}
