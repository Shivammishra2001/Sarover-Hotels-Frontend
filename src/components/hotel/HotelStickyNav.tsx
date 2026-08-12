"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface HotelNavSection {
  id: string;
  label: string;
}

// Figma node 1261:13404 — pill sub-nav that tracks which section is in
// view. No scroll-spy/anchor-nav pattern existed elsewhere in the codebase
// (see investigation notes), so this is a new, self-contained client piece:
// sticky under the global header, highlights the active section via
// IntersectionObserver, and smooth-scrolls on click.
export function HotelStickyNav({ sections }: { sections: HotelNavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map((s) => s.id).join(",")]);

  if (sections.length === 0) return null;

  return (
    <div className="sticky top-[88px] z-30 border-b border-border bg-[#0e1b2e]">
      <div className="mx-auto flex max-w-brand gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "flex h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.6px] transition-colors",
              activeId === section.id
                ? "bg-accent text-white"
                : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
            )}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}
