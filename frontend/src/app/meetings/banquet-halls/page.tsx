import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Banquet Halls",
  fallbackDescription: "Banquet halls suited for events of every size.",
  path: "/meetings/banquet-halls",
});

export default function BanquetHallsPage() {
  return (
    <CmsBackedPage
      path="/meetings/banquet-halls/"
      eyebrow="Meetings & Events"
      title="Banquet Halls"
      description="Banquet halls suited for events of every size."
    />
  );
}
