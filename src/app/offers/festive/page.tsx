import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Festive Offers",
  fallbackDescription: "Festive season offers across the Sarovar collection.",
  path: "/offers/festive",
});

export default function FestivePage() {
  return (
    <CmsBackedPage
      path="/offers/festive/"
      eyebrow="Deals & Offers"
      title="Festive Offers"
      description="Festive season offers across the Sarovar collection."
    />
  );
}
