import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import type { Hotel } from "@/types";

/** Shared renderer for /hotels/[theme]/ and /hotels/new-and-upcoming/ — both are
 * a curated hotel list under a single heading, no per-record detail fields. */
export function HotelCollectionView({
  eyebrow,
  title,
  description,
  hotels,
  emptyMessage,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  hotels: Hotel[];
  emptyMessage: string;
}) {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {hotels.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.documentId} hotel={hotel} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">{emptyMessage}</p>
        )}
      </Container>
    </div>
  );
}
