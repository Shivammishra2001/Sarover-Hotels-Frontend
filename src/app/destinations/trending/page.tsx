import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Trending Cities",
  fallbackDescription: "Cities seeing a surge in interest.",
  path: "/destinations/trending",
});

export default function TrendingPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Trending Cities"
      description="Cities seeing a surge in interest."
    />
  );
}
