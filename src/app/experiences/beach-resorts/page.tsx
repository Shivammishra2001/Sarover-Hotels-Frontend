import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Beach Resorts";
const DESCRIPTION = "Sarovar resorts by the coast.";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: DESCRIPTION,
  path: "/experiences/beach-resorts",
});

export default async function BeachResortsPage() {
  const hotels = await getHotelsByTheme("beach");
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
