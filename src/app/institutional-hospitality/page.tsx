import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Institutional Hospitality",
  fallbackDescription: "Hospitality management for institutions and campuses.",
  path: "/institutional-hospitality",
});

export default function InstitutionalHospitalityPage() {
  return (
    <StubLanding
      eyebrow="Institutional Hospitality"
      title="Institutional Hospitality"
      description="Hospitality management for institutions and campuses."
    />
  );
}
