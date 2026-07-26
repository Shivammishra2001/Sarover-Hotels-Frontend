import { fetchAPI } from "./strapi";
import type {
  Article,
  Attraction,
  Banquet,
  Brand,
  Destination,
  Hotel,
  HotelGallery,
  HotelPage,
  Inquiry,
  InquiryPayload,
  Offer,
  Page,
  StrapiListResponse,
  StrapiSingleResponse,
} from "@/types";

/**
 * A dynamic zone's components are NOT returned at all unless populated
 * explicitly — a bare `hotel_pages: true` / `populate: { seo: true }` silently
 * drops `body` entirely (confirmed: the field is absent from the response, not
 * just its nested media). Strapi v5 needs the polymorphic `on` populate syntax,
 * one entry per real component UID (see each content type's schema.json under
 * backend/src/api — page/article/hotel-page all share the same 7 components).
 */
const DYNAMIC_ZONE_POPULATE = {
  on: {
    "block.rich-text": { populate: "*" },
    "block.image": { populate: "*" },
    "block.gallery": { populate: "*" },
    "block.cta": { populate: "*" },
    "block.faq": { populate: "*" },
    "block.embed": { populate: "*" },
    "block.stats": { populate: "*" },
  },
};

/**
 * Strapi v5 only auto-populates one level deep with `populate=*`. Nested
 * relations (hotel -> rooms -> amenities, etc.) need the object/LHS-bracket
 * populate syntax below, built with `qs`.
 */
export function buildHotelDetailPopulate() {
  return {
    populate: {
      brand: true,
      destination: true,
      hotel_galleries: { sort: ["sort_order:asc"] },
      rooms: { populate: { amenities: true } },
      dinings: true,
      banquets: true,
      offers: true,
      hotel_pages: { populate: { seo: true, body: DYNAMIC_ZONE_POPULATE } },
      attractions: true,
      seo: true,
    },
  };
}

export async function getFeaturedHotels(limit = 4) {
  const res = await fetchAPI<StrapiListResponse<Hotel>>("/hotels", {
    filters: { is_featured: { $eq: true }, status: { $eq: "active" } },
    populate: { brand: true, destination: true, hotel_galleries: true },
    pagination: { limit },
    sort: ["name:asc"],
  });
  return res.data;
}

export interface HotelFilters {
  brand?: string;
  destination?: string;
  property_type?: string;
  star_rating?: number;
  page?: number;
  pageSize?: number;
}

export async function getHotels(filters: HotelFilters = {}) {
  const filterParams: Record<string, unknown> = { status: { $eq: "active" } };

  if (filters.brand) filterParams.brand = { slug: { $eq: filters.brand } };
  if (filters.destination) filterParams.destination = { slug: { $eq: filters.destination } };
  if (filters.property_type) filterParams.property_type = { $eq: filters.property_type };
  if (filters.star_rating) filterParams.star_rating = { $eq: filters.star_rating };

  const res = await fetchAPI<StrapiListResponse<Hotel>>("/hotels", {
    filters: filterParams,
    populate: { brand: true, destination: true, hotel_galleries: true, rooms: true },
    pagination: { page: filters.page ?? 1, pageSize: filters.pageSize ?? 12 },
    sort: ["is_featured:desc", "name:asc"],
  });
  return res;
}

export async function getHotelBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Hotel>>("/hotels", {
    filters: { slug: { $eq: slug } },
    ...buildHotelDetailPopulate(),
  });
  return res.data[0] ?? null;
}

export async function getAllHotelSlugs() {
  // 162 hotels > the old single-page `limit: 100` — silently dropped 62 hotels
  // from generateStaticParams. Must loop all pages, never assume a fixed cap.
  const hotels = await fetchAllPages<{ slug: string }>("/hotels", { fields: ["slug"] });
  return hotels.map((hotel) => hotel.slug);
}

export async function getDestinations() {
  // 96 destinations > the old single-page `limit: 50` — this was the destinations-
  // capped-at-~50 bug. Must loop all pages, never assume a fixed cap.
  return fetchAllPages<Destination>("/destinations", {
    filters: { is_active: { $eq: true } },
    populate: { hotels: { fields: ["name"] } },
    sort: ["name:asc"],
  });
}

export async function getDestinationBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Destination>>("/destinations", {
    filters: { slug: { $eq: slug } },
    populate: { hotels: { populate: { brand: true, hotel_galleries: true } }, seo: true },
  });
  return res.data[0] ?? null;
}

export async function getAllDestinationSlugs() {
  const destinations = await fetchAllPages<{ slug: string }>("/destinations", { fields: ["slug"] });
  return destinations.map((destination) => destination.slug);
}

export async function getBrands() {
  return fetchAllPages<Brand>("/brands", {
    filters: { is_active: { $eq: true } },
    sort: ["sort_order:asc"],
  });
}

export async function getActiveOffers() {
  return fetchAllPages<Offer>("/offers", {
    filters: { is_active: { $eq: true } },
    populate: { brand: true, hotel: { populate: { destination: true } } },
    sort: ["starts_at:desc"],
  });
}

export async function getOfferBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Offer>>("/offers", {
    filters: { slug: { $eq: slug } },
    populate: { brand: true, hotel: { populate: { destination: true } }, seo: true },
  });
  return res.data[0] ?? null;
}

export async function getAllOfferSlugs() {
  const offers = await fetchAllPages<{ slug: string }>("/offers", { fields: ["slug"] });
  return offers.map((offer) => offer.slug);
}

export async function getBanquets() {
  return fetchAllPages<Banquet>("/banquets", {
    filters: { is_active: { $eq: true } },
    populate: { hotel: { populate: { destination: true } } },
    sort: ["theatre_capacity:desc"],
  });
}

