import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, humanizeEnum, slugify } from "@/lib/utils";
import { Users } from "lucide-react";
import type { Room } from "@/types";

/**
 * Room detail pages (/hotels/{slug}/rooms/{room-slug}) already exist and crawl
 * fine, but this card previously rendered no link to them at all — 640 rooms
 * across 152 hotels were reachable only by guessing/constructing the URL
 * directly. `hotelSlug` is required so every render site links consistently.
 *
 * `basePath` is additive: the new `/{city}/{hotel}` tree passes its own base
 * so links resolve to the canonical URL, while the old `/hotels/{slug}` tree
 * (still live as a fallback) keeps building links from `hotelSlug` alone.
 */
export function RoomCard({
  room,
  hotelSlug,
  basePath,
  onEnquire,
}: {
  room: Room;
  hotelSlug: string;
  basePath?: string;
  onEnquire?: () => void;
}) {
  return (
    <Link href={`${basePath ?? `/hotels/${hotelSlug}`}/rooms/${slugify(room.name)}`} className="block">
      <Card className="flex flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">{room.name}</h3>
            {room.room_category && (
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                {humanizeEnum(room.room_category)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-semibold text-accent">
              {formatCurrency(room.base_price, room.currency)}
            </p>
            <p className="text-xs text-ink/50">per night</p>
          </div>
        </div>

        {room.description && <p className="mt-4 text-sm leading-relaxed text-ink/70">{room.description}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/70">
          <span className="flex items-center gap-1.5">
            <Users size={16} />
            {room.max_adults} adults{room.max_children ? ` + ${room.max_children} children` : ""}
          </span>
          {room.size_sqft && <span>{room.size_sqft} sq.ft</span>}
          <span>{humanizeEnum(room.bed_type)} bed</span>
        </div>

        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 6).map((amenity) => (
              <Badge key={amenity.documentId} tone="muted">
                {amenity.name}
              </Badge>
            ))}
          </div>
        )}

        {onEnquire && (
          <button
            type="button"
            onClick={(e) => {
              // the whole card is now a Link — stop the click reaching the anchor
              e.preventDefault();
              e.stopPropagation();
              onEnquire();
            }}
            className="mt-5 self-start rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy/90"
          >
            Enquire About This Room
          </button>
        )}
      </Card>
    </Link>
  );
}
