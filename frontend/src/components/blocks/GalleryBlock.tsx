import { getMediaUrl } from "@/lib/utils";
import type { GalleryBlock as GalleryBlockType } from "@/types";

const MAX_GALLERY_IMAGES = 12;

export function GalleryBlock({ block }: { block: GalleryBlockType }) {
  // Some ingested gallery blocks contain the same handful of site-wide
  // images (e.g. the brand logo) repeated hundreds of times — one hotel's
  // "banquets" gallery had 310 entries pointing at just 3 unique URLs,
  // which rendered as a multi-thousand-pixel wall of duplicate logos.
  // Dedupe by URL and cap the count so a bad ingest can't blow out the page.
  const seen = new Set<string>();
  const images = (block.images ?? []).filter((image) => {
    if (seen.has(image.url)) return false;
    seen.add(image.url);
    return true;
  }).slice(0, MAX_GALLERY_IMAGES);

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
