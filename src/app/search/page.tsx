import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Search",
  fallbackDescription: "Search across hotels, destinations, and offers.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <StubLanding
      eyebrow="Search"
      title="Search"
      description="Search across hotels, destinations, and offers."
    />
  );
}
