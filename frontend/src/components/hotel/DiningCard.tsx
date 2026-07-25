import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { humanizeEnum } from "@/lib/utils";
import { Clock, Users } from "lucide-react";
import type { Dining } from "@/types";

/**
 * Previously linked on the /dining listing page but not on the hotel root
 * (same card, inconsistent reachability depending on which page rendered it).
 * `hotelSlug` is required so both call sites link consistently; when the
 * record has no slug (a small minority — see slug-integrity.csv) the card
 * renders unlinked, same as before.
 */
export function DiningCard({ dining, hotelSlug }: { dining: Dining; hotelSlug: string }) {
  const content = (
    <Card className="p-6">
      <p className="eyebrow text-accent">{humanizeEnum(dining.outlet_type ?? "")}</p>
      <h3 className="mt-1 font-display text-xl font-semibold text-navy">{dining.name}</h3>
      {dining.cuisine_type && <p className="mt-1 text-sm text-ink/60">{dining.cuisine_type}</p>}
      {dining.description && (
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{dining.description}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink/70">
        <span className="flex items-center gap-1.5">
          <Clock size={16} />
          {dining.is_24_hours
            ? "Open 24 hours"
            : `${dining.opening_time?.slice(0, 5) ?? ""} – ${dining.closing_time?.slice(0, 5) ?? ""}`}
        </span>
        {dining.seating_capacity && (
          <span className="flex items-center gap-1.5">
            <Users size={16} />
            Seats {dining.seating_capacity}
          </span>
        )}
      </div>
    </Card>
  );

  return dining.slug ? (
    <Link href={`/hotels/${hotelSlug}/dining/${dining.slug}`} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
