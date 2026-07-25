import type { NextConfig } from "next";

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337");
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);
const isLoopbackStrapi = LOOPBACK_HOSTNAMES.has(strapiUrl.hostname);

const nextConfig: NextConfig = {
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
