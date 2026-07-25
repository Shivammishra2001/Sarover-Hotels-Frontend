import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { StarRating } from "@/components/ui/StarRating";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Hotel } from "@/types";

export function FeaturedHotelSpotlight({ hotel }: { hotel: Hotel }) {
  const cover = hotel.hotel_galleries?.find((item) => item.is_cover) ?? hotel.hotel_galleries?.[0];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
            <div className="relative order-2 aspect-[4/3] lg:order-1 lg:aspect-auto">
              {cover?.media_url && (
                <Image
                  src={getMediaUrl(cover.media_url)}
                  alt={hotel.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(cover.media_url))}
                />
              )}
            </div>
            <div className="order-1 flex flex-col justify-center p-8 text-white sm:p-12 lg:order-2 lg:p-16">
              <p className="eyebrow text-gold">Signature Hotel</p>
              <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">{hotel.name}</h2>
              <div className="mt-3">
                <StarRating rating={hotel.star_rating} />
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
                {hotel.description}
              </p>
              <div className="mt-8">
                <Button href={`/hotels/${hotel.slug}`} variant="primary">
                  Discover This Hotel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
