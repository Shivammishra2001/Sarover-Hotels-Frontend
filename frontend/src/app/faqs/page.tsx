import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Frequently Asked Questions",
  fallbackDescription: "Answers to common questions about stays, bookings, and rewards.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <CmsBackedPage
      path="/faqs/"
      eyebrow="Help Centre"
      title="Frequently Asked Questions"
      description="Answers to common questions about stays, bookings, and rewards."
    />
  );
}
