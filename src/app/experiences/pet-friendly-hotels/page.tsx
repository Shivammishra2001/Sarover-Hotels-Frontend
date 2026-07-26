import type { Metadata } from "next";
import { getHotelsByTheme } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Stays That Welcome Your Pets";
const DESCRIPTION = "Hotels that welcome your pets.";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: DESCRIPTION,
  path: "/experiences/pet-friendly-hotels",
});

export default async function PetFriendlyHotelsPage() {
  const hotels = await getHotelsByTheme("pet-friendly");
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
