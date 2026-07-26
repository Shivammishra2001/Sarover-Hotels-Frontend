import { getChildPages, getPageByPath } from "@/lib/api";
import { GenericPageView } from "./GenericPageView";
import { StubLanding } from "@/components/layout/StubLanding";

/**
 * Many Phase-1 burger-menu stub routes (weddings/meetings/offers/restaurants
 * sub-pages, and several top-level static pages) already have a real `page`
 * CMS record behind them (Phase 3 seeded starter copy for every source-less
 * menu node) that the route was never wired up to read - it just always
 * rendered the inert `StubLanding` placeholder. This renders the real CMS
 * page when one exists, falling back to the honest "more details coming
 * soon" stub only when it genuinely doesn't.
 */
export async function CmsBackedPage({
  path,
  eyebrow,
  title,
  description,
}: {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  const page = await getPageByPath(path);
  if (!page) {
    return <StubLanding eyebrow={eyebrow} title={title} description={description} />;
  }
  const childPages = await getChildPages(path);
  return <GenericPageView page={page} childPages={childPages.map((p) => ({ path: p.path, title: p.title }))} />;
}
