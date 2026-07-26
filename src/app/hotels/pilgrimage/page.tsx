import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Pilgrimage Hotels";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()} across our portfolio.`,
  path: "/hotels/pilgrimage",
});

export default async function PilgrimagePage() {
  const hotels = await getHotelsByTheme("pilgrimage");
  return (
    <HotelCollectionView
      eyebrow="Explore Hotels"
      title={TITLE}
      hotels={hotels}
      emptyMessage="No hotels tagged for this collection yet — check back soon."
    />
  );
}
