import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Careers",
  fallbackDescription: "Career opportunities across the Sarovar Hotels group.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <StubLanding
      eyebrow="Join Us"
      title="Careers"
      description="Career opportunities across the Sarovar Hotels group."
    />
  );
}
