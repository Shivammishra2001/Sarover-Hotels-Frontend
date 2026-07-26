import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Packages",
  fallbackDescription: "Curated wedding packages for every celebration.",
  path: "/weddings/packages",
});

export default function PackagesPage() {
  return (
    <CmsBackedPage
      path="/weddings/packages/"
      eyebrow="Weddings"
      title="Wedding Packages"
      description="Curated wedding packages for every celebration."
    />
  );
}
