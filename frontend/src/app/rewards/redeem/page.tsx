import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "How to Redeem",
  fallbackDescription: "Learn how to redeem Radisson Rewards points.",
  path: "/rewards/redeem",
});

export default function RewardsRedeemPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="How to Redeem"
      description="Use your points for free nights, upgrades, and more across the Sarovar family."
    />
  );
}
