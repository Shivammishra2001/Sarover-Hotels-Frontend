import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCitySlugs, getCityBySlug } from "@/lib/api";
import { StubLanding } from "@/components/layout/StubLanding";
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
    fallbackTitle: `FAQs – ${destination.name}`,
    fallbackDescription: `Frequently asked questions about staying in ${destination.name}.`,
    path: `/${city}/faqs`,
  });
}

// There is no FAQ data source at the city level (unlike hotels, which have a
// `hotel_pages` entry with `section_key: "faqs"`). The city itself is real,
// so this still returns 200 — only the FAQ content is genuinely missing.
export default async function FaqsPage({ params }: Props) {
  const { city } = await params;
  const destination = await getCityBySlug(city);
  if (!destination) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: destination.name, path: `/${city}/` },
          { name: "FAQs", path: `/${city}/faqs/` },
        ])}
      />
      <StubLanding
        eyebrow="FAQs"
        title={`FAQs for ${destination.name}`}
        description={`Frequently asked questions for ${destination.name} are coming soon — for now, check our hotel-specific FAQs.`}
      />
    </>
  );
}
