import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

// Figma node 1297:790/986/993 "Happiness @ Sarovar" — brand-wide guest-care
// promises (not hotel- or city-specific data), reused verbatim across
// hotels; photos are that hotel's own gallery images.
const STORIES = [
  {
    title: "Take Away Breakfast With Early Check Out",
    description:
      "As you hurriedly pack to leave for your early morning flight, breakfast is the last thing on your mind, but it's the first one on ours. Which is why we are always delighted to bid you farewell with a freshly packed breakfast!",
  },
  {
    title: "Flexi Check In Check Out",
    description:
      "Considering your hectic schedule, the last thing we want for you is to adjust to our timelines. Which is why we offer flexible check-in and check-out timing.",
  },
  {
    title: "Chef Made My Breakfast My Way",
    description:
      "So proud are our chefs of their delectable creations, that they relish the opportunity of having you eat straight from their hands.",
  },
] as const;

export function HotelHappiness({ gallery }: { gallery: HotelGallery[] }) {
  return (
    <section className="bg-[#0e1b2e] py-20 text-white">
      <Container>
        <HotelSectionHeading light eyebrow="Guest Care" title="Happiness @ Sarovar" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STORIES.map((story, index) => {
            const photo = gallery[index % Math.max(gallery.length, 1)];
            return (
              <div key={story.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                <div className="relative aspect-[509/296] w-full bg-navy">
                  {photo?.media_url && (
                    <Image
                      src={getMediaUrl(photo.media_url)}
                      alt={photo.alt_text ?? story.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      unoptimized={isUnoptimizedMediaUrl(getMediaUrl(photo.media_url))}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="font-display text-lg font-semibold">{story.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{story.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
