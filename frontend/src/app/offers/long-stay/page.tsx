import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Long Stay Offers",
  fallbackDescription: "Discounted rates for extended stays.",
  path: "/offers/long-stay",
});

export default function LongStayPage() {
  return (
    <CmsBackedPage
      path="/offers/long-stay/"
      eyebrow="Deals & Offers"
      title="Long Stay Offers"
      description="Discounted rates for extended stays."
    />
  );
}
