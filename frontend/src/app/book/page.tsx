import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Book a Stay",
  fallbackDescription: "Start a booking or inquiry with a Sarovar hotel.",
  path: "/book",
});

export default function BookPage() {
  return (
    <StubLanding
      eyebrow="Reservations"
      title="Book a Stay"
      description="Start a booking or inquiry with a Sarovar hotel."
    />
  );
}
