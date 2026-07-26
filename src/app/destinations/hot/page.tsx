import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Hot Destinations",
  fallbackDescription: "Trending-right-now Sarovar destinations.",
  path: "/destinations/hot",
});

export default function HotPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Hot Destinations"
      description="Trending-right-now Sarovar destinations."
    />
  );
}
