import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDestinations } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getMediaUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore every Indian destination where Sarovar Hotels welcomes you.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Explore India"
          title="All Destinations"
          description="From metros to hill stations, discover every city where Sarovar Hotels welcomes you."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.documentId}
              href={`/destinations/${destination.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              {destination.hero_image_url ? (
                <Image
                  src={getMediaUrl(destination.hero_image_url)}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-xl font-semibold">{destination.name}</p>
                <p className="text-sm text-white/80">
                  {destination.hotels?.length ?? 0} hotel{(destination.hotels?.length ?? 0) === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
