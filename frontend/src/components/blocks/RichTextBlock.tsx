import type { RichTextBlock as RichTextBlockType } from "@/types";

// A handful of ingested hotel_pages carry a rich-text block that isn't the
// page's real copy at all — it's an entire scraped "Our Hotels in {city}"
// directory widget (other hotels' names/links/CTAs concatenated), tens of
// thousands of characters long, that blew hotel sub-pages out to 60,000+px
// tall. A real listing-page blurb is a paragraph or two; anything this
// large is junk from the scrape, not content — skip rendering it rather
// than dumping it on the page.
const MAX_REASONABLE_BODY_LENGTH = 4000;

export function RichTextBlock({ block }: { block: RichTextBlockType }) {
  if (block.body.length > MAX_REASONABLE_BODY_LENGTH) return null;

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-accent"
      dangerouslySetInnerHTML={{ __html: block.body }}
    />
  );
}
