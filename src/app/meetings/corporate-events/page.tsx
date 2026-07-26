import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Corporate Events",
  fallbackDescription: "Venues and packages for corporate offsites and events.",
  path: "/meetings/corporate-events",
});

export default function CorporateEventsPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Corporate Events"
      description="Venues and packages for corporate offsites and events."
    />
  );
}
