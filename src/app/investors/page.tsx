import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Investors",
  fallbackDescription: "Information for investors and stakeholders of Sarovar Hotels.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <StubLanding
      eyebrow="Investor Relations"
      title="Investors"
      description="Information for investors and stakeholders of Sarovar Hotels."
    />
  );
}
