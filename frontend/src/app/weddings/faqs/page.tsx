import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding FAQs",
  fallbackDescription: "Answers to common questions about weddings at Sarovar hotels.",
  path: "/weddings/faqs",
});

export default function FaqsPage() {
  return (
    <CmsBackedPage
      path="/weddings/faqs/"
      eyebrow="Weddings"
      title="Wedding FAQs"
      description="Answers to common questions about weddings at Sarovar hotels."
    />
  );
}
