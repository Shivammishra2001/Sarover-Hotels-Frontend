import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Conference Hotels",
  fallbackDescription: "Hotels built for conferences and large-scale events.",
  path: "/meetings/conference-hotels",
});

export default function ConferenceHotelsPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Conference Hotels"
      description="Hotels built for conferences and large-scale events."
    />
  );
}
