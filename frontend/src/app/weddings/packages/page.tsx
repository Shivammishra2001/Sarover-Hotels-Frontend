import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Packages",
  fallbackDescription: "Curated wedding packages for every celebration.",
  path: "/weddings/packages",
});

export default function PackagesPage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Wedding Packages"
      description="Curated wedding packages for every celebration."
    />
  );
}
