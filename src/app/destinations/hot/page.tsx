import type { Metadata } from "next";
import { getDestinationsByCategory } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Hot Destinations";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()}.`,
  path: "/destinations/hot",
});

export default async function HotPage() {
  const destinations = await getDestinationsByCategory("hot");
  return (
    <DestinationCollectionView
      eyebrow="Popular Destinations"
      title={TITLE}
      destinations={destinations}
      emptyMessage="No destinations tagged for this category yet — check back soon."
    />
  );
}
