import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllHotelSlugsForSection, getHotelBySlug, findHotelPage } from "@/lib/api";
import { HotelSectionContent } from "@/components/hotel/HotelSectionContent";
import { buildMetadata } from "@/lib/seo";
import type { HotelPageSectionKey } from "@/types";

interface SectionPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Seven of the hotel sub-routes (location/amenities/faqs/legal/wellness/
 * home-delivery/contact) are identical in shape: look up the hotel, find its
 * hotel-page for a fixed section_key, render the section nav + block body.
 * This factory removes the need to hand-write that boilerplate seven times.
 */
export function makeHotelSectionPage(sectionKey: HotelPageSectionKey, navHref: string, fallbackTitle: string) {
  async function generateStaticParams() {
    const slugs = await getAllHotelSlugsForSection(sectionKey);
    return slugs.map((slug) => ({ slug }));
  }

  async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const hotel = await getHotelBySlug(slug);
    if (!hotel) return { title: "Not Found" };
    const page = findHotelPage(hotel.hotel_pages, sectionKey);
    // Ingested `page.title` is often the full scraped <title>/<h1> text, which
    // already includes the hotel name — use the clean fallback label instead
    // of concatenating and duplicating it.
    return buildMetadata({
      seo: page?.seo,
      fallbackTitle: `${fallbackTitle} | ${hotel.name}`,
      fallbackDescription: page?.seo?.meta_description,
      path: `/hotels/${slug}${navHref}`,
    });
  }

  async function Page({ params }: SectionPageProps) {
    const { slug } = await params;
    const hotel = await getHotelBySlug(slug);
    if (!hotel) notFound();

    const page = findHotelPage(hotel.hotel_pages, sectionKey);
    if (!page) notFound();

    return <HotelSectionContent hotel={hotel} current={navHref} fallbackTitle={fallbackTitle} page={page} />;
  }

  return { generateStaticParams, generateMetadata, default: Page };
}
