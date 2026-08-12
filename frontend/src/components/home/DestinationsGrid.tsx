import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Destination, RegionTag } from "@/types";

// Figma shows 5 experience-category tiles rather than literal destination
// names. Three map cleanly to the existing `region_tag` field; the last two
// ("Weekend Getaway", "Wedding Hotels") have no matching field in the data
// model, so a reasonable real destination stands in for each (flagged below).
// Every tile still links to a real /destinations/[slug] page.
const CATEGORIES: { label: string; regionTag?: RegionTag; fallbackSlug?: string }[] = [
  { label: "Hotels in Hills", regionTag: "hill_station" },
  { label: "Hotels in Beaches", regionTag: "coastal" },
  { label: "Hotels in Pilgrimages", regionTag: "pilgrimage" },
  { label: "Weekend Getaway Hotels", fallbackSlug: "delhi" }, // no "trip purpose" field exists; approximated
  { label: "Wedding Hotels", fallbackSlug: "jaipur" }, // approximated — heritage destination stands in
];

export function DestinationsGrid({
  destinations,
  totalHotels,
  totalDestinations,
}: {
  destinations: Destination[];
  totalHotels?: number;
  totalDestinations?: number;
}) {
  const tiles = CATEGORIES.map((category) => {
    const destination = category.regionTag
      ? destinations.find((d) => d.region_tag === category.regionTag)
      : destinations.find((d) => d.slug === category.fallbackSlug);
    return destination ? { ...category, destination } : null;
  }).filter((tile): tile is { label: string; regionTag?: RegionTag; fallbackSlug?: string; destination: Destination } => tile !== null);

  if (tiles.length === 0) return null;

  const topRow = tiles.slice(0, 3);
  const bottomRow = tiles.slice(3, 5);

  const description =
    totalHotels && totalDestinations
      ? `${totalHotels} Hotels in ${totalDestinations} Destinations Across India, Nepal and Africa`
      : "Hotels across destinations in India, Nepal and Africa";

  return (
    <section className="bg-muted py-20 sm:py-15 bg1">
      <Container>
        <HomeSectionHeading eyebrow="Destinations" title="Explore Our Top Destinations" description={description} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topRow.map((tile) => (
            <DestinationTile key={tile.label} tile={tile} aspect="aspect-[516/350]" />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bottomRow.map((tile) => (
            <DestinationTile key={tile.label} tile={tile} aspect="aspect-[787/350]" />
          ))}
        </div>

        <div className="mt-[26px] flex justify-center">
          <HomeCtaButton href="/destinations">Explore More</HomeCtaButton>
        </div>
      </Container>
    </section>
  );
}

function DestinationTile({
  tile,
  aspect,
}: {
  tile: { label: string; destination: Destination };
  aspect: string;
}) {
  const { label, destination } = tile;
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`group relative block ${aspect} overflow-hidden rounded-2xl`}
    >
      {destination.hero_image_url ? (
        <Image
          src={getMediaUrl(destination.hero_image_url)}
          alt={label}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={isUnoptimizedMediaUrl(getMediaUrl(destination.hero_image_url))}
        />
      ) : (
        <div className="h-full w-full bg-border" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white">{label}</p>
    </Link>
  );
}
