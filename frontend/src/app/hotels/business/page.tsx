import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Business Hotels";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()} across our portfolio.`,
  path: "/hotels/business",
});

export default async function BusinessPage() {
  const hotels = await getHotelsByTheme("business");
  return (
    <HotelCollectionView
      eyebrow="Explore Hotels"
      title={TITLE}
      hotels={hotels}
      emptyMessage="No hotels tagged for this collection yet — check back soon."
    />
  );
}
