import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomepage } from "@/lib/api";
import { HotelCollectionView } from "@/components/hotel/HotelCollectionView";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

interface TileCollectionPageProps {
  params: Promise<{ tileId: string }>;
}

/**
 * Renders the hotels hand-picked on one Home page Destination Tile
 * (Content Manager -> Homepage -> Destinations -> Tiles -> Hotels). This is
 * the built-in destination a tile links to when its own `cta_href` is left
 * blank — reuses the same `HotelCollectionView` as the /hotels/[theme] pages.
 */
async function getTile(tileId: string) {
  const homepage = await getHomepage();
  return homepage.destinations?.tiles?.find((t) => String(t.id) === tileId) ?? null;
}

export async function generateMetadata({ params }: TileCollectionPageProps): Promise<Metadata> {
  const { tileId } = await params;
  const tile = await getTile(tileId);
  if (!tile) return { title: "Collection Not Found" };

  return buildMetadata({
    fallbackTitle: tile.label,
    fallbackDescription: `Explore ${tile.label.toLowerCase()} hand-picked by Sarovar Hotels.`,
    path: `/hotels/collection/${tileId}`,
  });
}

export default async function TileCollectionPage({ params }: TileCollectionPageProps) {
  const { tileId } = await params;
  const tile = await getTile(tileId);

  if (!tile || tile.is_enabled === false) notFound();

  return (
    <HotelCollectionView
      eyebrow="Explore Hotels"
      title={tile.label}
      hotels={tile.hotels ?? []}
      emptyMessage="No hotels have been added to this collection yet — check back soon."
    />
  );
}
