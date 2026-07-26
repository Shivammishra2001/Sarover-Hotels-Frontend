import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Experiences",
  fallbackDescription: "Discover Sarovar hotels curated by the kind of trip you are planning.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <StubLanding
      eyebrow="Curated Stays"
      title="Experiences"
      description="Discover Sarovar hotels curated by the kind of trip you are planning."
    />
  );
}
