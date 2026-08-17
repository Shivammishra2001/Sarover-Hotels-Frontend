import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Homepage, Offer } from "@/types";

export function OffersCarousel({ offers, content }: { offers: Offer[]; content?: Homepage }) {
  if (content?.offers?.is_enabled === false) return null;
  if (offers.length === 0) return null;

  const tiles = offers.slice(0, content?.offers?.max_items ?? 4);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <HomeSectionHeading
          eyebrow={content?.offers?.eyebrow ?? "Exclusive Offers"}
          title={content?.offers?.title ?? "Special Offers & Packages"}
        />

        <div className="mt-10 grid grid-cols-2 gap-1 rounded-3xl sm:grid-cols-4">
          {tiles.map((offer) => {
            const bannerSrc = pickMediaUrl(offer.banner, offer.banner_url);
            return (
            <Link
              key={offer.documentId}
              href={`/offers/${offer.slug}`}
              className="group relative flex h-[420px] items-end overflow-hidden rounded-2xl bg-navy transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.04] sm:h-[500px] lg:h-[620px]"
            >
              {bannerSrc ? (
                <Image
                  src={getMediaUrl(bannerSrc)}
                  alt={offer.title}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(bannerSrc))}
                />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

              {/* Rest state: just the vertical title, matching the Figma default look. */}
              <span className="relative m-6 font-display text-lg font-bold uppercase tracking-wide text-white [writing-mode:vertical-rl] transition-opacity duration-300 group-hover:opacity-0">
                {offer.title}
              </span>

              {/* Hover state: fades/slides in over the same card — title (now horizontal),
                  description, and an Explore More CTA. */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-3 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{offer.title}</p>
                {offer.description ? (
                  <p className="line-clamp-3 text-sm text-white/80">{offer.description}</p>
                ) : null}
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#c1392a] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.6px] text-white transition-colors group-hover:bg-[#c1392a]/90">
                  Explore More
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
