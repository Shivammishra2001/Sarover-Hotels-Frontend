import { Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelViewAllLink } from "@/components/hotel/HotelViewAllLink";
import { humanizeEnum } from "@/lib/utils";
import type { Banquet } from "@/types";

// Figma node 1297:788 "Plan Your Events with Us" — dark band, translucent
// glass venue cards keyed on area + name. Real `Banquet` records carry six
// capacity numbers Figma's simple card doesn't show; those stay reachable
// via each venue's own detail page rather than cramming a table in here.
export function HotelBanquets({
  banquets,
  basePath,
  viewAllHref,
}: {
  banquets: Banquet[];
  basePath: string;
  viewAllHref?: string;
}) {
  if (banquets.length === 0) return null;

  return (
    <section id="banquets" className="scroll-mt-[150px] bg-[#0e1b2e] py-20 text-white">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/70">Meetings & Events</p>
            <h2 className="mt-4 font-display text-[32px] font-normal leading-[1.2] sm:text-[40px]">
              Plan Your Events with Us
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Host grand weddings, corporate meetings, conferences and social celebrations in our versatile
              event spaces.
            </p>
          </div>
          <a
            href={`${basePath}#enquire`}
            className="flex h-[56px] w-fit shrink-0 items-center gap-3 rounded-full bg-accent px-10 text-[13px] font-semibold uppercase tracking-[0.6px] text-white hover:bg-accent/90"
          >
            <Calendar size={20} />
            Plan Your Event
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {banquets.map((banquet) => (
            <div
              key={banquet.documentId}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-md"
            >
              {banquet.area_sqft && (
                <p className="text-2xl font-medium tracking-tight">{banquet.area_sqft.toLocaleString("en-IN")} sq.ft.</p>
              )}
              <p className="text-lg text-white/90">{banquet.name}</p>
              {banquet.event_type && <p className="text-sm text-white/60">{humanizeEnum(banquet.event_type)}</p>}
              {banquet.slug && (
                <a
                  href={`${basePath}/banquets/${banquet.slug}`}
                  className="mt-1 text-sm font-semibold text-accent hover:underline"
                >
                  View Capacity Details
                </a>
              )}
            </div>
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-10 flex justify-center">
            <HotelViewAllLink href={viewAllHref} label="View All Venues" light />
          </div>
        )}
      </Container>
    </section>
  );
}
