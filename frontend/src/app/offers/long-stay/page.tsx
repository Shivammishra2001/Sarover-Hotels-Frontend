import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Long Stay Offers",
  fallbackDescription: "Discounted rates for extended stays.",
  path: "/offers/long-stay",
});

export default function LongStayPage() {
  return (
    <StubLanding
      eyebrow="Deals & Offers"
      title="Long Stay Offers"
      description="Discounted rates for extended stays."
    />
  );
}
