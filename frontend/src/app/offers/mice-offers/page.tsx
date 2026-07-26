import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByPath } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { buildMetadata } from "@/lib/seo";

// Literal route — takes precedence over /offers/[slug]/. Real ingested
// content: the source page collided with /offers/[slug] and was remapped to
// `/site/offers/mice-offers.html` at ingest (see backend/scripts/ingest/
// extractors/page.ts collisionSafePath) — this route surfaces it at the
// burger-menu's intended path without re-ingesting anything.
const SOURCE_PATH = "/site/offers/mice-offers.html";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath(SOURCE_PATH);
  if (!page) return { title: "MICE Offers" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: "/offers/mice-offers",
  });
}

export default async function MiceOffersPage() {
  const page = await getPageByPath(SOURCE_PATH);
  if (!page) notFound();

  return (
    <div className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <SectionHeading title={page.title} description={page.excerpt} />
        <div className="mt-10">
          <BlockRenderer blocks={page.body} />
        </div>
      </Container>
    </div>
  );
}
