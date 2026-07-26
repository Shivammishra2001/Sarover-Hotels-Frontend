import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "How to Earn",
  fallbackDescription: "Learn how to earn Radisson Rewards points on every stay.",
  path: "/rewards/earn",
});

export default function RewardsEarnPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="How to Earn"
      description="Earn points automatically on every qualifying stay, simply by being a member."
    />
  );
}
