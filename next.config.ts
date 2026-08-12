import type { NextConfig } from "next";

const strapiUrl = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
);

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const isLoopbackStrapi = LOOPBACK_HOSTNAMES.has(strapiUrl.hostname);

/**
 * `next.config.ts` loads before webpack/tsconfig path aliases are wired up, so
 * `@/lib/api` isn't safely importable here — a bare inline fetch avoids fighting
 * that module resolution. Paginates the same way every fetcher in `src/lib/api.ts`
 * does: loop until `page >= pageCount`.
 */
async function fetchAllStrapiPages<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const pageSize = 100;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const qs = new URLSearchParams({
      ...params,
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    });

    const res = await fetch(
      `${strapiUrl.origin}/api${path}?${qs.toString()}`,
      {
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      throw new Error(`Strapi ${path} -> ${res.status}`);
    }

    const json = (await res.json()) as {
      data: T[];
      meta: {
        pagination?: {
          pageCount: number;
        };
      };
    };

    all.push(...json.data);

    if (
      !json.meta.pagination ||
      page >= json.meta.pagination.pageCount
    ) {
      break;
    }

    page += 1;
  }

  return all;
}

/**
 * `redirect.from_path` legitimately collides with two live route families —
 * `/destinations/{slug}` and `/hotels/{slug}`.
 *
 * A redirect source that shadows a real, currently-rendered page is a bug,
 * so those paths are excluded from the redirect list.
 */
interface SimpleRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

async function buildRedirects(): Promise<SimpleRedirect[]> {
  type RedirectRow = {
    from_path: string;
    to_path: string;
    status_code: "permanent" | "temporary";
  };

  const [redirects, destinations, hotels] = await Promise.all([
    fetchAllStrapiPages<RedirectRow>("/redirects", {
      "filters[is_active][$eq]": "true",
    }),

    fetchAllStrapiPages<{ slug: string }>("/destinations", {
      "fields[0]": "slug",
    }),

    fetchAllStrapiPages<{ slug: string }>("/hotels", {
      "fields[0]": "slug",
    }),
  ]);

  const liveRoutePaths = new Set<string>([
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...hotels.map((h) => `/hotels/${h.slug}`),
  ]);

  /**
   * Next.js trailingSlash defaults to false.
   * Normalize incoming redirect paths to the no-trailing-slash form.
   */
  const stripTrailingSlash = (p: string) =>
    p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

  const bySource = new Map<string, SimpleRedirect>();

  for (const r of redirects) {
    const source = stripTrailingSlash(r.from_path);

    if (liveRoutePaths.has(source)) {
      continue;
    }

    bySource.set(source, {
      source,
      destination: stripTrailingSlash(r.to_path),
      permanent: r.status_code === "permanent",
    });
  }

  return [...bySource.values()];
}

const nextConfig: NextConfig = {
  /**
   * Allow accessing the Next.js development server
   * from this LAN/dev origin.
   */
  allowedDevOrigins: ["10.50.1.3"],

  /**
   * Runs once at build/dev-server-start.
   * If Strapi is unreachable, continue without CMS redirects.
   */
  async redirects() {
    try {
      return await buildRedirects();
    } catch (err) {
      console.warn(
        "[next.config] Skipping CMS-sourced redirects (Strapi unreachable):",
        err
      );

      return [];
    }
  },

  /**
   * The static hotel/room/dining/etc. pages fetch from a single
   * dev-mode Strapi instance. Limit concurrent workers.
   */
  experimental: {
    cpus: 2,
  },

  images: {
    /**
     * Only allow local/private IP image fetching when Strapi
     * itself is configured as a loopback host.
     */
    dangerouslyAllowLocalIP: isLoopbackStrapi,

    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
        pathname: "/uploads/**",
      },

      /**
       * Some locally-ingested media URLs use 127.0.0.1 instead
       * of localhost.
       */
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