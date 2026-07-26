import type { Metadata } from "next";
import { getDestinationsByCategory } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Trending Cities";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()}.`,
  path: "/destinations/trending",
});

export default async function TrendingPage() {
  const destinations = await getDestinationsByCategory("trending");
  return (
    <DestinationCollectionView
      eyebrow="Popular Destinations"
      title={TITLE}
      destinations={destinations}
      emptyMessage="No destinations tagged for this category yet — check back soon."
    />
  );
}
