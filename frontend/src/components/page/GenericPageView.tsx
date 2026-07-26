import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import type { Page } from "@/types";

/** Shared renderer for generic CMS `page` records, used wherever a route
 * falls back to the generic page lookup (the [...slug] catch-all, and the
 * [city]/[city]/[hotel] routes' non-city/non-hotel fallback - see those
 * files for why the fallback exists). `childPages` renders a real sub-nav
 * for hub pages whose ingested body is just plain-text tab labels with no
 * working links. */
export function GenericPageView({
  page,
  childPages,
}: {
  page: Pick<Page, "title" | "excerpt" | "body">;
  childPages?: { path: string; title: string }[];
}) {
  return (
    <div className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <SectionHeading title={page.title} description={page.excerpt} />
        {childPages && childPages.length > 0 && (
          <nav className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6">
            {childPages.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                className="rounded-full bg-muted px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-navy/10"
              >
                {child.title}
              </Link>
            ))}
          </nav>
        )}
        <div className="mt-10">
          <BlockRenderer blocks={page.body} />
        </div>
      </Container>
    </div>
  );
}
