import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionLink {
  label: string;
  href: string;
}

/** Same shape as HotelSectionNav, but takes a full `basePath` (e.g.
 * `/hotels-in-jaipur/sarovar-portico-jaipur`) instead of building one from a
 * bare `hotelSlug` under `/hotels` — kept as a separate component so the old
 * `/hotels/[slug]` tree's nav (and its fixed section list) is untouched. */
export function CityHotelSectionNav({
  basePath,
  current,
  sections,
}: {
  basePath: string;
  current: string;
  sections: SectionLink[];
}) {
  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4">
      <Link
        href={basePath}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          current === "overview" ? "bg-navy text-white" : "bg-muted text-ink/70 hover:bg-navy/10"
        )}
      >
        Overview
      </Link>
      {sections.map((section) => (
        <Link
          key={section.href}
          href={`${basePath}${section.href}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            current === section.href ? "bg-navy text-white" : "bg-muted text-ink/70 hover:bg-navy/10"
          )}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
