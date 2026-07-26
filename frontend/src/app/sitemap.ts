import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import {
  getAllArticleSlugs,
  getAllAttractionParams,
  getAllBanquetParams,
  getAllCityHotelParams,
  getAllCitySlugs,
  getAllDiningParams,
  getAllHotelSlugs,
  getAllHotelSlugsForSection,
  getAllOfferSlugs,
  getAllPagePaths,
  getAllRoomParams,
  getBrandsByGroup,
  getSitemapArticles,
  getSitemapDestinations,
  getSitemapHotels,
  getSitemapOffers,
  getSitemapPages,
} from "@/lib/api";
import { PHASE7_BLOG_CATEGORIES, PHASE7_BRAND_GROUPS } from "@/config/site";
import { slugify } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";

/**
 * Every literal (no `[...]` segment) `page.tsx` under `src/app`, walked once at
 * sitemap-build time instead of hand-maintained — new static routes (about,
 * rewards/*, weddings/*, offers/mice-offers, etc.) are picked up for free.
 * Any directory whose name contains "[" is a dynamic route family and is
 * enumerated separately below from real CMS/DB data, not guessed here.
 */
function walkStaticRoutes(dir: string, segments: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    routes.push(segments.length ? `/${segments.join("/")}` : "/");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("(") || entry.name.startsWith("_") || entry.name === "api") continue;
    if (entry.name.includes("[")) continue;
    routes.push(...walkStaticRoutes(path.join(dir, entry.name), [...segments, entry.name]));
  }

  return routes;
}

// [city]/{section}/page.tsx — only "hotels" is wired to real content so far
// (Phase 4). The other 9 folders (restaurants, things-to-do, experiences,
// travel-guide, wedding-venues, meeting-venues, offers, gallery, faqs) still
// call notFound() as Phase-1 stubs — advertising them in the sitemap before
// they render anything would just manufacture ~860 false 404s. Add each back
// here as it gets wired in a later pass.
const CITY_SUBROUTES = ["hotels"];

// [city]/[hotel]/{section}/page.tsx — every section folder under
// src/app/[city]/[hotel]/ besides the base hotel page itself.
const CITY_HOTEL_SUBROUTES = [
  "amenities",
  "book",
  "dining",
  "experiences",
  "faqs",
  "gallery",
  "location",
  "meetings",
  "offers",
  "reviews",
  "rooms",
  "weddings",
];

// Legacy hotels/[slug]/{section}/page.tsx — the flat pre-Phase-4 hotel detail
// tree, kept live alongside the new /{city}/{hotel}/ tree (see CLAUDE.md §3
// routing precedence note). Excludes the nested resource detail routes
// (rooms/[room], dining/[outlet], banquets/[hall], nearby/[attraction]),
// which are enumerated separately below from their own param fetchers, and
// excludes hotels/[slug]/[...section] (the ~199 long-tail "other" hotel-pages)
// — deliberately left out of generateStaticParams in that route itself
// (reconstructing exact multi-segment paths ahead of time needs a second full
// query per hotel; same judgment call applies here).
//
// These list pages derive from relations present on essentially every hotel
// (rooms/dinings/banquets/hotel_galleries/attractions), confirmed broad via
// the build output (~162/162 each) — safe to advertise for every hotel slug.
const LEGACY_HOTEL_BROAD_SUBROUTES = ["banquets", "dining", "gallery", "rooms", "nearby"];

