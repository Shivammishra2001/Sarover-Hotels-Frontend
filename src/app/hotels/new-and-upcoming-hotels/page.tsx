import type { Metadata } from "next";
import { getUpcomingHotels } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "New & Upcoming Hotels",
  fallbackDescription: "Discover our newest and soon-to-open Sarovar properties.",
  path: "/hotels/new-and-upcoming-hotels",
});

export default async function NewAndUpcomingHotelsPage() {
  const hotels = await getUpcomingHotels();
  return (
    <HotelCollectionView
      eyebrow="Explore Hotels"
      title="New & Upcoming Hotels"
      description="Discover our newest and soon-to-open Sarovar properties."
      hotels={hotels}
      emptyMessage="No upcoming hotels flagged yet — check back soon."
    />
  );
}
