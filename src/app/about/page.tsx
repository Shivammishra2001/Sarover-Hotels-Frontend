import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { GuidedByValues } from "@/components/about/GuidedByValues";
import { OurPhilosophy } from "@/components/about/OurPhilosophy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "About Us",
  fallbackDescription:
    "For over three decades, Sarovar Hotels has delivered heartfelt hospitality through exceptional stays across India, Nepal and Africa.",
  path: "/about",
});

// Bespoke composition mirroring the Figma "About Us" design (node 2950:81130),
// same pattern as HomePage — hand-built sections rather than CmsBackedPage.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <GuidedByValues />
      <OurPhilosophy />
    </>
  );
}
