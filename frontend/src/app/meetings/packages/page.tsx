import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meeting Packages",
  fallbackDescription: "Day-delegate and residential meeting packages.",
  path: "/meetings/packages",
});

export default function PackagesPage() {
  return (
    <CmsBackedPage
      path="/meetings/packages/"
      eyebrow="Meetings & Events"
      title="Meeting Packages"
      description="Day-delegate and residential meeting packages."
    />
  );
}
