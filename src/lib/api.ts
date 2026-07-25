import { fetchAPI } from "./strapi";
import type {
  Banquet,
  Brand,
  Destination,
  Hotel,
  HotelGallery,
  Inquiry,
  InquiryPayload,
  Offer,
  StrapiListResponse,
  StrapiSingleResponse,
} from "@/types";

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
  const res = await fetchAPI<StrapiListResponse<Hotel>>("/hotels", {
    fields: ["slug"],
    pagination: { limit: 100 },
  });
  return res.data.map((hotel) => hotel.slug);
}

export async function getDestinations() {
  const res = await fetchAPI<StrapiListResponse<Destination>>("/destinations", {
    filters: { is_active: { $eq: true } },
    populate: { hotels: { fields: ["name"] } },
    sort: ["name:asc"],
    pagination: { limit: 50 },
  });
  return res.data;
}

export async function getDestinationBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Destination>>("/destinations", {
    filters: { slug: { $eq: slug } },
    populate: { hotels: { populate: { brand: true, hotel_galleries: true } } },
  });
  return res.data[0] ?? null;
}

export async function getAllDestinationSlugs() {
  const res = await fetchAPI<StrapiListResponse<Destination>>("/destinations", {
    fields: ["slug"],
    pagination: { limit: 100 },
  });
  return res.data.map((destination) => destination.slug);
}

export async function getBrands() {
  const res = await fetchAPI<StrapiListResponse<Brand>>("/brands", {
    filters: { is_active: { $eq: true } },
    sort: ["sort_order:asc"],
    pagination: { limit: 50 },
  });
  return res.data;
}

export async function getActiveOffers() {
  const res = await fetchAPI<StrapiListResponse<Offer>>("/offers", {
    filters: { is_active: { $eq: true } },
    populate: { brand: true, hotel: { populate: { destination: true } } },
    sort: ["starts_at:desc"],
    pagination: { limit: 20 },
  });
  return res.data;
}

export async function getOfferBySlug(slug: string) {
  const res = await fetchAPI<StrapiListResponse<Offer>>("/offers", {
    filters: { slug: { $eq: slug } },
    populate: { brand: true, hotel: { populate: { destination: true } } },
  });
  return res.data[0] ?? null;
}

export async function getAllOfferSlugs() {
  const res = await fetchAPI<StrapiListResponse<Offer>>("/offers", {
    fields: ["slug"],
    pagination: { limit: 100 },
  });
  return res.data.map((offer) => offer.slug);
}

export async function getBanquets() {
  const res = await fetchAPI<StrapiListResponse<Banquet>>("/banquets", {
    filters: { is_active: { $eq: true } },
    populate: { hotel: { populate: { destination: true } } },
    sort: ["theatre_capacity:desc"],
    pagination: { limit: 50 },
  });
  return res.data;
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
