import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Venues",
  fallbackDescription: "Explore wedding venues across the Sarovar collection.",
  path: "/weddings/wedding-venues",
});

export default function WeddingVenuesPage() {
  return (
    <CmsBackedPage
      path="/weddings/wedding-venues/"
      eyebrow="Weddings"
      title="Wedding Venues"
      description="Explore wedding venues across the Sarovar collection."
    />
  );
}
