import Image from "next/image";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

export function WeddingsCTA({ images = [] }: { images?: HotelGallery[] }) {
  const [mainImage, ...thumbs] = images;

  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative aspect-[4/3] bg-navy lg:aspect-auto">
        {mainImage?.media_url && (
          <Image
            src={getMediaUrl(mainImage.media_url)}
            alt={mainImage.alt_text ?? "A couple celebrating their wedding at a Sarovar hotel"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(mainImage.media_url))}
          />
        )}
      </div>

      <div className="flex flex-col justify-between gap-10 bg-navy p-8 text-white sm:p-12 lg:p-16">
        <div>
          <HomeSectionHeading light align="left" eyebrow="Weddings @ Sarovar Hotels" title="Create Your Own Story" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            Turn every journey into a memorable experience with stays crafted around comfort,
            discovery, and delight.
          </p>
          <div className="mt-8">
            <HomeCtaButton href="/weddings-events">Explore More</HomeCtaButton>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {thumbs.slice(0, 3).map((thumb) => (
            <div key={thumb.documentId} className="relative aspect-square overflow-hidden rounded-lg bg-navy/60">
              <Image
                src={getMediaUrl(thumb.media_url)}
                alt={thumb.alt_text ?? "Wedding celebration moment at a Sarovar venue"}
                fill
                sizes="150px"
                className="object-cover"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(thumb.media_url))}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
