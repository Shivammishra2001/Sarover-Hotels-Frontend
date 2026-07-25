import { getMediaUrl } from "@/lib/utils";
import type { ImageBlock as ImageBlockType } from "@/types";

// Content-block images can point at whatever host the source page used —
// often un-rehosted external CDN URLs (see htmlUtils.extractGenericBlocks,
// which doesn't call resolveImage). A plain <img> sidesteps next/image's
// remotePatterns allowlist, which we can't maintain for arbitrary crawled hosts.
export function ImageBlock({ block }: { block: ImageBlockType }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getMediaUrl(block.url)}
        alt={block.alt ?? ""}
        loading="lazy"
        className="w-full rounded-xl object-cover"
      />
      {block.caption && (
        <figcaption className="mt-2 text-center text-sm text-ink/60">{block.caption}</figcaption>
      )}
    </figure>
  );
}
