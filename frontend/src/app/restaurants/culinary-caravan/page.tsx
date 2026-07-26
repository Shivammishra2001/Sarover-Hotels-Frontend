import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Culinary Caravan",
  fallbackDescription: "A rotating showcase of regional cuisines.",
  path: "/restaurants/culinary-caravan",
});

export default function CulinaryCaravanPage() {
  return (
    <CmsBackedPage
      path="/restaurants/culinary-caravan/"
      eyebrow="Restaurants"
      title="Culinary Caravan"
      description="A rotating showcase of regional cuisines."
    />
  );
}
