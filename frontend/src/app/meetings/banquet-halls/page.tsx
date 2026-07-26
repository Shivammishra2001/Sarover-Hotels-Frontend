import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Banquet Halls",
  fallbackDescription: "Banquet halls suited for events of every size.",
  path: "/meetings/banquet-halls",
});

export default function BanquetHallsPage() {
  return (
    <StubLanding
      eyebrow="Meetings & Events"
      title="Banquet Halls"
      description="Banquet halls suited for events of every size."
    />
  );
}