// These seven share `makeHotelSectionPage()` (see lib/hotelSectionPage.tsx),
// which only renders (and only has generateStaticParams for) hotels that
// actually have a matching `hotel_pages` row for that section_key — sparse
// (as few as 3-10 hotels for some). Advertising them for all 162 hotels
// produced ~300 false 404s in the parity sweep; map URL segment -> real
// section_key and filter per-section via getAllHotelSlugsForSection.
const LEGACY_HOTEL_SECTION_SUBROUTES: Array<{ segment: string; sectionKey: string }> = [
  { segment: "amenities", sectionKey: "amenities" },
  { segment: "contact", sectionKey: "contact" },
  { segment: "faqs", sectionKey: "faqs" },
  { segment: "home-delivery", sectionKey: "home_delivery" },
  { segment: "legal", sectionKey: "legal" },
  { segment: "location", sectionKey: "location" },
  { segment: "wellness", sectionKey: "wellness" },
];

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "src", "app");
  const staticPaths = walkStaticRoutes(appDir);

  const entries: Entry[] = staticPaths.map((p) => ({ url: `${SITE_URL}${p}` }));
  const seen = new Set(staticPaths);
  const add = (urlPath: string, lastModified?: string) => {
    if (seen.has(urlPath)) return; // de-dupe against static walk + repeated fan-outs
    seen.add(urlPath);
    entries.push({ url: `${SITE_URL}${urlPath}`, ...(lastModified ? { lastModified } : {}) });
  };

  const [
    citySlugs,
    cityHotelParams,
    hotelSlugs,
    sitemapDestinations,
    sitemapHotels,
    sitemapPages,
    sitemapArticles,
    sitemapOffers,
    articleSlugs,
    offerSlugs,
    pagePaths,
    roomParams,
    diningParams,
    banquetParams,
    attractionParams,
  ] = await Promise.all([
    getAllCitySlugs(),
    getAllCityHotelParams(),
    getAllHotelSlugs(),
    getSitemapDestinations(),
    getSitemapHotels(),
    getSitemapPages(),
    getSitemapArticles(),
    getSitemapOffers(),
    getAllArticleSlugs(),
    getAllOfferSlugs(),
    getAllPagePaths(),
    getAllRoomParams(),
    getAllDiningParams(),
    getAllBanquetParams(),
    getAllAttractionParams(),
  ]);

  const destinationLastmod = new Map(sitemapDestinations.map((d) => [d.slug, d.updatedAt]));
  const hotelLastmodByPath = new Map(
    sitemapHotels.filter((h) => h.path).map((h) => [h.path as string, h.updatedAt])
  );
  const pageLastmod = new Map(sitemapPages.map((p) => [p.path, p.updatedAt]));
  const articleLastmod = new Map(sitemapArticles.map((a) => [a.slug, a.updatedAt]));
  const offerLastmod = new Map(sitemapOffers.map((o) => [o.slug, o.updatedAt]));

  // City hub + its 9 sections (96 destinations x 10).
  for (const city of citySlugs) {
    add(`/${city}`, destinationLastmod.get(city));
    for (const sub of CITY_SUBROUTES) add(`/${city}/${sub}`);
  }

  // Canonical /{city}/{hotel}/ tree + its 12 sections (162 hotels x 13).
  for (const { city, hotel } of cityHotelParams) {
    const canonicalPath = `/${city}/${hotel}/`;
    add(`/${city}/${hotel}`, hotelLastmodByPath.get(canonicalPath));
    for (const sub of CITY_HOTEL_SUBROUTES) add(`/${city}/${hotel}/${sub}`);
  }

  // Legacy /hotels/{slug}/ tree — kept live alongside the new tree per the
  // operator's "keep both" decision. Broad sections apply to every hotel;
  // sparse (makeHotelSectionPage-backed) sections only to hotels that
  // actually have a matching hotel_pages row for that section_key.
  for (const slug of hotelSlugs) {
    add(`/hotels/${slug}`);
    for (const sub of LEGACY_HOTEL_BROAD_SUBROUTES) add(`/hotels/${slug}/${sub}`);
  }
  for (const { segment, sectionKey } of LEGACY_HOTEL_SECTION_SUBROUTES) {
    const slugsWithSection = await getAllHotelSlugsForSection(sectionKey);
    for (const slug of slugsWithSection) add(`/hotels/${slug}/${segment}`);
  }

  // Legacy /destinations/{slug} detail page — still served alongside the new
  // /{city}/ hub (see CLAUDE.md Phase 4 note); doesn't shrink the URL count.
  for (const [slug, lastMod] of destinationLastmod) add(`/destinations/${slug}`, lastMod);

  // Nested hotel resource detail pages.
  for (const r of roomParams) add(`/hotels/${r.hotel}/rooms/${slugify(r.name)}`);
  for (const d of diningParams) add(`/hotels/${d.hotel}/dining/${d.outlet}`);
  for (const b of banquetParams) add(`/hotels/${b.hotel}/banquets/${b.hall}`);
  for (const a of attractionParams) add(`/hotels/${a.hotel}/nearby/${a.attraction}`);

  // Blog articles + curated blog categories.
  for (const slug of articleSlugs) add(`/blog/${slug}`, articleLastmod.get(slug));
  for (const category of PHASE7_BLOG_CATEGORIES) add(`/blogs/${category.slug}`);

  // Offers.
  for (const slug of offerSlugs) add(`/offers/${slug}`, offerLastmod.get(slug));

  // Brand groups + individual brand pages.
  for (const group of PHASE7_BRAND_GROUPS) {
    add(`/brands/${group}`);
    const brands = await getBrandsByGroup(group);
    for (const brand of brands) add(`/brands/${group}/${brand.slug}`);
  }

  // Generic CMS pages (about/legal/corporate/etc, driven by the [...slug] catch-all).
  for (const p of pagePaths) add(p, pageLastmod.get(p));

  return entries;
}
