import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Weekend Getaway Hotels",
  fallbackDescription: "Sarovar hotels perfect for a short break.",
  path: "/hotels/weekend-getaways",
});

export default function WeekendGetawaysPage() {
  return (
    <StubLanding
      eyebrow="Explore Hotels"
      title="Weekend Getaway Hotels"
      description="Sarovar hotels perfect for a short break."
    />
  );
}
