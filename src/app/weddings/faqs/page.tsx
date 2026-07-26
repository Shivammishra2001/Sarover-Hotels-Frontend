import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding FAQs",
  fallbackDescription: "Answers to common questions about weddings at Sarovar hotels.",
  path: "/weddings/faqs",
});

export default function FaqsPage() {
  return (
    <StubLanding
      eyebrow="Weddings"
      title="Wedding FAQs"
      description="Answers to common questions about weddings at Sarovar hotels."
    />
  );
}