export async function getGallerySample(limit = 12) {
  const res = await fetchAPI<StrapiListResponse<HotelGallery>>("/hotel-galleries", {
    filters: { media_type: { $eq: "image" } },
    populate: { hotel: { fields: ["name", "slug"] } },
    sort: ["createdAt:desc"],
    pagination: { limit },
  });
  return res.data;
}

export async function createInquiry(payload: InquiryPayload) {
  return fetchAPI<StrapiSingleResponse<Inquiry>>(
    "/inquiries",
    {},
    {
      method: "POST",
      body: { data: payload },
      cache: "no-store",
    }
  );
}

/** Loops every page of a Strapi collection — `generateStaticParams` can't assume <=100 records. */
async function fetchAllPages<T>(path: string, params: Record<string, unknown>): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const pageSize = 100;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetchAPI<StrapiListResponse<T>>(path, {
      ...params,
      pagination: { page, pageSize },
    });
    all.push(...res.data);
    if (!res.meta.pagination || page >= res.meta.pagination.pageCount) break;
    page += 1;
  }
  return all;
}

// ---- Generic CMS pages (static/legal/corporate, catch-all route) ----

export async function getPageByPath(path: string) {
  const res = await fetchAPI<StrapiListResponse<Page>>("/pages", {
    filters: { path: { $eq: path }, is_active: { $eq: true } },
    populate: { seo: true, body: DYNAMIC_ZONE_POPULATE },
  });
  return res.data[0] ?? null;
}

export async function getAllPagePaths() {
  const pages = await fetchAllPages<Page>("/pages", { fields: ["path"] });
  return pages.map((p) => p.path);
}

// ---- Articles (blog) ----

export async function getArticles(limit = 20) {
  // `limit` is a caller-chosen display cap (e.g. homepage wants fewer than the
  // full blog listing), not a Strapi page-size assumption — fetch every page
  // first so a growing article count never silently truncates below `limit`.
  const articles = await fetchAllPages<Article>("/articles", {
    populate: { hotel: { fields: ["name", "slug"] } },
    sort: ["published_on:desc", "createdAt:desc"],
  });
  return articles.slice(0, limit);
}

export async function getArticleBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Article>>("/articles", {
    filters: { slug: { $eq: slug } },
    populate: {
      hotel: { fields: ["name", "slug"] },
      destination: { fields: ["name", "slug"] },
      seo: true,
      body: DYNAMIC_ZONE_POPULATE,
    },
  });
  return res.data[0] ?? null;
}

export async function getAllArticleSlugs() {
  const articles = await fetchAllPages<Article>("/articles", { fields: ["slug"] });
  return articles.map((a) => a.slug);
}

// ---- Hotel-scoped nested resources: static params for dynamic routes ----

export async function getAllRoomParams() {
  const rooms = await fetchAllPages<{ documentId: string; name: string; hotel?: { slug: string } }>("/rooms", {
    fields: ["name"],
    populate: { hotel: { fields: ["slug"] } },
  });
  return rooms.filter((r) => r.hotel?.slug).map((r) => ({ hotel: r.hotel!.slug, name: r.name }));
}

export async function getAllDiningParams() {
  const dinings = await fetchAllPages<{ slug?: string; hotel?: { slug: string } }>("/dinings", {
    fields: ["slug"],
    populate: { hotel: { fields: ["slug"] } },
  });
  return dinings
    .filter((d) => d.hotel?.slug && d.slug)
    .map((d) => ({ hotel: d.hotel!.slug, outlet: d.slug! }));
}

export async function getAllBanquetParams() {
  const banquets = await fetchAllPages<{ slug?: string; hotel?: { slug: string } }>("/banquets", {
    fields: ["slug"],
    populate: { hotel: { fields: ["slug"] } },
  });
  return banquets
    .filter((b) => b.hotel?.slug && b.slug)
    .map((b) => ({ hotel: b.hotel!.slug, hall: b.slug! }));
}

export async function getAllAttractionParams() {
  const attractions = await fetchAllPages<{ slug: string; hotel?: { slug: string } }>("/attractions", {
    fields: ["slug"],
    populate: { hotel: { fields: ["slug"] } },
  });
  return attractions
    .filter((a) => a.hotel?.slug)
    .map((a) => ({ hotel: a.hotel!.slug, attraction: a.slug }));
}

export async function getAttractionBySlug(hotelSlug: string, attractionSlug: string) {
  const res = await fetchAPI<StrapiListResponse<Attraction>>("/attractions", {
    filters: { slug: { $eq: attractionSlug }, hotel: { slug: { $eq: hotelSlug } } },
    populate: { hotel: { fields: ["name", "slug"] } },
  });
  return res.data[0] ?? null;
}

export async function getAllHotelSlugsForSection(sectionKey: string) {
  const pages = await fetchAllPages<{ hotel?: { slug: string } }>("/hotel-pages", {
    filters: { section_key: { $eq: sectionKey } },
    populate: { hotel: { fields: ["slug"] } },
  });
  return pages.filter((p) => p.hotel?.slug).map((p) => p.hotel!.slug);
}

/** hotel-pages have no slug field — routed by section_key or, for the long-tail, by the last segment of `path`. */
export function findHotelPage(pages: HotelPage[] | undefined, sectionKey: string) {
  return pages?.find((p) => p.section_key === sectionKey);
}

export function findHotelPageByPathSegment(pages: HotelPage[] | undefined, segment: string) {
  const normalized = segment.replace(/\.html?$/i, "").toLowerCase();
  return pages?.find((p) => {
    const last = p.path?.split("/").filter(Boolean).pop()?.replace(/\.html?$/i, "").toLowerCase();
    return last === normalized;
  });
}
