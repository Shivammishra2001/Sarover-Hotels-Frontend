import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "New & Upcoming Hotels",
  fallbackDescription: "The newest additions to the Sarovar Hotels portfolio.",
  path: "/new-and-upcoming-hotels",
});

export default function NewAndUpcomingHotelsPage() {
  return (
    <CmsBackedPage
      path="/new-and-upcoming-hotels/"
      eyebrow="Just Announced"
      title="New & Upcoming Hotels"
      description="The newest additions to the Sarovar Hotels portfolio."
    />
  );
}
