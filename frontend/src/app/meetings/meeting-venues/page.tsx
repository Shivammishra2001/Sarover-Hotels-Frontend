import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meeting Venues",
  fallbackDescription: "Meeting rooms and boardrooms across Sarovar hotels.",
  path: "/meetings/meeting-venues",
});

export default function MeetingVenuesPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Meeting Venues"
      description="Meeting rooms and boardrooms across Sarovar hotels."
    />
  );
}
