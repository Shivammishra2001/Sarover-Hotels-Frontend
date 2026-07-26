import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Weekend Offers",
  fallbackDescription: "Short-break offers for weekend getaways.",
  path: "/offers/weekend",
});

export default function WeekendPage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Weekend Offers"
      description="Short-break offers for weekend getaways."
    />
  );
}
