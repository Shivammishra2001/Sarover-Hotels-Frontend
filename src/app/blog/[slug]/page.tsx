import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { ArticleBody } from "@/components/article/ArticleBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMediaUrl } from "@/lib/utils";
import { buildMetadata, articleJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  const metadata = buildMetadata({
    seo: article.seo,
    fallbackTitle: article.title,
    fallbackDescription: article.excerpt,
    path: `/blog/${slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: article.seo?.og_image_url
        ? metadata.openGraph?.images
        : article.cover_image_url
          ? [getMediaUrl(article.cover_image_url)]
          : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="pb-20 pt-10">
      <JsonLd data={articleJsonLd(article)} />
      {article.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getMediaUrl(article.cover_image_url)}
          alt={article.title}
          className="mx-auto mb-10 aspect-[21/9] w-full max-w-5xl rounded-2xl object-cover"
        />
      )}
      <Container className="max-w-3xl">
        <ArticleBody article={article} />
      </Container>
    </div>
  );
}
