import { getMediaUrl } from "@/lib/utils";
import type { GalleryBlock as GalleryBlockType } from "@/types";

export function GalleryBlock({ block }: { block: GalleryBlockType }) {
  const images = block.images ?? [];
  if (images.length === 0) return null;

  return (
    <div>
      {block.title && <h3 className="font-display text-xl font-semibold text-navy">{block.title}</h3>}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.id}
            src={getMediaUrl(image.url)}
            alt={image.alt ?? ""}
            loading="lazy"
            className="aspect-square w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}
