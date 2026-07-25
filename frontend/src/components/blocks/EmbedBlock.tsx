import type { EmbedBlock as EmbedBlockType } from "@/types";

export function EmbedBlock({ block }: { block: EmbedBlockType }) {
  if (block.embed_url) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={block.embed_url}
          title={block.title ?? "Embedded content"}
          className="h-full w-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  if (block.html) {
    // Sourced from our own ingestion pipeline (server-side crawl), not live
    // user input — same trust level as any other migrated CMS field.
    return <div dangerouslySetInnerHTML={{ __html: block.html }} />;
  }

  return null;
}
