import type { Metadata } from "next";
import { getArticles } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ArticleCard } from "@/components/article/ArticleCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog & Travel Guides",
  description: "Stories, travel guides, and updates from across the Sarovar collection of hotels.",
};

export default async function BlogIndexPage() {
  const articles = await getArticles(60);

  return (
    <div className="pb-20 pt-10">
      <Container>
        <SectionHeading eyebrow="Sarovar Journal" title="Blog & Travel Guides" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.documentId} article={article} />
          ))}
        </div>
        {articles.length === 0 && <p className="mt-6 text-ink/60">No articles published yet.</p>}
      </Container>
    </div>
  );
}
