import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getChildPages, getHotelByCityAndSlug, getPageByPath } from "@/lib/api";
import { HotelDetailView } from "@/components/hotel/HotelDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { GenericPageView } from "@/components/page/GenericPageView";
import { buildMetadata, hotelJsonLd, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

// Same routing-precedence fallback as app/[city]/page.tsx: a two-segment
// dynamic route (`[city]/[hotel]`) also wins over the catch-all for any
// two-segment path, real hotel or not - fall back to the generic `page`
// collection before notFound() so paths like /about-us/discover still work.

interface HotelPageProps {
  params: Promise<{ city: string; hotel: string }>;
}

export async function generateStaticParams() {
  return getAllCityHotelParams();
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (hotel) {
    return buildMetadata({
      seo: hotel.seo,
      fallbackTitle: hotel.name,
      fallbackDescription: hotel.description,
      path: hotel.path ?? `/${city}/${hotelSlug}`,
    });
  }

  const page = await getPageByPath(`/${city}/${hotelSlug}`);
  if (!page) return { title: "Not Found" };
  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    fallbackDescription: page.excerpt,
    path: `/${city}/${hotelSlug}`,
  });
}

export default async function CityHotelPage({ params }: HotelPageProps) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);

  if (!hotel) {
    const page = await getPageByPath(`/${city}/${hotelSlug}`);
    if (!page) notFound();
    const childPages = await getChildPages(`/${city}/${hotelSlug}`);
    return <GenericPageView page={page} childPages={childPages.map((p) => ({ path: p.path, title: p.title }))} />;
  }

  const basePath = `/${city}/${hotelSlug}`;

  return (
    <>
      <JsonLd
        data={[
          { ...hotelJsonLd(hotel), url: absoluteUrl(hotel.path ?? basePath) },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: hotel.destination?.name ?? city, path: `/${city}/` },
            { name: hotel.name, path: `${basePath}/` },
          ]),
        ]}
      />
      <HotelDetailView hotel={hotel} basePath={basePath} />
    </>
  );
}
