import qs from "qs";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// `STRAPI_API_URL` is a server-only env var (faster/direct in server components).
// It is inlined to `undefined` in the client bundle, so browser code (e.g. the
// InquiryForm client component) falls back to the public URL instead.
const STRAPI_API_URL =
  typeof window === "undefined"
    ? process.env.STRAPI_API_URL ?? `${STRAPI_URL}/api`
    : `${STRAPI_URL}/api`;

export class StrapiApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "StrapiApiError";
    this.status = status;
    this.details = details;
  }
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  revalidate?: number | false;
  cache?: RequestCache;
}

/**
 * Base fetch helper for the Strapi v5 REST API. Query params (populate,
 * filters, sort, pagination, ...) are serialized with `qs` rather than
 * `populate=*`, so callers can express deep/nested population.
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<T> {
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
  const requestUrl = `${STRAPI_API_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const fetchInit: RequestInit & { next?: { revalidate?: number | false } } = {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (options.body !== undefined) {
    fetchInit.body = JSON.stringify(options.body);
  }

  if (options.cache) {
    fetchInit.cache = options.cache;
  } else {
    fetchInit.next = { revalidate: options.revalidate ?? 60 };
  }

  const response = await fetch(requestUrl, fetchInit);
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = json?.error?.message ?? response.statusText ?? "Strapi request failed";
    throw new StrapiApiError(message, response.status, json?.error?.details);
  }

  // Strapi v5 responses are flattened (no `.attributes` wrapper); `data` is
  // returned as-is, with entities identified by `documentId`.
  return json as T;
}
