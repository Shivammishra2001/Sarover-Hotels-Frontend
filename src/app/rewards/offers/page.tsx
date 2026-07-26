import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Member Deals",
  fallbackDescription: "Exclusive deals for Radisson Rewards members.",
  path: "/rewards/offers",
});

export default function RewardsMemberDealsPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="Member Deals"
      description="Special member-only rates and offers, available exclusively to Radisson Rewards members."
    />
  );
}
