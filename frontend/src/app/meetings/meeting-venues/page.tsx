import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meeting Venues",
  fallbackDescription: "Meeting rooms and boardrooms across Sarovar hotels.",
  path: "/meetings/meeting-venues",
});

export default function MeetingVenuesPage() {
  return (
    <CmsBackedPage
      path="/meetings/meeting-venues/"
      eyebrow="Meetings & Events"
      title="Meeting Venues"
      description="Meeting rooms and boardrooms across Sarovar hotels."
    />
  );
}
