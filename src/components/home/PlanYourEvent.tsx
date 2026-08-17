import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Banquet, Homepage, HotelGallery } from "@/types";

// Banquets have no image field of their own, so the two side tiles borrow
// real gallery photos from the featured-hotels fetch already made on the
// homepage — genuine CMS photography, not a placeholder.
export function PlanYourEvent({
  banquets,
  images = [],
  content,
}: {
  banquets: Banquet[];
  images?: HotelGallery[];
  content?: Homepage;
}) {
  if (content?.plan_event?.is_enabled === false) return null;
  if (banquets.length === 0) return null;

  const featuredDescription = banquets[0]?.description;
  const [mainImage, sideImageA, sideImageB] = images;
  // Prefer operator-chosen images (Content Manager -> Homepage -> Plan Event)
  // over the arbitrary gallery-sample photos passed in as a fallback.
  const mainImageSrc =
    pickMediaUrl(content?.plan_event?.main_image, undefined) ?? pickMediaUrl(mainImage?.media, mainImage?.media_url);
  const sideImageASrc =
    pickMediaUrl(content?.plan_event?.side_image_a, undefined) ??
    pickMediaUrl(sideImageA?.media, sideImageA?.media_url);
  const sideImageBSrc =
    pickMediaUrl(content?.plan_event?.side_image_b, undefined) ??
    pickMediaUrl(sideImageB?.media, sideImageB?.media_url);
  const cardHeading = content?.plan_event?.card_heading ?? "Happy Happenings";
  const cardSubheading = content?.plan_event?.card_subheading ?? "@Sarovar Hotel";
  const ctaLabel = content?.plan_event?.cta_label ?? "Explore More";
  const ctaHref = content?.plan_event?.cta_href ?? "/weddings-events";

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <HomeSectionHeading
          eyebrow={content?.plan_event?.eyebrow ?? "Events"}
          title={content?.plan_event?.title ?? "Plan Your Perfect Event"}
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[3fr_1fr_1fr]">
          <div className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
            <div className="relative aspect-[4/3] bg-navy sm:aspect-auto">
              {mainImageSrc && (
                <Image
                  src={getMediaUrl(mainImageSrc)}
                  alt={mainImage?.alt_text ?? "A Sarovar banquet hall set for an event"}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImageSrc))}
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h3 className="font-display text-xl font-bold text-[#2d3e50]">{cardHeading}</h3>
              <p className="font-display text-xl font-bold text-[#c1392a]">{cardSubheading}</p>
              {featuredDescription && (
                <p className="mt-4 line-clamp-4 text-base leading-relaxed text-[#2d3e50]/80">
                  {featuredDescription}
                </p>
              )}
              <Link
                href={ctaHref}
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c1392a] px-6 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.78px] text-white transition-colors hover:bg-[#c1392a]/90"
              >
                {ctaLabel}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl bg-navy sm:block">
            {sideImageASrc && (
              <Image
                src={getMediaUrl(sideImageASrc)}
                alt={sideImageA?.alt_text ?? "Fine dining at a Sarovar event"}
                fill
                sizes="20vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(sideImageASrc))}
              />
            )}
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl bg-navy sm:block">
            {sideImageBSrc && (
              <Image
                src={getMediaUrl(sideImageBSrc)}
                alt={sideImageB?.alt_text ?? "A grand Sarovar event venue exterior at dusk"}
                fill
                sizes="20vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(sideImageBSrc))}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
