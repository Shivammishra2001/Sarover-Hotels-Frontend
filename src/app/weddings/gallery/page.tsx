import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Wedding Gallery",
  fallbackDescription: "A look at real weddings hosted at Sarovar hotels.",
  path: "/weddings/gallery",
});

export default function GalleryPage() {
  return (
    <CmsBackedPage
      path="/weddings/gallery/"
      eyebrow="Weddings"
      title="Wedding Gallery"
      description="A look at real weddings hosted at Sarovar hotels."
    />
  );
}
