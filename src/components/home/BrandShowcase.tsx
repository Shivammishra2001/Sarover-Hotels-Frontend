import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Brand } from "@/types";

export function BrandShowcase({ brands }: { brands: Brand[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 overflow-hidden rounded-2xl lg:grid-cols-2 lg:rounded-none lg:bg-transparent">
          <div className="rounded-2xl bg-navy px-8 py-12 text-white sm:px-12 sm:py-16 lg:pb-28">
            <p className="eyebrow text-white/70">Our Brands</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-white">Stronger Together.</h2>
          </div>
          <div className="flex items-start px-2 pt-2 lg:pt-14">
            <p className="max-w-md text-lg leading-relaxed text-navy/70">
              Together, our brands deliver exceptional hospitality experiences with comfort,
              quality, trust, and care.
            </p>
          </div>
        </div>

        <div className="relative z-10 -mt-16 grid gap-6 sm:grid-cols-3 lg:-mt-24">
          {brands.map((brand) => (
            <div
              key={brand.documentId}
              className="flex flex-col items-center rounded-2xl bg-surface p-8 text-center shadow-lg"
            >
              <div className="relative h-16 w-full">
                {brand.logo_url ? (
                  <Image
                    src={getMediaUrl(brand.logo_url)}
                    alt={brand.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                    unoptimized={isUnoptimizedMediaUrl(getMediaUrl(brand.logo_url))}
                  />
                ) : (
                  <p className="font-display text-lg font-semibold text-navy">{brand.name}</p>
                )}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug text-navy">
                {brand.tagline ?? brand.name}
              </h3>
              {brand.description && (
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink/70">
                  {brand.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
