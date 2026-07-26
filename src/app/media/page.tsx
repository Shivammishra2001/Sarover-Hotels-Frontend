import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Media",
  fallbackDescription: "Press resources and media coverage for Sarovar Hotels.",
  path: "/media",
});

export default function MediaPage() {
  return (
    <StubLanding
      eyebrow="Press"
      title="Media"
      description="Press resources and media coverage for Sarovar Hotels."
    />
  );
}
