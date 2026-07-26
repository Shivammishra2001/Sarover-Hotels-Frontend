import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "FoodGully",
  fallbackDescription: "Sarovar all-day dining concept, FoodGully.",
  path: "/restaurants/foodgully",
});

export default function FoodgullyPage() {
  return (
    <CmsBackedPage
      path="/restaurants/foodgully/"
      eyebrow="Restaurants"
      title="FoodGully"
      description="Sarovar all-day dining concept, FoodGully."
    />
  );
}
