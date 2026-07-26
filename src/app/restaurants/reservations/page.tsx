import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Reservations",
  fallbackDescription: "Reserve a table at a Sarovar restaurant.",
  path: "/restaurants/reservations",
});

export default function ReservationsPage() {
  return (
    <StubLanding
      eyebrow="Restaurants"
      title="Reservations"
      description="Reserve a table at a Sarovar restaurant."
    />
  );
}
