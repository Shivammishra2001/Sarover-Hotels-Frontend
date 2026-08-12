import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Offer } from "@/types";

export function OffersCarousel({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  const tiles = offers.slice(0, 4);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <HomeSectionHeading eyebrow="Exclusive Offers" title="Special Offers & Packages" />

        <div className="mt-10 grid grid-cols-2 gap-1 overflow-hidden rounded-3xl sm:grid-cols-4">
          {tiles.map((offer) => (
            <Link
              key={offer.documentId}
              href={`/offers/${offer.slug}`}
              className="group relative flex h-[420px] items-end overflow-hidden rounded-2xl bg-navy sm:h-[500px] lg:h-[620px]"
            >
              {offer.banner_url ? (
                <Image
                  src={getMediaUrl(offer.banner_url)}
                  alt={offer.title}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(offer.banner_url))}
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="relative m-6 font-display text-lg font-bold uppercase tracking-wide text-white [writing-mode:vertical-rl]">
                {offer.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
