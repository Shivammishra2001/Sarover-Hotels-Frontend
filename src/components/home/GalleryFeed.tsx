import Image from "next/image";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getMediaUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import type { HotelGallery } from "@/types";

export function GalleryFeed({ images }: { images: HotelGallery[] }) {
  if (images.length === 0) return null;

  const photos = images.slice(0, 5);

  return (
    <section className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Instagram"
        title="@Sarovar Hotels"
        align="center"
        className="mx-auto px-4"
      />

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {photos.map((image) => (
          <div key={image.documentId} className="group relative aspect-square overflow-hidden">
            <Image
              src={getMediaUrl(image.media_url)}
              alt={image.alt_text ?? "Sarovar Hotels gallery"}
              fill
              sizes="(min-width: 1024px) 16vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Sarovar Hotels on Instagram"
          className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white text-white">
            <InstagramIcon width={24} height={24} />
          </span>
        </a>
      </div>
    </section>
  );
}
