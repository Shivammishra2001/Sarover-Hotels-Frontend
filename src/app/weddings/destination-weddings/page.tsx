import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Destination Weddings",
  fallbackDescription: "Plan a destination wedding at a Sarovar hotel.",
  path: "/weddings/destination-weddings",
});

export default function DestinationWeddingsPage() {
  return (
    <CmsBackedPage
      path="/weddings/destination-weddings/"
      eyebrow="Weddings"
      title="Destination Weddings"
      description="Plan a destination wedding at a Sarovar hotel."
    />
  );
}
