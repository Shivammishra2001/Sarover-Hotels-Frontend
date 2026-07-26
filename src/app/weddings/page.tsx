import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByPath } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { buildMetadata } from "@/lib/seo";

// Real ingested content at /weddings.html — additive alongside the existing,
// separately-curated /weddings-events/ page (which renders banquet-venue
// data, not this source page). The mapping file's "/weddings/weddings"
// sub-node has no distinct source content beyond this page itself (checked:
// no separate /weddings/weddings.html record exists) — not built as a
// separate route to avoid a pointless duplicate.
const SOURCE_PATH = "/weddings.html";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath(SOURCE_PATH);
  if (!page) return { title: "Weddings" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: "/weddings",
  });
}

export default async function WeddingsPage() {
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
