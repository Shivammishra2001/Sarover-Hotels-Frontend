import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "About Us",
  fallbackDescription: "Learn about Sarovar Hotels and its multi-brand hospitality group.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <CmsBackedPage
      path="/about/"
      eyebrow="Our Story"
      title="About Us"
      description="Learn about Sarovar Hotels and its multi-brand hospitality group."
    />
  );
}
