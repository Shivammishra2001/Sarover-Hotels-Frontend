import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getMediaUrl, cn } from "@/lib/utils";
import type { Offer } from "@/types";

const GRID_COLS_BY_COUNT: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export function OffersCarousel({ offers }: { offers: Offer[] }) {
  if (offers.length === 0) return null;

  const tiles = offers.slice(0, 4);
  const gridColsClass = GRID_COLS_BY_COUNT[tiles.length] ?? "sm:grid-cols-4";

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Exclusive Offers"
          title="Special Offers & Packages"
          align="center"
        />

        <div
          className={cn(
            "mt-10 grid grid-cols-2 overflow-hidden rounded-3xl shadow-sm",
            gridColsClass
          )}
        >
          {tiles.map((offer) => (
            <Link
              key={offer.documentId}
              href={`/offers/${offer.slug}`}
              className="group relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[620px]"
            >
              {offer.banner_url ? (
                <Image
                  src={getMediaUrl(offer.banner_url)}
                  alt={offer.title}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-6 left-6 font-display text-lg font-bold text-white [writing-mode:vertical-rl]">
                {offer.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
