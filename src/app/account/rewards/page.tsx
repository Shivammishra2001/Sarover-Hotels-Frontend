import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "My Rewards",
  fallbackDescription: "Track your Radisson Rewards points and tier.",
  path: "/account/rewards",
});

export default function RewardsPage() {
  return (
    <StubLanding
      eyebrow="My Account"
      title="My Rewards"
      description="Track your Radisson Rewards points and tier."
    />
  );
}
