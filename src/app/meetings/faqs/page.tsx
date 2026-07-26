import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meetings FAQs",
  fallbackDescription: "Answers to common questions about hosting an event.",
  path: "/meetings/faqs",
});

export default function FaqsPage() {
  return (
    <CmsBackedPage
      path="/meetings/faqs/"
      eyebrow="Meetings & Events"
      title="Meetings FAQs"
      description="Answers to common questions about hosting an event."
    />
  );
}
