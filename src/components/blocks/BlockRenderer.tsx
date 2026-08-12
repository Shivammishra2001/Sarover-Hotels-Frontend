import type { Block } from "@/types";
import { RichTextBlock } from "./RichTextBlock";
import { ImageBlock } from "./ImageBlock";
import { GalleryBlock } from "./GalleryBlock";
import { CtaBlock } from "./CtaBlock";
import { FaqBlock } from "./FaqBlock";
import { EmbedBlock } from "./EmbedBlock";
import { StatsBlock } from "./StatsBlock";

export function BlockRenderer({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        // `block.id` alone collides across component types — Strapi assigns
        // ids per-table, so a rich-text row and a gallery row in the same
        // dynamic zone can both be id 149. Namespacing by __component keeps
        // React's keys actually unique (was throwing a duplicate-key warning
        // and, worse, could make React drop/mis-reconcile one of the blocks).
        const key = `${block.__component}-${block.id}`;
        switch (block.__component) {
          case "block.rich-text":
            return <RichTextBlock key={key} block={block} />;
          case "block.image":
            return <ImageBlock key={key} block={block} />;
          case "block.gallery":
            return <GalleryBlock key={key} block={block} />;
          case "block.cta":
            return <CtaBlock key={key} block={block} />;
          case "block.faq":
            return <FaqBlock key={key} block={block} />;
          case "block.embed":
            return <EmbedBlock key={key} block={block} />;
          case "block.stats":
            return <StatsBlock key={key} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
