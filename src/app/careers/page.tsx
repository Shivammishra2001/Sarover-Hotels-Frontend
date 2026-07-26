import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Careers",
  fallbackDescription: "Career opportunities across the Sarovar Hotels group.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <CmsBackedPage
      path="/careers"
      eyebrow="Join Us"
      title="Careers"
      description="Career opportunities across the Sarovar Hotels group."
    />
  );
}
