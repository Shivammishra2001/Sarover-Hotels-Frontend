import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Request a Proposal",
  fallbackDescription: "Tell us about your event and receive a tailored proposal.",
  path: "/meetings/request-proposal",
});

export default function RequestProposalPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Request a Proposal"
      description="Tell us about your event and receive a tailored proposal."
    />
  );
}
