import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Pet Friendly Hotels";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()} across our portfolio.`,
  path: "/hotels/pet-friendly",
});

export default async function PetFriendlyPage() {
  const hotels = await getHotelsByTheme("pet-friendly");
  return (
    <HotelCollectionView
      eyebrow="Explore Hotels"
      title={TITLE}
      hotels={hotels}
      emptyMessage="No hotels tagged for this collection yet — check back soon."
    />
  );
}
