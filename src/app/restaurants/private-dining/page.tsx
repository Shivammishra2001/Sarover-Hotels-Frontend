import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Private Dining",
  fallbackDescription: "Private dining experiences at Sarovar hotels.",
  path: "/restaurants/private-dining",
});

export default function PrivateDiningPage() {
  return (
    <CmsBackedPage
      path="/restaurants/private-dining/"
      eyebrow="Restaurants"
      title="Private Dining"
      description="Private dining experiences at Sarovar hotels."
    />
  );
}
