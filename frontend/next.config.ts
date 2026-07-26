import type { NextConfig } from "next";

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337");
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const isLoopbackStrapi = LOOPBACK_HOSTNAMES.has(strapiUrl.hostname);

/**
 * `next.config.ts` loads before webpack/tsconfig path aliases are wired up, so
 * `@/lib/api` isn't safely importable here — a bare inline fetch avoids fighting
 * that module resolution (see Phase 6 task notes). Paginates the same way every
 * fetcher in `src/lib/api.ts` does: loop until `page >= pageCount`.
 */
async function fetchAllStrapiPages<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const pageSize = 100;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const qs = new URLSearchParams({ ...params, "pagination[page]": String(page), "pagination[pageSize]": String(pageSize) });
    const res = await fetch(`${strapiUrl.origin}/api${path}?${qs.toString()}`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`Strapi ${path} -> ${res.status}`);
    const json = (await res.json()) as { data: T[]; meta: { pagination?: { pageCount: number } } };
    all.push(...json.data);
    if (!json.meta.pagination || page >= json.meta.pagination.pageCount) break;
    page += 1;
  }
  return all;
}

/**
 * `redirect.from_path` legitimately collides with two live route families —
 * `/destinations/{slug}` (the still-served destination-detail page, kept
 * alongside the new `/hotels-in-{slug}/` city hub per Phase 4) and
 * `/hotels/{slug}` (the still-served legacy hotel detail page). Confirmed via a
 * direct DB audit: 96/96 destination slugs and 104/104 matching hotel slugs in
 * the redirect table exactly shadow those live pages. A redirect `source` that
 * shadows a real, currently-rendered page is a bug — those specific old paths
 * already resolve to real content, so they're excluded here rather than
 * silently killing ~200 live pages.
 */
interface SimpleRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

async function buildRedirects(): Promise<SimpleRedirect[]> {
  type RedirectRow = { from_path: string; to_path: string; status_code: "permanent" | "temporary" };
  const [redirects, destinations, hotels] = await Promise.all([
    fetchAllStrapiPages<RedirectRow>("/redirects", { "filters[is_active][$eq]": "true" }),
    fetchAllStrapiPages<{ slug: string }>("/destinations", { "fields[0]": "slug" }),
    fetchAllStrapiPages<{ slug: string }>("/hotels", { "fields[0]": "slug" }),
  ]);

  const liveRoutePaths = new Set<string>([
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...hotels.map((h) => `/hotels/${h.slug}`),
  ]);

  // `trailingSlash` is unset (defaults false), so Next.js normalizes an
  // incoming `/foo/` request to `/foo` via its OWN built-in redirect BEFORE
  // matching custom `redirects()` sources — a `source` with a trailing slash
  // (as ~300 ingested `from_path` values have, e.g. `/sarovar-portico-jaipur/`)
  // never matches, and the request gets redirected back to its own
  // slash-stripped self instead of the intended destination. Normalize both
  // sides to the no-trailing-slash form Next actually matches against.
  const stripTrailingSlash = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);

  const bySource = new Map<string, SimpleRedirect>();
  for (const r of redirects) {
    const source = stripTrailingSlash(r.from_path);
    if (liveRoutePaths.has(source)) continue;
    bySource.set(source, {
      source,
      destination: stripTrailingSlash(r.to_path),
      permanent: r.status_code === "permanent",
    });
  }
  return [...bySource.values()];
}

const nextConfig: NextConfig = {
  // Runs once at build/dev-server-start (not per-request) — 974 rows is trivial.
  // Strapi being unreachable (e.g. `next build` run without the backend up)
  // must not hard-fail the whole build, so this degrades to "no redirects"
  // rather than throwing.
  async redirects() {
    try {
      return await buildRedirects();
    } catch (err) {
      console.warn("[next.config] Skipping CMS-sourced redirects (Strapi unreachable):", err);
      return [];
    }
  },
  // The ~2,555 static hotel/room/dining/etc. pages all fetch from a single
  // dev-mode Strapi instance (SQLite, no connection pooling) at build time.
  // The default worker count fires far more concurrent requests than that
  // instance can serve, causing ECONNRESET/timeouts mid-build — cap it down.
  experimental: {
    cpus: 2,
  },
  images: {
    // `remotePatterns` alone is NOT sufficient here: Next's image optimizer has a
    // separate, unconditional SSRF guard that rejects any upstream image whose
    // hostname resolves to a private/loopback IP — logged server-side as
    // `upstream image ... resolved to private ip [...]` — regardless of whether
    // remotePatterns matches. Confirmed via node_modules/next/dist/server/image-optimizer.js
    // (fetchExternalImage's `dangerouslyAllowLocalIP` guard). Only opt out of that
    // guard when the configured Strapi host actually IS loopback (local dev) — a
    // real deployment with a public Strapi host would have `isLoopbackStrapi` false
    // and get the guard's full protection.
    dangerouslyAllowLocalIP: isLoopbackStrapi,
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
      // The Phase 4 ingestion pipeline stored some media_url values against
      // 127.0.0.1 (used to route around local DNS flakiness) rather than
      // `localhost` — both point at the same dev Strapi instance.
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: "127.0.0.1",
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
