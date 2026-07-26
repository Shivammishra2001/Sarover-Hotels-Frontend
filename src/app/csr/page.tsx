import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Corporate Social Responsibility",
  fallbackDescription: "Sarovar Hotels community and sustainability initiatives.",
  path: "/csr",
});

export default function CsrPage() {
  return (
    <CmsBackedPage
      path="/csr/"
      eyebrow="Giving Back"
      title="Corporate Social Responsibility"
      description="Sarovar Hotels community and sustainability initiatives."
    />
  );
}
