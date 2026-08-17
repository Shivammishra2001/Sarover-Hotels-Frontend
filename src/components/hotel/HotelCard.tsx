import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { getMediaUrl, humanizeEnum, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Hotel } from "@/types";

export function HotelCard({ hotel, href }: { hotel: Hotel; href?: string }) {
  const cover =
    hotel.hotel_galleries?.find((item) => item.is_cover) ?? hotel.hotel_galleries?.[0];
  const coverSrc = cover ? pickMediaUrl(cover.media, cover.media_url) : undefined;
  const startingPrice = hotel.rooms?.length
    ? Math.min(...hotel.rooms.map((room) => room.base_price))
    : undefined;
  // `href` lets city-hub pages point at the new canonical `hotel.path`
  // (`/{city}/{hotel}/`) — the old `/hotels/{slug}` tree still relies on the default.
  const target = href ?? `/hotels/${hotel.slug}`;

  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={target} className="relative block aspect-[4/3] overflow-hidden">
        {coverSrc ? (
          <Image
            src={getMediaUrl(coverSrc)}
            alt={cover?.alt_text ?? hotel.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(coverSrc))}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        {hotel.is_featured && (
          <Badge tone="gold" className="absolute left-4 top-4">
            Featured
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {hotel.brand?.name && (
          <p className="eyebrow text-accent">{hotel.brand.name}</p>
        )}
        <Link href={target}>
          <h3 className="mt-1 font-display text-lg font-semibold text-navy">{hotel.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-3 text-sm text-ink/60">
          {hotel.destination?.city && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {hotel.destination.city}
            </span>
          )}
          <StarRating rating={hotel.star_rating} />
        </div>
        {hotel.property_type && (
          <p className="mt-2 text-xs text-ink/50">{humanizeEnum(hotel.property_type)}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          {startingPrice !== undefined ? (
            <p className="text-sm text-ink/70">
              from <span className="font-semibold text-navy">₹{startingPrice.toLocaleString("en-IN")}</span>
              <span className="text-xs">/night</span>
            </p>
          ) : (
            <span />
          )}
          <Link href={target} className="text-sm font-semibold text-accent hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
}
