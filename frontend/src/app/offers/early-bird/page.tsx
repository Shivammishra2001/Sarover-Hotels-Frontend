import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Early Bird Offers",
  fallbackDescription: "Book ahead and save with early bird rates.",
  path: "/offers/early-bird",
});

export default function EarlyBirdPage() {
  return (
    <CmsBackedPage
      path="/offers/early-bird/"
      eyebrow="Deals & Offers"
      title="Early Bird Offers"
      description="Book ahead and save with early bird rates."
    />
  );
}
