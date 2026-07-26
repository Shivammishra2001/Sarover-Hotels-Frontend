import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Corporate Events",
  fallbackDescription: "Venues and packages for corporate offsites and events.",
  path: "/meetings/corporate-events",
});

export default function CorporateEventsPage() {
  return (
    <CmsBackedPage
      path="/meetings/corporate-events/"
      eyebrow="Meetings & Events"
      title="Corporate Events"
      description="Venues and packages for corporate offsites and events."
    />
  );
}
