import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Family Offers",
  fallbackDescription: "Offers designed for family stays.",
  path: "/offers/family",
});

export default function FamilyPage() {
  return (
    <CmsBackedPage
      path="/offers/family/"
      eyebrow="Deals & Offers"
      title="Family Offers"
      description="Offers designed for family stays."
    />
  );
}
