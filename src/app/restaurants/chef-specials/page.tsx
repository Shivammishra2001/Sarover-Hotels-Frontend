import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Chef Specials",
  fallbackDescription: "Signature dishes from Sarovar executive chefs.",
  path: "/restaurants/chef-specials",
});

export default function ChefSpecialsPage() {
  return (
    <StubLanding
      eyebrow="Restaurants"
      title="Chef Specials"
      description="Signature dishes from Sarovar executive chefs."
    />
  );
}
