import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionLink {
  label: string;
  href: string;
}

export function HotelSectionNav({ hotelSlug, current, sections }: { hotelSlug: string; current: string; sections: SectionLink[] }) {
  const base = `/hotels/${hotelSlug}`;

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4">
      <Link
        href={base}
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
          href={`${base}${section.href}`}
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
