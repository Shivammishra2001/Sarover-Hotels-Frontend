import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Partner With Us",
  fallbackDescription: "Franchise and management partnership opportunities with Sarovar Hotels.",
  path: "/partner-with-us",
});

export default function PartnerWithUsPage() {
  return (
    <StubLanding
      eyebrow="Grow With Us"
      title="Partner With Us"
      description="Franchise and management partnership opportunities with Sarovar Hotels."
    />
  );
}
