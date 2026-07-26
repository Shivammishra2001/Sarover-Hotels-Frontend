import type { Metadata } from "next";
import { getDestinationsByCategory } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Pilgrimage Destinations";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()}.`,
  path: "/destinations/pilgrimage",
});

export default async function PilgrimagePage() {
  const destinations = await getDestinationsByCategory("pilgrimage");
  return (
    <DestinationCollectionView
      eyebrow="Popular Destinations"
      title={TITLE}
      destinations={destinations}
      emptyMessage="No destinations tagged for this category yet — check back soon."
    />
  );
}
