import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelCard } from "@/components/hotel/HotelCard";
import { getBrandBySlug, getBrandsByGroup } from "@/lib/api";
import { PHASE7_BRAND_GROUPS } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import type { BrandGroup } from "@/types";

interface Props {
  params: Promise<{ group: string; brand: string }>;
}

export async function generateStaticParams() {
  const params: { group: string; brand: string }[] = [];
  for (const group of PHASE7_BRAND_GROUPS) {
    const brands = await getBrandsByGroup(group);
    brands.forEach((b) => params.push({ group, brand: b.slug }));
  }
  return params;
}

function isBrandGroup(value: string): value is BrandGroup {
  return (PHASE7_BRAND_GROUPS as readonly string[]).includes(value);
}

async function resolveBrand(group: string, brandSlug: string) {
  if (!isBrandGroup(group)) return null;
  const brand = await getBrandBySlug(brandSlug);
  // Golden Tulip is canonically `louvre` but also listed under `/brands/sarovar/`
  // via shown_in_sarovar_group — accept either the canonical group or that flag.
  if (!brand) return null;
  if (brand.brand_group !== group && !(group === "sarovar" && brand.shown_in_sarovar_group)) return null;
  return brand;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group, brand: brandSlug } = await params;
  const brand = await resolveBrand(group, brandSlug);
  if (!brand) return { title: "Brand Not Found" };
  return buildMetadata({
    seo: brand.seo,
    fallbackTitle: brand.name,
    fallbackDescription: brand.description,
    path: `/brands/${group}/${brandSlug}`,
  });
}

export default async function BrandDetailPage({ params }: Props) {
  const { group, brand: brandSlug } = await params;
  const brand = await resolveBrand(group, brandSlug);
  if (!brand) notFound();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={brand.tier} title={brand.name} description={brand.description} />

        <div className="mt-10">
          <SectionHeading title={`Hotels under ${brand.name}`} />
          {brand.hotels && brand.hotels.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brand.hotels.map((hotel) => (
                <HotelCard key={hotel.documentId} hotel={hotel} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink/60">No hotels published under this brand yet.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
