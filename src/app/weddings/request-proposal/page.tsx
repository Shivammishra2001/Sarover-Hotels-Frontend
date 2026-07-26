import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Request a Proposal",
  fallbackDescription: "Tell us about your wedding and receive a tailored proposal.",
  path: "/weddings/request-proposal",
});

export default function RequestProposalPage() {
  return (
    <CmsBackedPage
      path="/weddings/request-proposal/"
      eyebrow="Weddings"
      title="Request a Proposal"
      description="Tell us about your wedding and receive a tailored proposal."
    />
  );
}
