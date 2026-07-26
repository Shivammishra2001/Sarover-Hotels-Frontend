import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// This Next.js app never proxies the Strapi admin/API (that's a separate
// backend origin entirely — see backend/CLAUDE.md), so there's no `/api/`
// or admin path on this origin that needs disallowing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
