import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Reservations",
  fallbackDescription: "Reserve a table at a Sarovar restaurant.",
  path: "/restaurants/reservations",
});

export default function ReservationsPage() {
  return (
    <CmsBackedPage
      path="/restaurants/reservations/"
      eyebrow="Restaurants"
      title="Reservations"
      description="Reserve a table at a Sarovar restaurant."
    />
  );
}
