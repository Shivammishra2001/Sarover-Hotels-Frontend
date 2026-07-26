import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Sustainability",
  fallbackDescription: "Sarovar Hotels approach to sustainable and responsible hospitality.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <CmsBackedPage
      path="/sustainability/"
      eyebrow="Responsible Hospitality"
      title="Sustainability"
      description="Sarovar Hotels approach to sustainable and responsible hospitality."
    />
  );
}
