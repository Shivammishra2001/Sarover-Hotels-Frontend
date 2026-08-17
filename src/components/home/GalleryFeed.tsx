import Image from "next/image";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import type { Homepage, HotelGallery } from "@/types";

export function GalleryFeed({
  images,
  content,
  instagramUrl,
}: {
  images: HotelGallery[];
  content?: Homepage;
  instagramUrl?: string;
}) {
  if (content?.gallery?.is_enabled === false) return null;
  if (images.length === 0) return null;

  const photos = images.slice(0, 6);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 text-center">
        <HomeSectionHeading
          eyebrow={content?.gallery?.eyebrow ?? "Instagram"}
          title={content?.gallery?.title ?? "@Sarovar Hotels"}
        />
        <a
          href={instagramUrl ?? siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#c1392a] hover:text-[#c1392a]/80"
        >
          <InstagramIcon width={18} height={18} />
          {content?.gallery?.cta_label ?? "Follow us on Instagram"}
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {photos.map((image) => {
          const imageSrc = pickMediaUrl(image.media, image.media_url);
          if (!imageSrc) return null;
          return (
            <div key={image.documentId} className="group relative aspect-square overflow-hidden">
              <Image
                src={getMediaUrl(imageSrc)}
                alt={image.alt_text ?? "Sarovar Hotels gallery"}
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized={isUnoptimizedMediaUrl(getMediaUrl(imageSrc))}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
