import Image from "next/image";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Homepage, HotelGallery } from "@/types";

export function WeddingsCTA({
  images = [],
  content,
}: {
  images?: HotelGallery[];
  content?: Homepage;
}) {
  if (content?.weddings?.is_enabled === false) return null;

  const [mainImage, ...thumbs] = images;
  // Prefer operator-chosen images (Content Manager -> Homepage -> Weddings)
  // over the arbitrary gallery-sample photos passed in as a fallback.
  const mainImageSrc =
    pickMediaUrl(content?.weddings?.main_image, undefined) ?? pickMediaUrl(mainImage?.media, mainImage?.media_url);
  const configuredThumbnails = content?.weddings?.thumbnails ?? [];
  const eyebrow = content?.weddings?.eyebrow ?? "Weddings @ Sarovar Hotels";
  const title = content?.weddings?.title ?? "Create Your Own Story";
  const body =
    content?.weddings?.body ??
    "Turn every journey into a memorable experience with stays crafted around comfort, discovery, and delight.";
  const ctaLabel = content?.weddings?.cta_label ?? "Explore More";
  const ctaHref = content?.weddings?.cta_href ?? "/weddings-events";

  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative aspect-[4/3] bg-navy lg:aspect-auto">
        {mainImageSrc && (
          <Image
            src={getMediaUrl(mainImageSrc)}
            alt={mainImage?.alt_text ?? "A couple celebrating their wedding at a Sarovar hotel"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImageSrc))}
          />
        )}
      </div>

      <div className="flex flex-col justify-between gap-10 bg-navy p-8 text-white sm:p-12 lg:p-16">
        <div>
          <HomeSectionHeading light align="left" eyebrow={eyebrow} title={title} />
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">{body}</p>
          <div className="mt-8">
            <HomeCtaButton href={ctaHref}>{ctaLabel}</HomeCtaButton>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {configuredThumbnails.length > 0
            ? configuredThumbnails.slice(0, 3).map((thumb) => (
                <div key={thumb.id ?? thumb.url} className="relative aspect-square overflow-hidden rounded-lg bg-navy/60">
                  <Image
                    src={getMediaUrl(thumb.url)}
                    alt="Wedding celebration moment at a Sarovar venue"
                    fill
                    sizes="150px"
                    className="object-cover"
                    unoptimized={isUnoptimizedMediaUrl(getMediaUrl(thumb.url))}
                  />
                </div>
              ))
            : thumbs.slice(0, 3).map((thumb) => {
                const thumbSrc = pickMediaUrl(thumb.media, thumb.media_url);
                if (!thumbSrc) return null;
                return (
                  <div key={thumb.documentId} className="relative aspect-square overflow-hidden rounded-lg bg-navy/60">
                    <Image
                      src={getMediaUrl(thumbSrc)}
                      alt={thumb.alt_text ?? "Wedding celebration moment at a Sarovar venue"}
                      fill
                      sizes="150px"
                      className="object-cover"
                      unoptimized={isUnoptimizedMediaUrl(getMediaUrl(thumbSrc))}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
