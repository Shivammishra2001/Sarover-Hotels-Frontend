"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import type { SearchIndexEntry } from "@/lib/api";

const TYPE_LABEL: Record<SearchIndexEntry["type"], string> = {
  hotel: "Hotel",
  destination: "Destination",
};

/** Filters the pre-fetched index entirely client-side - ~260 records is
 * small enough that this beats a round trip for every keystroke. */
export function SiteSearch({ index }: { index: SearchIndexEntry[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((entry) => entry.title.toLowerCase().includes(q) || entry.subtitle?.toLowerCase().includes(q))
      .slice(0, 30);
  }, [index, query]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search hotels or destinations..."
          className="pl-11"
          autoFocus
        />
      </div>

      {query.trim() && (
        <div className="mt-6">
          {results.length > 0 ? (
            <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {results.map((entry) => (
                <li key={`${entry.type}-${entry.href}`}>
                  <Link href={entry.href} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-muted">
                    <span>
                      <span className="block font-medium text-navy">{entry.title}</span>
                      {entry.subtitle && <span className="text-sm text-ink/60">{entry.subtitle}</span>}
                    </span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink/40">
                      {TYPE_LABEL[entry.type]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-ink/60">No hotels or destinations match &quot;{query}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
}
