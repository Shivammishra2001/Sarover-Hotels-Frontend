import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Planning Guide",
  fallbackDescription: "A step-by-step guide to planning your wedding with Sarovar Hotels.",
  path: "/weddings/planning-guide",
});

export default function PlanningGuidePage() {
  return (
    <CmsBackedPage
      path="/weddings/planning-guide/"
      eyebrow="Weddings"
      title="Wedding Planning Guide"
      description="A step-by-step guide to planning your wedding with Sarovar Hotels."
    />
  );
}
