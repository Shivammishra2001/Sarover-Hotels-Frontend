import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getMediaUrl } from "@/lib/utils";
import type { Attraction } from "@/types";

export function NearbyList({ hotelSlug, attractions }: { hotelSlug: string; attractions: Attraction[] }) {
  if (attractions.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {attractions.map((attraction) => (
        <Link key={attraction.documentId} href={`/hotels/${hotelSlug}/nearby/${attraction.slug}`}>
          <Card className="flex h-full flex-col overflow-hidden p-0">
            {attraction.image_url && (
              <div className="aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getMediaUrl(attraction.image_url)}
                  alt={attraction.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold text-navy">{attraction.name}</h3>
              {attraction.distance_km && (
                <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                  {attraction.distance_km} km away
                </p>
              )}
              {attraction.description && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{attraction.description}</p>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
