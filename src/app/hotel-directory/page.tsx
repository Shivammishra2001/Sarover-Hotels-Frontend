import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hotel Directory",
  fallbackDescription: "A complete directory of every Sarovar hotel.",
  path: "/hotel-directory",
});

export default function HotelDirectoryPage() {
  return (
    <CmsBackedPage
      path="/hotel-directory/"
      eyebrow="Full Listing"
      title="Hotel Directory"
      description="A complete directory of every Sarovar hotel."
    />
  );
}
