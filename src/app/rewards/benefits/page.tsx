import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Member Benefits",
  fallbackDescription: "Explore the benefits of Radisson Rewards membership.",
  path: "/rewards/benefits",
});

export default function RewardsBenefitsPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="Member Benefits"
      description="Room upgrades, late check-out, and exclusive member rates await."
    />
  );
}
