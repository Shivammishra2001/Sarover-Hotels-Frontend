import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Seasonal Offers",
  fallbackDescription: "Limited-time seasonal offers across Sarovar hotels.",
  path: "/offers/seasonal",
});

export default function SeasonalPage() {
  return (
    <CmsBackedPage
      path="/offers/seasonal/"
      eyebrow="Deals & Offers"
      title="Seasonal Offers"
      description="Limited-time seasonal offers across Sarovar hotels."
    />
  );
}
