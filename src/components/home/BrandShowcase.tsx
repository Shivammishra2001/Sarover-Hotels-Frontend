import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Brand, Homepage } from "@/types";

export function BrandShowcase({ brands, content }: { brands: Brand[]; content?: Homepage }) {
  if (content?.brands?.is_enabled === false) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 overflow-hidden rounded-2xl lg:grid-cols-2 lg:rounded-none lg:bg-transparent">
          {/* pb bumped up further than it looks like it should need — the
              53px heading (up from the old 4xl/36px) needs more clearance
              before the brand-card row's negative margin starts overlapping
              this box, or "Stronger Together." gets covered by the cards. */}
          <div className="rounded-2xl bg-navy px-8 py-12 text-white sm:px-12 sm:py-16 lg:pb-40">
            <HomeSectionHeading
              light
              align="left"
              eyebrow={content?.brands?.eyebrow ?? "Our Brands"}
              title={content?.brands?.title ?? "Stronger Together."}
            />
          </div>
          <div className="flex items-start px-2 pt-2 lg:pt-14">
            <p className="max-w-md text-lg leading-relaxed text-navy/70">
              {content?.brands?.intro ??
                "Together, our brands deliver exceptional hospitality experiences with comfort, quality, trust, and care."}
            </p>
          </div>
        </div>

        <div className="relative z-10 -mt-16 grid gap-6 sm:grid-cols-3 lg:-mt-24">
          {brands.map((brand) => {
            const logoSrc = pickMediaUrl(brand.logo, brand.logo_url);
            return (
            <div
              key={brand.documentId}
              className="flex flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-16 w-full">
                {logoSrc ? (
                  <Image
                    src={getMediaUrl(logoSrc)}
                    alt={brand.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                    unoptimized={isUnoptimizedMediaUrl(getMediaUrl(logoSrc))}
                  />
                ) : (
                  <p className="font-display text-lg font-semibold text-[#2d3e50]">{brand.name}</p>
                )}
              </div>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug text-[#2d3e50]">
                {brand.tagline ?? brand.name}
              </h3>
              {brand.description && (
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink/70">
                  {brand.description}
                </p>
              )}
            </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
