import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meetings FAQs",
  fallbackDescription: "Answers to common questions about hosting an event.",
  path: "/meetings/faqs",
});

export default function FaqsPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Meetings FAQs"
      description="Answers to common questions about hosting an event."
    />
  );
}
