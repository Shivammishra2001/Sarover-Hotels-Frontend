import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Private Dining",
  fallbackDescription: "Private dining experiences at Sarovar hotels.",
  path: "/restaurants/private-dining",
});

export default function PrivateDiningPage() {
  return (
    <StubLanding
      eyebrow="Restaurants"
      title="Private Dining"
      description="Private dining experiences at Sarovar hotels."
    />
  );
}
