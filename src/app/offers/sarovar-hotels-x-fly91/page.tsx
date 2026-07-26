import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByPath } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { buildMetadata } from "@/lib/seo";

const SOURCE_PATH = "/site/offers/sarovar-hotels-x-fly91.html";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath(SOURCE_PATH);
  if (!page) return { title: "Sarovar x Fly91" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: "/offers/sarovar-hotels-x-fly91",
  });
}

export default async function Fly91OfferPage() {
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
