import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) return { title: "Not Found" };

  return buildMetadata({
    fallbackTitle: `Meeting Venues in ${destination.name}`,
    fallbackDescription: `Sarovar hotels in ${destination.name} with conference and meeting facilities.`,
    path: `/${city}/meeting-venues`,
  });
}

export default async function MeetingVenuesPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  // Real banquet data only ever populates `event_type` as "wedding" or
  // "conference" (verified live — no mice/board_meeting/social/exhibition
  // records exist yet), so "conference" is the correct, non-fabricated filter here.
  const hotels = (destination.hotels ?? []).filter((hotel) =>
    (hotel.banquets ?? []).some((banquet) => banquet.event_type === "conference")
  );

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Meeting Venues", path: `/${city}/meeting-venues/` },
        ])}
      />
      <Container>
        <SectionHeading eyebrow="Business" title={`Meeting Venues in ${destination.name}`} />
        {hotels.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.documentId} hotel={hotel} href={hotel.path ?? `/hotels/${hotel.slug}`} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No meeting venues listed for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
