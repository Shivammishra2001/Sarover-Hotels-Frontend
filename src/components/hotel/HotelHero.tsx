import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { StarRating } from "@/components/ui/StarRating";
import { HotelQuickActions } from "@/components/hotel/HotelQuickActions";
import { formatCurrency, getMediaUrl, humanizeEnum, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Hotel } from "@/types";

// Figma node 1232:12297 hero band — breadcrumb; name/address with quick
// actions on the same row; then a 3-column strip (main photo / two stacked
// photos / a white info card holding the tagline, tags, check-in/out and
// starting-from rate box) — matching the design's exact column layout
// rather than stacking the info below the images.
export function HotelHero({ hotel, basePath }: { hotel: Hotel; basePath: string }) {
  const images = hotel.hotel_galleries ?? [];
  const cover = images.find((img) => img.is_cover) ?? images[0];
  const sideImages = images.filter((img) => img !== cover).slice(0, 2);

  const cheapestRoom = (hotel.rooms ?? [])
    .filter((room) => typeof room.base_price === "number" && room.base_price > 0)
    .sort((a, b) => (a.base_price ?? 0) - (b.base_price ?? 0))[0];

  const tags = [
    hotel.property_type ? humanizeEnum(hotel.property_type) : null,
    ...(hotel.themes ?? []).map((theme) => theme.name),
  ].filter((tag): tag is string => Boolean(tag));

  // The card's short tagline is a distinct piece of copy in Figma from the
  // longer "About This Hotel" paragraph — there's no separate CMS field for
  // it, so it's the first sentence of the real description, or a generic
  // fallback parameterised with the real city.
  const tagline =
    hotel.description?.split(/(?<=[.!?])\s/)[0] ??
    `Enjoy warm hospitality and contemporary comfort in ${hotel.destination?.city ?? "this destination"}.`;

  return (
    <section className="bg-white pb-14 pt-8">
      <Container>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#2d3e50]/70">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {hotel.destination?.slug && (
            <>
              <span>/</span>
              <Link href={`/destinations/${hotel.destination.slug}`} className="hover:text-accent">
                {hotel.destination.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#2d3e50]">{hotel.name}</span>
        </nav>

        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-2">
            {hotel.brand?.name && <p className="eyebrow text-accent">{hotel.brand.name}</p>}
            <h1 className="font-display text-4xl font-normal text-[#2d3e50] sm:text-5xl">{hotel.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <StarRating rating={hotel.star_rating} />
              {/* `address_line1` in this dataset is already a fully-formatted
                  address (frequently including the city/state) rather than a
                  bare street line — appending destination.city/state on top
                  of it duplicated the city name. Only fall back to building
                  an address from the destination when address_line1 is absent. */}
              {(hotel.address_line1 || hotel.destination?.city) && (
                <span className="flex items-center gap-1.5 text-base text-[#2d3e50]/80">
                  <MapPin size={16} />
                  {hotel.address_line1 ??
                    `${hotel.destination?.city}${hotel.destination?.state ? `, ${hotel.destination.state}` : ""}`}
                </span>
              )}
            </div>
          </div>

          <HotelQuickActions phone={hotel.phone} email={hotel.email} shareTitle={hotel.name} />
        </div>

        <div className="mt-8 grid gap-3 lg:aspect-[1716/607] lg:grid-cols-[732fr_396fr_588fr] lg:grid-rows-2">
          <div className="relative aspect-[732/607] overflow-hidden rounded-[24px] bg-navy lg:row-span-2 lg:aspect-auto lg:h-full">
            {cover?.media_url ? (
              <Image
                src={getMediaUrl(cover.media_url)}
                alt={cover.alt_text ?? hotel.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(cover.media_url))}
              />
            ) : null}
          </div>
          {/* Fixed aspect-ratio side photos don't reliably split into two
              equal halves of the row-spanning main photo's height across
              fluid container widths — sizing the outer grid to Figma's
              exact 1716:607 ratio and letting these stretch (h-full,
              aspect-auto) keeps them locked to precisely half each instead. */}
          {[0, 1].map((i) => (
            <div key={i} className="relative hidden overflow-hidden rounded-[24px] bg-navy lg:block lg:h-full">
              {sideImages[i]?.media_url ? (
                <Image
                  src={getMediaUrl(sideImages[i].media_url)}
                  alt={sideImages[i].alt_text ?? hotel.name}
                  fill
                  sizes="22vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(sideImages[i].media_url))}
                />
              ) : null}
            </div>
          ))}

          <div className="row-span-2 flex flex-col justify-between gap-4 overflow-hidden rounded-[24px] bg-[#fafaf5] p-8 lg:col-start-3 lg:row-start-1">
            <div className="flex flex-col gap-4">
              {/* Real descriptions run much longer than Figma's one-line
                  tagline copy — clamped so it can never blow out this
                  card's height (locked to match the photo column) and
                  push the rate box into the sticky nav below. */}
              <h2 className="font-display text-2xl font-normal leading-[1.3] text-[#2d3e50] line-clamp-4">
                {tagline}
              </h2>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#e1e1d8] bg-white px-5 py-3 text-sm font-semibold text-[#2d3e50]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              {(hotel.check_in_time || hotel.check_out_time) && (
                <>
                  <div className="h-px w-full bg-[#2d3e50]/15" />
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#2d3e50]/90">
                    {hotel.check_in_time && (
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Clock size={18} /> Check-in: {hotel.check_in_time.slice(0, 5)}
                      </span>
                    )}
                    {hotel.check_out_time && (
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Clock size={18} /> Check-out: {hotel.check_out_time.slice(0, 5)}
                      </span>
                    )}
                  </div>
                </>
              )}

              {cheapestRoom && Boolean(cheapestRoom.base_price) && (
                <a
                  href={`${basePath}#rooms`}
                  className="flex items-center justify-between rounded-[16px] border border-[#ded5c8] bg-white p-6 hover:border-accent"
                >
                  <div>
                    <p className="eyebrow text-[#192128]/70">Starting From</p>
                    <div className="mt-2 flex items-end gap-1 text-[#2d3e50]">
                      <span className="font-display text-3xl font-semibold">
                        {formatCurrency(cheapestRoom.base_price, cheapestRoom.currency)}
                      </span>
                      <span className="pb-1 text-sm opacity-90">/night</span>
                    </div>
                    <p className="mt-1 text-xs text-[#2d3e50]/60">Lowest rate for the next 60 days</p>
                  </div>
                  <ChevronRight className="shrink-0 text-[#2d3e50]/50" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
