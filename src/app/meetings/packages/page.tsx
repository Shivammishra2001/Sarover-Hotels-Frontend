import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meeting Packages",
  fallbackDescription: "Day-delegate and residential meeting packages.",
  path: "/meetings/packages",
});

export default function PackagesPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Meeting Packages"
      description="Day-delegate and residential meeting packages."
    />
  );
}
