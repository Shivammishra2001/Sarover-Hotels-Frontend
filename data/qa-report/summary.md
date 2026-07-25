# QA Sweep — Summary Report

**Scope:** Full-site verification against the Phase 5 build (Sarovar-style hotel platform), per Phase 6's self-crawl parity sweep. Read-only on content — the only writes were two throwaway test `inquiry` records (created and deleted during §6, verified back to baseline count) and these report files.

**Environment:** Next.js production build (`npm run build && npm run start`, confirmed via `x-nextjs-prerender`/ISR cache headers — not `next dev`), Strapi backend on `:1337` with live post-Phase-4 ingested content (2649 created / 4 updated / 69 unchanged / **0 failed** on the last `ingest:resume` run). Image backfill for hotel galleries is still in progress in the background (paused for this sweep, restarted after).

**Total inventory crawled:** 3,148 unique frontend paths (3,144 returned 200; 4 returned 404 — see §1 below).

---

## Acceptance targets — scorecard

| Target | Result | Status |
|---|---|---|
| ≥99% of inventory resolves 200 or an intended 301 | 3144/3148 = **99.87%** | ✅ PASS |
| 0 unhandled 500s | **0** | ✅ PASS |
| 0 broken internal links | **2,135 unique broken targets** (2 root causes, see #1/#2 below) | ❌ FAIL |
| 0 broken re-hosted images | **1,721 unique broken images (ALL of them)** | ❌ FAIL — see #3 |
| All slugs/paths resolve 200, no collisions | 2,648 checked, **9 with issues** (99.7% clean) | ⚠️ MOSTLY PASS |
| Field binding ≥99% per type, every block type renders | Scalar fields **99.76%** (9/3804 genuine gaps); **dynamic-zone blocks 0% render** (rich-text 0/1008 precisely confirmed) | ❌ FAIL — see #4 |
| All DB relations render on parent (db_count == rendered_count) | 661/1114 pass (**hotel_galleries, banquets, dinings-listing, attractions all 100%**; rooms 0%, dining-on-root 0% — see #5) | ⚠️ PARTIAL |
| Image-binding rate = 100% in mirror mode | **100%** once the frontend's 48-image gallery display cap is correctly excluded | ✅ PASS (data layer) — see #3 for the separate rendering bug |
| Inquiry form: valid creates, invalid rejects, not publicly readable | **10/10 checks pass** | ✅ PASS |
| Sitemap count within tolerance, delta explained | `app/sitemap.ts` **not implemented** (Phase 6 not started) | N/A |

---

## Top issues, ranked by severity

### 1. 🔴 CRITICAL — Every re-hosted Strapi image fails to load (100% of 1,721 unique images)
Every `/uploads/*` image served through Next.js's Image Optimizer (`/_next/image?url=...`) returns **HTTP 400 "url" parameter is not allowed**, for both the `localhost:1337` and `127.0.0.1:1337` hostnames — despite both being present in `next.config.ts`'s `images.remotePatterns`. Verified independent of width (400 at w=3840, w=1920, and w=640 alike) and independent of hostname variant. Confirmed NOT a general Image Optimizer failure: the same proxy correctly serves local static assets (`/brand/sarovar-logo.png` → 200) and the `picsum.photos` remote pattern (200) — only the Strapi-upload remote patterns (the ones with an explicit `port` + `pathname`) fail. The underlying files themselves are fine (direct fetch of the upload URL returns 200).
**Impact:** every hotel hero image, gallery image, and any other re-hosted media is broken sitewide in the current production build.
**Evidence:** `broken-images.csv` (2,577 rows / 1,721 unique URLs, all `kind=rehosted`, all `status=400`).
**Repro:** `curl -s "http://localhost:3000/_next/image?url=http%3A%2F%2F127.0.0.1%3A1337%2Fuploads%2F<any-uploaded-file>&w=640&q=75"` → body `"url" parameter is not allowed`.

### 2. 🔴 HIGH — Dynamic-zone `body` content never renders anywhere (page / article / hotel-page)
`block.rich-text` renders in **0 of 1,008** instances, precisely confirmed by substring-matching each block's actual text against the crawled page. Root cause isolated: `frontend/src/lib/api.ts`'s `getPageByPath`, `getArticleBySlug`, and `buildHotelDetailPopulate` (used for the `hotel_pages` relation) never include `body` in their Strapi `populate` query — Strapi omits dynamic-zone fields that aren't explicitly populated, so `page.body` is `undefined` at render time and `<BlockRenderer>`'s guard (`if (!blocks...) return null`) silently drops everything. Directly confirmed on a live page (`/hotels/golden-tulip-goa-mandrem/faqs`): zero `<dl>` tags (FaqBlock's marker) and zero `.prose` class occurrences (RichTextBlock's marker), even though that exact record has both a rich-text block and an injected FAQ block in the database.
**Impact:** all scraped rich-text/FAQ/CTA/stats content across every generic `page`, `article`, and `hotel-page` record is invisible on the live site — only the scalar fields (title, excerpt, etc.) ever show.
**Evidence:** `block-type-coverage.csv` (rich-text: 0/1008 rendered). The `gallery` kind shows 694/1008 in that CSV, but that's a coarse "any image present on the page" proxy, not proof of that specific block — given the confirmed root cause (the field is never fetched), the true rendered rate for all block kinds is 0%.
**Repro:** `curl http://localhost:3000/hotels/golden-tulip-goa-mandrem/faqs | grep -c '<dl\|prose'` → 0.

### 3. 🟠 MEDIUM — `RoomCard` has no link to its own detail page; `DiningCard` inconsistently linked
`frontend/src/components/hotel/RoomCard.tsx` renders a plain, non-interactive card — there is no `<Link>` anywhere in the component. Room detail pages (`/hotels/{slug}/rooms/{room-slug}`) exist and crawl fine (confirmed in `url-health.csv`), but there is **no UI path to reach them** from either the hotel root page or the `/rooms` listing page (both render `RoomCard` the same way). `DiningCard` is the opposite case: `frontend/src/app/hotels/[slug]/dining/page.tsx` wraps it in a `<Link>`, but `frontend/src/app/hotels/[slug]/page.tsx` (hotel root) renders the identical card with no `Link` wrapper — the same content is clickable in one place and not the other.
**Impact:** 640 room detail pages across 152 hotels are effectively undiscoverable via navigation (search-engine/sitemap-only reachable); dining detail pages are one click short of reachable from the hotel's own landing page.
**Evidence:** `relation-binding.csv` — `rooms (listing page)`: 0/152 pass, `rooms (hotel root)`: 0/152 pass, `dinings (hotel root)`: 0/149 pass (vs. `dinings (listing page)`: 149/149 pass).

### 4. 🟠 MEDIUM — `seo` component data (meta_title, canonical, structured_data) is captured but almost never bound to the rendered page
- **Canonical tags:** only 44/1046 pages (4.2%) render a `<link rel="canonical">` at all — traced to only 1 of 22 `generateMetadata` functions (`app/[...slug]/page.tsx`, the generic-page catch-all) ever setting `alternates.canonical`; every structured route (hotel, room, dining, banquet, offer, destination, blog, and all hotel-page sections) omits it.
- **JSON-LD structured data:** **0/1046 pages** render any `<script type="application/ld+json">`, even though `seo.structured_data` is populated for hotels (confirmed via direct API check — full Schema.org `Hotel` JSON-LD is stored, including address/geo/rooms/photos). It's simply never emitted anywhere in the frontend.
- **`meta_title`:** only 220/1046 (21%) of rendered `<title>` tags match the ingested `seo.meta_title`, even where it's populated (93/100 sampled hotels have a real scraped meta_title). Confirmed cause: `app/hotels/[slug]/page.tsx`'s `generateMetadata` hardcodes `title: hotel.name` instead of `hotel.seo?.meta_title`.
- **`meta_description`:** effectively **never populated at the ingestion layer** (0/100 sampled hotels have a non-null `seo.meta_description`) — the "100% bound" figure in `seo-parity.csv` is vacuous (nothing to bind), not a real pass. This is a Phase-4 ingestion gap, not a Phase-5 binding gap.
**Evidence:** `seo-parity.csv`, `seo-parity-summary.json`.

### 5. 🟡 LOW — `hotel-page.title` never rendered for the 7 named sections (by design, not a bug)
Confirmed intentional: `HotelSectionContent.tsx` uses a clean static label (`fallbackTitle`) instead of the raw scraped `title` for `rooms_listing`/`dining_listing`/`banquets_listing`/`location`/`amenities`/`legal`/`wellness`/`home_delivery`/`faqs`/`contact` (per an existing code comment — the scraped title usually duplicates the hotel name). Only `section_key='other'` (routed through `[...section]`) renders `page.title` directly, and does so correctly (100% match where content isn't otherwise 404ing — see #6). Reported here for completeness per the task's field-binding ask, not because it needs fixing.
**Evidence:** `field-binding.csv`, 661 rows tagged `by_design_not_rendered_for_named_sections`.

### 6. 🟡 LOW — `/offers/{slug}` route collision swallows 3 ingested utility pages
`/offers/mice-offers.html`, `/offers/sarovar-hotels-x-fly91.html`, `/offers/why-book-direct.html` were correctly reclassified during Phase 4 as generic `page` records (real title/content confirmed present in the DB), but Next's literal `/offers/[slug]` dynamic route intercepts any single-segment path under `/offers/` before the `[...slug]` catch-all ever gets a chance, and `getOfferBySlug` finds no matching `offer` record → 404. The content is fully ingested and completely unreachable.
**Evidence:** `url-health.csv` (3× `bad_status:404`), `slug-integrity.csv` (same 3 `page` rows, `resolves_404_not_200`).

### 7. 🟡 LOW — 1 hotel-page path collides with a literal named-section route
`/lagoon-sarovar-premiere-pondicherry/amenities.html` was classified `hotel-other-subpage` (its source URL used `amenities.html` where the classifier expects `facilities.html`), so its catch-all-derived frontend path (`/hotels/lagoon-sarovar-premiere-pondicherry/amenities`) collides with the **literal** `/hotels/[slug]/amenities` route, which always wins over `[...section]` regardless of `generateStaticParams` — the page 404s even though the real content exists under a different `section_key`. Isolated instance (1 of 199 `other`-bucket hotel-pages).
**Evidence:** `url-health.csv`, confirmed via direct Strapi query cross-check.

### 8. ℹ️ Informational — 152 `gallery.html` "orphans" are an already-tracked, in-progress gap, not a new bug
152 of 2,723 live source-sitemap URLs (all `{hotel}/gallery.html`) have no `hotel-gallery` DB record yet — expected, since `hotel-gallery` records are created per-image only once the image backfill (`ingest:backfill-images:resume`) processes that hotel, and the backfill was ~16% complete (29/179 targets) with the run paused for this sweep. Not a routing or binding defect.
**Evidence:** `url-inventory-summary.json` (`galleryOrphanCount: 152`, `orphanCount: 0` for everything else).

### 9. ℹ️ Informational — `youtube.com/@sarovarhotels` is a genuine dead link; LinkedIn's HEAD-block was a false positive (fixed)
The footer's YouTube link 404s in a real browser (`curl -L` confirms, channel doesn't exist). The LinkedIn link initially looked broken too, but that was HEAD-request bot-blocking (403) on LinkedIn's side — a GET succeeds (200); the crawler was patched mid-sweep to fall back to GET before flagging, which is reflected in the final `broken-links.csv`.

---

## Section-by-section detail

| § | Report file(s) | Result |
|---|---|---|
| 1. URL inventory | `url-inventory.csv`, `url-inventory-summary.json`, `url-inventory-orphans.json` | 3,148 DB-servable paths reconciled against 2,723 live source URLs; 0 unexplained orphans (152 explained gallery-backfill-pending, 1 explained home-route). 72 pre-existing Phase 1/2 demo records identified (`source_url is null`) and excluded from source-parity accounting. |
| 2. URL health crawl | `url-health.csv`, `url-health-summary.json` | 3144/3148 = 99.87% return 200. 4× 404 (all explained, see #6/#7). 0 redirect chains >1 hop (no redirects exist yet — Phase 6 not started). |
| 3. Redirects | `redirects.csv` | 0 `redirect` records exist in the DB — Phase 6 not started. N/A, not a failure. |
| 4. Broken links/images | `broken-links.csv`, `broken-images.csv` | Internal: 2,135 unique broken targets, both root-caused (#3 RoomCard/DiningCard nav gaps, plus the pre-existing nav-section-missing issue flagged in the original Phase-5 QA request — `/faqs` and `/contact` sections don't exist for most hotels, ~1023/1015 link instances). External: 1 genuine dead link (YouTube), 1 false positive fixed (LinkedIn). Images: 100% failure rate, see #1. |
| 5a. Slug integrity | `slug-integrity.csv` | 2648 checked, 9 issues (3 from #6, 1 from #7, 5 minor/no-route-by-design for brands). No true duplicate-slug collisions found anywhere (rooms' derived slugs, dining/banquet's DB-unique slugs, attraction's per-hotel slugs — all clean). |
| 5b. Field binding | `field-binding.csv` | 3804 checks, 99.76% genuine bind rate (9 real gaps, all explained above); 661 additional rows are documented by-design behavior, not failures. |
| 5b (blocks). Block-type coverage | `block-type-coverage.csv` | rich-text 0/1008 (see #2); gallery 694/1008 (coarse proxy, not reliable given #2's root cause). |
| 5c. Relation binding | `relation-binding.csv` | hotel_galleries 162/162, banquets 107/107 (both root+listing), dinings-listing 149/149, attractions-listing 72/72, offers-root 64/64 — all 100%. Rooms (root+listing) and dinings-root are 0% — see #3 (a real linking bug, not a data-binding bug: the DB relation is correctly fetched, the component just never renders a link to it). |
| 5d. Image binding | `image-binding.csv` | 100% once the frontend's 48-image gallery cap is correctly excluded from the denominator (raw aggregate looked like 94.9%, entirely explained by the cap — 0 genuinely unbound records). Mirror-mode source check: 2237/2317 (96.5%) of stored media URLs are already re-hosted `/uploads` assets rather than source-CDN links (the remainder awaits the in-progress image backfill). |
| 6. Functional | `functional-report.md` | 10/10 pass, 1 N/A (no dedicated `navigation` content type — nav is hardcoded, verified structurally instead). Inquiry form fully round-tripped: valid/invalid submission, relation binding, public-read lockout (403), and cleanup all verified. |
| 7. SEO parity | `seo-parity.csv`, `seo-parity-summary.json` | See #4. `sitemap.xml`/`robots.txt` not implemented (Phase 6 not started) — confirmed via live 404 and absence of `app/sitemap.ts`/`app/robots.ts`. |

---

## Exact commands to reproduce this sweep

```bash
# Preconditions
cd frontend && npm run build && npm run start   # production server on :3000
cd backend  && npm run develop                  # Strapi on :1337 (confirm via curl http://localhost:1337/api/hotels)

# Full sweep, in order (all scripts live in backend/scripts/qa/)
cd backend
npx tsx scripts/qa/01-inventory.ts
npx tsx scripts/qa/02-crawl.ts              # ~3-4 min; produces url-health/broken-links/broken-images + the
                                             # _page-analysis.jsonl cache §5b/§5c/§5d/§7 read from
npx tsx scripts/qa/03-redirects.ts
npx tsx scripts/qa/05a-slug-integrity.ts
npx tsx scripts/qa/05b-field-binding.ts
npx tsx scripts/qa/05c-relation-binding.ts
npx tsx scripts/qa/05d-image-binding.ts
npx tsx scripts/qa/06-functional.ts         # writes + deletes 2 throwaway test inquiries
npx tsx scripts/qa/07-seo-parity.ts
```

All output lands in `data/qa-report/`. Re-running `02-crawl.ts` (or any downstream script) is safe and idempotent — it overwrites the same CSVs.

---

## What this sweep did NOT do (explicitly out of scope)

- No fixes were applied to any of the issues above — this is a report-only pass, per the task brief.
- No Playwright/browser E2E — everything above is server-rendered HTML inspection + HTTP checks (per the task's explicit scope boundary).
- Image-backfill completion was not waited for (still running in the background per prior instruction); §5d/§8's 100% image-binding figure covers only currently-existing `hotel-gallery` records, not the ~150 hotels whose backfill hasn't reached them yet (tracked separately, see #8).
