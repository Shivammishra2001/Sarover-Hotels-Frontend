import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

// Figma node 1285:11086/11093/11100 "Stay in Comfort at Our Hotel" — three
// generic amenity-story cards. The copy is brand-wide (not hotel-specific
// data), so it's reused as-is across hotels; only the photos are real,
// pulled from that hotel's own gallery by category where available.
const CARDS = [
  {
    title: "Great Accommodation",
    description: "Our hotel offers its guests complimentary Wi-Fi to stay connected with the outside world.",
    category: "room",
  },
  {
    title: "Business Center",
    description:
      "Stay committed to being productive with a well-equipped business center and workspace at our hotel.",
    category: "lobby",
  },
  {
    title: "Additional Facilities",
    description: "We have a doctor-on-call facility for medical emergencies, if any, throughout your stay.",
    category: "general",
  },
] as const;

export function HotelStayInComfort({ gallery }: { gallery: HotelGallery[] }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <HotelSectionHeading eyebrow="Hotel Experience" title="Stay in Comfort at Our Hotel" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CARDS.map((card) => {
            const photo = gallery.find((img) => img.category === card.category) ?? gallery[0];
            return (
              <div
                key={card.title}
                className="overflow-hidden rounded-[24px] border border-[#eae4dc] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]"
              >
                <div className="relative aspect-[509/296] w-full bg-muted">
                  {photo?.media_url && (
                    <Image
                      src={getMediaUrl(photo.media_url)}
                      alt={photo.alt_text ?? card.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      unoptimized={isUnoptimizedMediaUrl(getMediaUrl(photo.media_url))}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="font-display text-xl font-semibold text-[#1e1e1e]">{card.title}</h3>
                  <p className="text-base leading-relaxed text-[#2d3e50]/80">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
