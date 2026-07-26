import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getArticlesByKeywordCategory } from "@/lib/api";
import { PHASE7_BLOG_CATEGORIES } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return PHASE7_BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

function findCategory(slug: string) {
  return PHASE7_BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: cat.title,
    fallbackDescription: `${cat.title} from the Sarovar Journal.`,
    path: `/blogs/${category}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  const articles = await getArticlesByKeywordCategory(cat.keywords);

  return (
    <div className="pb-20 pt-10">
      <Container>
        <SectionHeading eyebrow="Sarovar Journal" title={cat.title} />
        {articles.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.documentId} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No articles matched for this category yet.</p>
        )}
      </Container>
    </div>
  );
}
