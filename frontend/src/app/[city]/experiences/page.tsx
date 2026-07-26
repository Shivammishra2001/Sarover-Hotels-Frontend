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
    fallbackTitle: `Experiences in ${destination.name}`,
    fallbackDescription: `Sarovar hotels in ${destination.name} offering unique stays and experiences.`,
    path: `/${city}/experiences`,
  });
}

// There's no dedicated "experiences" data model at the city level — the
// nearest real content is `attractions`, already rendered verbatim on
// /things-to-do. Rendering the same list again here would be redundant, so
// this frames the city's actual hotel roster as the "experience" instead,
// which is real, non-duplicated content.
export default async function ExperiencesPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  const hotels = destination.hotels ?? [];

  return (
    <div className="py-16 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "Experiences", path: `/${city}/experiences/` },
        ])}
      />
      <Container>
        <SectionHeading
          eyebrow="Experiences"
          title={`Properties Offering Unique Experiences in ${destination.name}`}
        />
        {hotels.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.documentId} hotel={hotel} href={hotel.path ?? `/hotels/${hotel.slug}`} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">No experiences listed for this city yet.</p>
        )}
      </Container>
    </div>
  );
}
