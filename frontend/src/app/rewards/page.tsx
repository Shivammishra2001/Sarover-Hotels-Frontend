import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Radisson Rewards",
  fallbackDescription: "Discover Radisson Rewards, our guest loyalty program.",
  path: "/rewards",
});

export default function RewardsDiscoverPage() {
  return (
    <StubLanding
      eyebrow="Radisson Rewards"
      title="Discover Radisson Rewards"
      description="Earn points on every stay and unlock member-only benefits across the Sarovar family of hotels."
    />
  );
}
