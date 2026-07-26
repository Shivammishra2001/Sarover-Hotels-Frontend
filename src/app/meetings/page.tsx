import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Meetings & Events",
  fallbackDescription: "Conference-ready venues and banquet spaces across the Sarovar collection.",
  path: "/meetings",
});

export default function MeetingsPage() {
  return (
    <StubLanding
      eyebrow="Business Events"
      title="Meetings & Events"
      description="Conference-ready venues and banquet spaces across the Sarovar collection."
    />
  );
}
