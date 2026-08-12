import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Banquet, HotelGallery } from "@/types";

// Banquets have no image field of their own, so the two side tiles borrow
// real gallery photos from the featured-hotels fetch already made on the
// homepage — genuine CMS photography, not a placeholder.
export function PlanYourEvent({
  banquets,
  images = [],
}: {
  banquets: Banquet[];
  images?: HotelGallery[];
}) {
  if (banquets.length === 0) return null;

  const featuredDescription = banquets[0]?.description;
  const [mainImage, sideImageA, sideImageB] = images;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <HomeSectionHeading eyebrow="Events" title="Plan Your Perfect Event" />

        <div className="mt-10 grid gap-5 lg:grid-cols-[3fr_1fr_1fr]">
          <div className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
            <div className="relative aspect-[4/3] bg-navy sm:aspect-auto">
              {mainImage?.media_url && (
                <Image
                  src={getMediaUrl(mainImage.media_url)}
                  alt={mainImage.alt_text ?? "A Sarovar banquet hall set for an event"}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImage.media_url))}
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h3 className="font-display text-xl font-bold text-[#2d3e50]">Happy Happenings</h3>
              <p className="font-display text-xl font-bold text-[#c1392a]">@Sarovar Hotel</p>
              {featuredDescription && (
                <p className="mt-4 line-clamp-4 text-base leading-relaxed text-[#2d3e50]/80">
                  {featuredDescription}
                </p>
              )}
              <Link
                href="/weddings-events"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#c1392a] px-6 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.78px] text-white transition-colors hover:bg-[#c1392a]/90"
              >
                Explore More
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl bg-navy sm:block">
            {sideImageA?.media_url && (
              <Image
                src={getMediaUrl(sideImageA.media_url)}
                alt={sideImageA.alt_text ?? "Fine dining at a Sarovar event"}
                fill
                sizes="20vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(sideImageA.media_url))}
              />
            )}
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl bg-navy sm:block">
            {sideImageB?.media_url && (
              <Image
                src={getMediaUrl(sideImageB.media_url)}
                alt={sideImageB.alt_text ?? "A grand Sarovar event venue exterior at dusk"}
                fill
                sizes="20vw"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(sideImageB.media_url))}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
