import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Frequently Asked Questions",
  fallbackDescription: "Answers to common questions about stays, bookings, and rewards.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <StubLanding
      eyebrow="Help Centre"
      title="Frequently Asked Questions"
      description="Answers to common questions about stays, bookings, and rewards."
    />
  );
}
