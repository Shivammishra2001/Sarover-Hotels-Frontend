import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Destination } from "@/types";

/** Shared renderer for /destinations/[category]/ — a curated destination grid,
 * matching the existing /destinations index page's card markup exactly
 * (neutral bg-muted placeholder, never a logo, when hero_image_url is absent). */
export function DestinationCollectionView({
  eyebrow,
  title,
  description,
  destinations,
  emptyMessage,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  destinations: Destination[];
  emptyMessage: string;
}) {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {destinations.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.documentId}
                href={`/destinations/${destination.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                {destination.hero_image_url ? (
                  <Image
                    src={getMediaUrl(destination.hero_image_url)}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized={isUnoptimizedMediaUrl(getMediaUrl(destination.hero_image_url))}
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="font-display text-xl font-semibold">{destination.name}</p>
                  <p className="text-sm text-white/80">
                    {destination.hotels?.length ?? 0} hotel{(destination.hotels?.length ?? 0) === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">{emptyMessage}</p>
        )}
      </Container>
    </div>
  );
}
