import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "New & Upcoming Hotels",
  fallbackDescription: "The newest additions to the Sarovar Hotels portfolio.",
  path: "/new-and-upcoming-hotels",
});

export default function NewAndUpcomingHotelsPage() {
  return (
    <StubLanding
      eyebrow="Just Announced"
      title="New & Upcoming Hotels"
      description="The newest additions to the Sarovar Hotels portfolio."
    />
  );
}
