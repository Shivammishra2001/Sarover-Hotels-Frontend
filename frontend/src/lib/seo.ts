import type { Metadata } from "next";
import type { Article, Hotel, Seo } from "@/types";
import { getMediaUrl } from "./utils";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Builds this deployment's own absolute URL for a path — NOT the ingested source site's URL. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Centralizes the metadata shape every route was previously hand-rolling
 * inconsistently (most hardcoded `title: record.name`, ignored `seo` entirely,
 * and only 1 of 22 routes ever set a canonical). `seo` is the ingested
 * `shared.seo` component — most content types have one; a few (room, dining,
 * banquet, attraction) don't, in which case this just falls back cleanly.
 */
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
}: {
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackDescription?: string | null;
  path: string;
}): Metadata {
  const title = seo?.meta_title || fallbackTitle;
  const description = seo?.meta_description || fallbackDescription?.slice(0, 160) || undefined;
  // Prefer the ingested SEO canonical (the mirrored source URL, per INGEST_MODE=mirror) when
  // present; otherwise this deployment's own absolute URL for the page — never leave it unset.
  const canonical = seo?.canonical_url || absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    robots: seo?.no_index ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: seo?.og_image_url ? [getMediaUrl(seo.og_image_url)] : undefined,
      url: canonical,
    },
  };
}

/** Site-wide, used once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarovar Hotels",
    url: SITE_URL,
    logo: absoluteUrl("/brand/sarovar-logo.png"),
    sameAs: [
      "https://instagram.com/sarovarhotels",
      "https://facebook.com/sarovarhotels",
      "https://twitter.com/sarovarhotels",
      "https://linkedin.com/company/sarovarhotels",
    ],
  };
}

/**
 * Prefers the ingested `seo.structured_data` (already a full, source-scraped
 * Schema.org Hotel object for most hotels — confirmed non-empty in the QA
 * sweep) and only builds a fallback from record fields when it's missing.
 */
export function hotelJsonLd(hotel: Hotel) {
  if (hotel.seo?.structured_data && typeof hotel.seo.structured_data === "object") {
    return hotel.seo.structured_data as Record<string, unknown>;
  }
  const cover = hotel.hotel_galleries?.find((g) => g.is_cover) ?? hotel.hotel_galleries?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description,
    telephone: hotel.phone,
    email: hotel.email,
    url: absoluteUrl(hotel.path ?? `/hotels/${hotel.slug}`),
    image: cover?.media_url ? getMediaUrl(cover.media_url) : undefined,
    address: hotel.address_line1
      ? {
          "@type": "PostalAddress",
          streetAddress: hotel.address_line1,
          addressLocality: hotel.destination?.city,
          postalCode: hotel.postal_code,
          addressCountry: hotel.destination?.country_code,
        }
      : undefined,
    geo:
      hotel.latitude && hotel.longitude
        ? { "@type": "GeoCoordinates", latitude: hotel.latitude, longitude: hotel.longitude }
        : undefined,
    starRating: hotel.star_rating ? { "@type": "Rating", ratingValue: hotel.star_rating } : undefined,
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image_url ? getMediaUrl(article.cover_image_url) : undefined,
    author: article.author ? { "@type": "Person", name: article.author } : undefined,
    datePublished: article.published_on,
    url: absoluteUrl(`/blog/${article.slug}`),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
