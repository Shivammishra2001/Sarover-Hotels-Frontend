import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Request a Proposal",
  fallbackDescription: "Tell us about your wedding and receive a tailored proposal.",
  path: "/weddings/request-proposal",
});

export default function RequestProposalPage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Request a Proposal"
      description="Tell us about your wedding and receive a tailored proposal."
    />
  );
}
