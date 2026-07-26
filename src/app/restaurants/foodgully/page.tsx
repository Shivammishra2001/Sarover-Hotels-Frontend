import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "FoodGully",
  fallbackDescription: "Sarovar all-day dining concept, FoodGully.",
  path: "/restaurants/foodgully",
});

export default function FoodgullyPage() {
  return (
    <StubLanding
      eyebrow="Restaurants"
      title="FoodGully"
      description="Sarovar all-day dining concept, FoodGully."
    />
  );
}
