import type { Metadata } from "next";
import { getDestinationsByCategory } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Weekend Destinations";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()}.`,
  path: "/destinations/weekend",
});

export default async function WeekendPage() {
  const destinations = await getDestinationsByCategory("weekend");
  return (
    <DestinationCollectionView
      eyebrow="Popular Destinations"
      title={TITLE}
      destinations={destinations}
      emptyMessage="No destinations tagged for this category yet — check back soon."
    />
  );
}
