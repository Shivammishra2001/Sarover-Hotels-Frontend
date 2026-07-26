import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Wedding Destinations & Venues";
const DESCRIPTION = "Hotels equipped to host your wedding.";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: DESCRIPTION,
  path: "/experiences/wedding-hotels",
});

export default async function WeddingHotelsPage() {
  const hotels = await getHotelsByTheme("wedding");
  return (
    <HotelCollectionView
      eyebrow="Experiences"
      title={TITLE}
      description={DESCRIPTION}
      hotels={hotels}
      emptyMessage="No hotels tagged for this collection yet — check back soon."
    />
  );
}
