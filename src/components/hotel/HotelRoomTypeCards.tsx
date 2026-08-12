import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BedDouble } from "lucide-react";
import { AmenityIcon } from "@/lib/amenityIcon";
import { getMediaUrl, humanizeEnum, isUnoptimizedMediaUrl, slugify } from "@/lib/utils";
import type { HotelGallery, Room } from "@/types";

// Figma node 1301:3593 etc. — three big room-type cards (photo, tagline,
// title, guest/bed/amenity meta row, "View more"). Figma's meta row shows
// fixed "Bathtub Available" / "City View" chips; those aren't real fields,
// so the last two chips here are the room's own top amenities instead.
export function HotelRoomTypeCards({
  rooms,
  gallery,
  basePath,
}: {
  rooms: Room[];
  gallery: HotelGallery[];
  basePath: string;
}) {
  if (rooms.length === 0) return null;

  const roomPhotos = gallery.filter((img) => img.category === "room");

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {rooms.map((room, index) => {
        const photo = roomPhotos[index % Math.max(roomPhotos.length, 1)];
        const extraAmenities = (room.amenities ?? []).slice(0, 2);

        return (
          <div
            key={`${room.documentId}-${index}`}
            className="flex flex-col overflow-hidden rounded-[24px] border border-[#eae4dc] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="relative aspect-[509/296] w-full bg-muted">
              {photo?.media_url && (
                <Image
                  src={getMediaUrl(photo.media_url)}
                  alt={photo.alt_text ?? room.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(photo.media_url))}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-5 p-8">
              <div>
                {room.room_category && <p className="eyebrow text-accent">{humanizeEnum(room.room_category)}</p>}
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#1e1e1e]">{room.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#2d3e50]/80">
                <span className="flex items-center gap-2">
                  <Users size={20} className="text-accent" />
                  Up to {room.max_adults + (room.max_children ?? 0)} Guests
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble size={20} className="text-accent" />
                  {humanizeEnum(room.bed_type)} Bed
                </span>
                {extraAmenities.map((amenity, amenityIndex) => (
                  <span key={`${amenity.documentId}-${amenityIndex}`} className="flex items-center gap-2">
                    <AmenityIcon category={amenity.category} size={20} className="text-accent" />
                    {amenity.name}
                  </span>
                ))}
              </div>

              <Link
                href={`${basePath}/rooms/${slugify(room.name)}`}
                className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
              >
                View More
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
