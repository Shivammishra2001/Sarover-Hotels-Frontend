import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ArticleCard } from "@/components/article/ArticleCard";
import { PHASE7_BLOG_CATEGORIES } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

// Phase 7 IA: the burger menu's "All Blogs" entry is /blogs/ — additive
// alongside the existing /blog/ index (unchanged, still the real article
// detail route via /blog/[slug]/) rather than renaming a working route.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Blog & Travel Guides",
  fallbackDescription: "Stories, travel guides, and updates from across the Sarovar collection of hotels.",
  path: "/blogs",
});

export default async function BlogsIndexPage() {
  const articles = await getArticles(60);

  return (
    <div className="pb-20 pt-10">
      <Container>
        <SectionHeading eyebrow="Sarovar Journal" title="Blog & Travel Guides" />

        <div className="mt-6 flex flex-wrap gap-3">
          {PHASE7_BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blogs/${cat.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-ink/70 hover:border-accent hover:text-accent"
            >
              {cat.title}
            </Link>
          ))}
        </div>

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
