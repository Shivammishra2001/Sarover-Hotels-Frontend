import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Boutique Hotels";
const DESCRIPTION = "Smaller, characterful boutique properties.";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: DESCRIPTION,
  path: "/experiences/boutique-hotels",
});

export default async function BoutiqueHotelsPage() {
  const hotels = await getHotelsByTheme("boutique");
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
