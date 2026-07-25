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
        switch (block.__component) {
          case "block.rich-text":
            return <RichTextBlock key={block.id} block={block} />;
          case "block.image":
            return <ImageBlock key={block.id} block={block} />;
          case "block.gallery":
            return <GalleryBlock key={block.id} block={block} />;
          case "block.cta":
            return <CtaBlock key={block.id} block={block} />;
          case "block.faq":
            return <FaqBlock key={block.id} block={block} />;
          case "block.embed":
            return <EmbedBlock key={block.id} block={block} />;
          case "block.stats":
            return <StatsBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
