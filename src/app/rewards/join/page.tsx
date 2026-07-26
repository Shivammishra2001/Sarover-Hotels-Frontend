import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Join Now",
  fallbackDescription: "Join Radisson Rewards for free.",
  path: "/rewards/join",
});

export default function RewardsJoinPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="Join Now"
      description="Membership is free — sign up to start earning on your next stay."
    />
  );
}
