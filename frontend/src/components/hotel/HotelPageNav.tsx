import Link from "next/link";
import { cn } from "@/lib/utils";

export interface HotelPageNavLink {
  href: string;
  label: string;
}

// Same visual language as HotelStickyNav (Figma node 1301:2811 on the Rooms
// page, identical to 1261:13404 on the hotel-overview page), but for actual
// multi-page navigation (Rooms/Dining/Banquets/... are separate routes here,
// not anchors on one page) — so this is a plain server component that
// highlights by current path instead of scroll position.
export function HotelPageNav({ links, current }: { links: HotelPageNavLink[]; current: string }) {
  return (
    <div className="sticky top-[88px] z-30 border-b border-border bg-[#0e1b2e]">
      <div className="mx-auto flex max-w-brand gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full px-6 text-[13px] font-semibold uppercase tracking-[0.6px] transition-colors",
              current === link.href
                ? "bg-accent text-white"
                : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
