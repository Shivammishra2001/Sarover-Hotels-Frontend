import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Weekend Destinations",
  fallbackDescription: "Destinations perfect for a short break.",
  path: "/destinations/weekend",
});

export default function WeekendPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Weekend Destinations"
      description="Destinations perfect for a short break."
    />
  );
}
