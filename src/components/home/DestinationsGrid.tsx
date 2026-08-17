import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Homepage, HomepageDestinationTile } from "@/types";

export function DestinationsGrid({
  totalHotels,
  totalDestinations,
  content,
}: {
  totalHotels?: number;
  totalDestinations?: number;
  content?: Homepage;
}) {
  if (content?.destinations?.is_enabled === false) return null;

  // Every tile is fully self-contained (own image, own hotels, own link) —
  // configured entirely from Content Manager -> Homepage -> Destinations ->
  // Tiles. A tile with no image and is_enabled !== false is skipped rather
  // than rendered blank; there is no destination/hotel-image fallback.
  const tiles = (content?.destinations?.tiles ?? []).filter(
    (tile): tile is HomepageDestinationTile => tile.is_enabled !== false && Boolean(tile.image?.url)
  );

  if (tiles.length === 0) return null;

  const topRow = tiles.slice(0, 3);
  const bottomRow = tiles.slice(3, 5);

  const description =
    totalHotels && totalDestinations
      ? `${totalHotels} Hotels in ${totalDestinations} Destinations Across India, Nepal and Africa`
      : "Hotels across destinations in India, Nepal and Africa";

  return (
    <section className="bg-muted py-20 sm:py-28">
      <Container>
        <HomeSectionHeading
          eyebrow={content?.destinations?.eyebrow ?? "Destinations"}
          title={content?.destinations?.title ?? "Explore Our Top Destinations"}
          description={description}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topRow.map((tile) => (
            <DestinationTile key={tile.id} tile={tile} aspect="aspect-[516/350]" />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bottomRow.map((tile) => (
            <DestinationTile key={tile.id} tile={tile} aspect="aspect-[787/350]" />
          ))}
        </div>

        <div className="mt-[26px] flex justify-center">
          <HomeCtaButton href="/destinations">{content?.destinations?.cta_label ?? "Explore More"}</HomeCtaButton>
        </div>
      </Container>
    </section>
  );
}

function DestinationTile({ tile, aspect }: { tile: HomepageDestinationTile; aspect: string }) {
  const imageSrc = tile.image?.url;
  // No admin-set link -> the built-in page listing this tile's own selected hotels.
  const href = tile.cta_href || `/hotels/collection/${tile.id}`;
  return (
    <Link
      href={href}
      className={`group relative block ${aspect} overflow-hidden rounded-2xl`}
    >
      {imageSrc ? (
        <Image
          src={getMediaUrl(imageSrc)}
          alt={tile.label}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={isUnoptimizedMediaUrl(getMediaUrl(imageSrc))}
        />
      ) : (
        <div className="h-full w-full bg-border" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white">{tile.label}</p>
    </Link>
  );
}
