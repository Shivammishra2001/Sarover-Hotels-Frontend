import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Weekend Offers",
  fallbackDescription: "Short-break offers for weekend getaways.",
  path: "/offers/weekend",
});

export default function WeekendPage() {
  return (
    <CmsBackedPage
      path="/offers/weekend/"
      eyebrow="Deals & Offers"
      title="Weekend Offers"
      description="Short-break offers for weekend getaways."
    />
  );
}
