import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPagePaths, getPageByPath } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export const revalidate = 3600;

/**
 * Catch-all for the generic `page` collection (about-us, careers, legal,
 * FAQ, corporate/MICE landings, etc.) — anything crawled that isn't a
 * structured hotel/destination/offer/blog route. Next.js matches literal
 * folder routes (/hotels, /destinations, /offers, /blog, /weddings-events)
 * before falling through to this catch-all, so there's no collision.
 */
export async function generateStaticParams() {
  const paths = await getAllPagePaths();
  return paths.map((path) => ({ slug: path.replace(/^\/+/, "").split("/") }));
}

async function resolvePage(slug: string[]) {
  const path = `/${slug.join("/")}`;
  return getPageByPath(path);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await resolvePage(slug);
  if (!page) return { title: "Not Found" };

  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: `/${slug.join("/")}`,
  });
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;
  const page = await resolvePage(slug);
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
