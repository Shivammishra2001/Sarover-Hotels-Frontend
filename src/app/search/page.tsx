import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SiteSearch } from "@/components/forms/SiteSearch";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Search",
  fallbackDescription: "Search across hotels and destinations.",
  path: "/search",
});

export const revalidate = 3600;

export default async function SearchPage() {
  const index = await getSearchIndex();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Search" title="Search Hotels & Destinations" />
        <div className="mt-10">
          <SiteSearch index={index} />
        </div>
      </Container>
    </div>
  );
}
