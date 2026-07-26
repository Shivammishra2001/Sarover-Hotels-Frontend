import type { Metadata } from "next";
import { getDestinationsByCategory } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

const TITLE = "International Destinations";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: TITLE,
  fallbackDescription: `Explore ${TITLE.toLowerCase()}.`,
  path: "/destinations/international",
});

export default async function InternationalPage() {
  const destinations = await getDestinationsByCategory("international");
  return (
    <DestinationCollectionView
      eyebrow="Popular Destinations"
      title={TITLE}
      destinations={destinations}
      emptyMessage="No destinations tagged for this category yet — check back soon."
    />
  );
}
