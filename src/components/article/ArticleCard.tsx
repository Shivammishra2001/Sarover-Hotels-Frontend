import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatDate, getMediaUrl } from "@/lib/utils";
import type { Article } from "@/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="flex h-full flex-col overflow-hidden p-0">
        {article.cover_image_url && (
          <div className="aspect-video w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getMediaUrl(article.cover_image_url)}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          {article.published_on && (
            <p className="text-xs uppercase tracking-wide text-ink/50">{formatDate(article.published_on)}</p>
          )}
          <h3 className="mt-2 font-display text-lg font-semibold text-navy">{article.title}</h3>
          {article.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{article.excerpt}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
