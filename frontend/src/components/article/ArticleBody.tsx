import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import type { Article } from "@/types";

export function ArticleBody({ article }: { article: Article }) {
  return (
    <article>
      <header>
        {article.published_on && (
          <p className="eyebrow text-accent">
            {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
              new Date(article.published_on)
            )}
            {article.author ? ` · ${article.author}` : ""}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-medium text-navy sm:text-4xl">{article.title}</h1>
        {article.excerpt && <p className="mt-4 text-lg leading-relaxed text-ink/70">{article.excerpt}</p>}
      </header>
      <div className="mt-8">
        <BlockRenderer blocks={article.body} />
      </div>
    </article>
  );
}
