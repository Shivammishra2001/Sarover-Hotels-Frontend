import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Media",
  fallbackDescription: "Press resources and media coverage for Sarovar Hotels.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <CmsBackedPage
      path="/media/"
      eyebrow="Press"
      title="Media"
      description="Press resources and media coverage for Sarovar Hotels."
    />
  );
}
