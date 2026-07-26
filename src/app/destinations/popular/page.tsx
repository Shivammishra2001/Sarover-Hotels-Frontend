import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Popular Destinations",
  fallbackDescription: "The most-booked Sarovar destinations.",
  path: "/destinations/popular",
});

export default function PopularPage() {
  return (
    <StubLanding
      eyebrow="Popular Destinations"
      title="Popular Destinations"
      description="The most-booked Sarovar destinations."
    />
  );
}
