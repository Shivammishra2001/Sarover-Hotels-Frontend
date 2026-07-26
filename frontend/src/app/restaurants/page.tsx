import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Restaurants",
  fallbackDescription: "Signature restaurants and dining concepts across Sarovar hotels.",
  path: "/restaurants",
});

export default function RestaurantsPage() {
  return (
    <CmsBackedPage
      path="/restaurants/"
      eyebrow="Dining"
      title="Restaurants"
      description="Signature restaurants and dining concepts across Sarovar hotels."
    />
  );
}
