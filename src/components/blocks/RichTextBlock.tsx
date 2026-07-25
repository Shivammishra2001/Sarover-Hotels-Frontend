import type { RichTextBlock as RichTextBlockType } from "@/types";

export function RichTextBlock({ block }: { block: RichTextBlockType }) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-accent"
      dangerouslySetInnerHTML={{ __html: block.body }}
    />
  );
}
