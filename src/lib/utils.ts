import { STRAPI_URL } from "./strapi";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value?: number | null, currency = "INR") {
  if (value === undefined || value === null) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

/**
 * Resolves a media path to an absolute URL pointed at the current Strapi host.
 *
 * Relative `/uploads/...` paths are simply prefixed with `STRAPI_URL`. Some
 * content fields (e.g. `hero_image_url`, `media_url`) were ingested with an
 * already-absolute URL baked in at ingest time — using whatever host Strapi
 * resolved to then (often `localhost:1337`). If left as-is, those stale hosts
 * would never track `NEXT_PUBLIC_STRAPI_URL` changes, so any absolute URL
 * whose path is a Strapi upload has its origin rewritten to `STRAPI_URL`.
 * Absolute URLs that aren't Strapi uploads (external CDNs, picsum, etc.) are
 * passed through untouched.
 */
export function getMediaUrl(path?: string | null) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      if (url.pathname.startsWith("/uploads/")) {
        return `${STRAPI_URL}${url.pathname}${url.search}`;
      }
    } catch {
      // Malformed URL — fall through and return it unchanged.
    }
    return path;
  }

  return `${STRAPI_URL}${path}`;
}

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Strapi-hosted media resolves to a loopback host in local dev. Next's built-in
 * Image Optimizer proxy has a hardcoded, non-configurable 7s upstream-fetch
 * timeout (node_modules/next/dist/server/image-optimizer.js) that this sandbox's
 * flaky local `fetch` (undici) reliably blows past — the same class of issue
 * already worked around with curl in backend/scripts/ingest/{fetcher,images}.ts.
 * Pass `unoptimized={isUnoptimizedMediaUrl(src)}` on every `<Image>` sourced via
 * `getMediaUrl()` so the browser fetches loopback-hosted images directly instead
 * of round-tripping them through that proxy. A real deployment's Strapi host
 * won't be loopback, so this only ever short-circuits local dev.
 */
export function isUnoptimizedMediaUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    return LOOPBACK_HOSTNAMES.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

/** Room has no stored slug (Phase 1 schema) — derive a stable, URL-safe one from its name. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function humanizeEnum(value?: string | null) {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
