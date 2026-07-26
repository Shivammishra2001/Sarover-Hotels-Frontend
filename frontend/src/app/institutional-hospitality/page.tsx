import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Institutional Hospitality",
  fallbackDescription: "Hospitality management for institutions and campuses.",
  path: "/institutional-hospitality",
});

export default function InstitutionalHospitalityPage() {
  return (
    <CmsBackedPage
      path="/institutional-hospitality/"
      eyebrow="Institutional Hospitality"
      title="Institutional Hospitality"
      description="Hospitality management for institutions and campuses."
    />
  );
}
