import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Investors",
  fallbackDescription: "Information for investors and stakeholders of Sarovar Hotels.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <CmsBackedPage
      path="/investors/"
      eyebrow="Investor Relations"
      title="Investors"
      description="Information for investors and stakeholders of Sarovar Hotels."
    />
  );
}
