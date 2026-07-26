import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Hotels for Business Travelers";
const DESCRIPTION = "Hotels suited for business travellers.";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: DESCRIPTION,
  path: "/experiences/business-hotels",
});

export default async function BusinessHotelsPage() {
  const hotels = await getHotelsByTheme("business");
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
