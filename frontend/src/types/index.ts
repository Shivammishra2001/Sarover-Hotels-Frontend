// Strapi v5 flattened entity shape — fields sit directly on the object,
// identified by `documentId` (string), not the numeric `id`.
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export type BrandTier = "luxury" | "upscale" | "midscale" | "economy";

export interface Brand extends StrapiEntity {
  name: string;
  slug: string;
  tier: BrandTier;
  tagline?: string;
  description?: string;
  logo_url?: string;
  brand_color?: string;
  sort_order: number;
  is_active: boolean;
  hotels?: Hotel[];
  offers?: Offer[];
}

export type RegionTag =
  | "north"
  | "south"
  | "east"
  | "west"
  | "central"
  | "north_east"
  | "coastal"
  | "hill_station"
  | "metro"
  | "heritage"
  | "pilgrimage"
  | "other";

export interface Destination extends StrapiEntity {
  name: string;
  slug: string;
  city: string;
  state?: string;
  country: string;
  country_code: string;
  region_tag?: RegionTag;
  latitude?: number;
  longitude?: number;
  description?: string;
  hero_image_url?: string;
  is_active: boolean;
  hotels?: Hotel[];
}

export type PropertyType =
  | "hotel"
  | "resort"
  | "business_hotel"
  | "heritage"
  | "service_apartment"
  | "villa";

export type HotelStatus = "active" | "inactive" | "coming_soon" | "closed";

export interface Hotel extends StrapiEntity {
  name: string;
  slug: string;
  property_type?: PropertyType;
  star_rating?: number;
  description?: string;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website_url?: string;
  total_rooms?: number;
  check_in_time?: string;
  check_out_time?: string;
  opened_on?: string;
  status: HotelStatus;
  is_featured: boolean;
  brand?: Brand;
  destination?: Destination;
  hotel_galleries?: HotelGallery[];
  rooms?: Room[];
  dinings?: Dining[];
  banquets?: Banquet[];
  offers?: Offer[];
}

export type GalleryMediaType = "image" | "video" | "view_360";
export type GalleryCategory =
  | "exterior"
  | "lobby"
  | "room"
  | "dining"
  | "banquet"
  | "pool"
  | "spa"
  | "general";

export interface HotelGallery extends StrapiEntity {
  media_type: GalleryMediaType;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  alt_text?: string;
  category?: GalleryCategory;
  is_cover: boolean;
  sort_order: number;
  hotel?: Hotel;
}

export type RoomCategory =
  | "standard"
  | "deluxe"
  | "superior"
  | "executive"
  | "suite"
  | "presidential"
  | "studio"
  | "villa";

export type BedType = "single" | "twin" | "double" | "queen" | "king";

export interface Room extends StrapiEntity {
  name: string;
  room_category?: RoomCategory;
  description?: string;
  bed_type: BedType;
  max_occupancy: number;
  max_adults: number;
  max_children: number;
  base_price: number;
  currency: string;
  size_sqft?: number;
  size_sqm?: number;
  total_units: number;
  is_active: boolean;
  hotel?: Hotel;
  amenities?: Amenity[];
}

export type AmenityCategory =
  | "connectivity"
  | "comfort"
  | "bathroom"
  | "entertainment"
  | "food_beverage"
  | "accessibility"
  | "safety"
  | "general";

export interface Amenity extends StrapiEntity {
  name: string;
  slug: string;
  category?: AmenityCategory;
  icon_class?: string;
  is_active: boolean;
  rooms?: Room[];
}

export type OutletType =
  | "restaurant"
  | "bar"
  | "cafe"
  | "lounge"
  | "coffee_shop"
  | "poolside"
  | "rooftop"
  | "banquet_kitchen";

export interface Dining extends StrapiEntity {
  name: string;
  slug?: string;
  outlet_type?: OutletType;
  cuisine_type?: string;
  description?: string;
  opening_time?: string;
  closing_time?: string;
  is_24_hours: boolean;
  seating_capacity?: number;
  is_open_to_public: boolean;
  serves_alcohol: boolean;
  is_active: boolean;
  hotel?: Hotel;
}

export type EventType =
  | "wedding"
  | "conference"
  | "mice"
  | "social"
  | "board_meeting"
  | "exhibition"
  | "multi_purpose";

export interface Banquet extends StrapiEntity {
  name: string;
  slug?: string;
  event_type?: EventType;
  description?: string;
  area_sqft?: number;
  area_sqm?: number;
  ceiling_height_ft?: number;
  theatre_capacity?: number;
  classroom_capacity?: number;
  ushape_capacity?: number;
  cluster_capacity?: number;
  round_table_capacity?: number;
  floating_capacity?: number;
  is_outdoor: boolean;
  is_active: boolean;
  hotel?: Hotel;
  inquiries?: Inquiry[];
}

export type OfferScope = "global" | "brand" | "property";
export type DiscountType = "percentage" | "flat" | "value_add" | "bogo";

export interface Offer extends StrapiEntity {
  title: string;
  slug: string;
  offer_code?: string;
  description?: string;
  scope: OfferScope;
  discount_type?: DiscountType;
  discount_value?: number;
  currency: string;
  banner_url?: string;
  terms?: string;
  starts_at: string;
  ends_at?: string;
  is_active: boolean;
  brand?: Brand;
  hotel?: Hotel;
  inquiries?: Inquiry[];
}

export type InquiryType =
  | "wedding"
  | "event"
  | "mice"
  | "banquet"
  | "room_booking"
  | "dining"
  | "general";

export type InquirySource =
  | "website"
  | "phone"
  | "email"
  | "walk_in"
  | "referral"
  | "ota"
  | "social"
  | "other";

export type InquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost"
  | "closed";

export interface Inquiry extends StrapiEntity {
  inquiry_type?: InquiryType;
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  assigned_to?: string;
  ip_address?: string;
  event_date?: string;
  guest_count?: number;
  budget_min?: number;
  budget_max?: number;
  message?: string;
  source: InquirySource;
  status: InquiryStatus;
  hotel?: Hotel;
  banquet?: Banquet;
  offer?: Offer;
}

export interface InquiryPayload {
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  inquiry_type?: InquiryType;
  event_date?: string;
  guest_count?: number;
  budget_min?: number;
  budget_max?: number;
  message?: string;
  source?: InquirySource;
  hotel?: string;
  banquet?: string;
  offer?: string;
}
