import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getBrandsByGroup } from "@/lib/api";
import { PHASE7_BRAND_GROUPS } from "@/config/site";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import type { BrandGroup } from "@/types";

const GROUP_LABELS: Record<string, string> = {
  sarovar: "Sarovar Brands",
  louvre: "Louvre Brands",
  partner: "Partner Brands",
};

interface Props {
  params: Promise<{ group: string }>;
}

export async function generateStaticParams() {
  return PHASE7_BRAND_GROUPS.map((group) => ({ group }));
}

function isBrandGroup(value: string): value is BrandGroup {
  return (PHASE7_BRAND_GROUPS as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params;
  if (!isBrandGroup(group)) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: GROUP_LABELS[group],
    fallbackDescription: `Hotels under our ${GROUP_LABELS[group]} portfolio.`,
    path: `/brands/${group}`,
  });
}

export default async function BrandGroupPage({ params }: Props) {
  const { group } = await params;
  if (!isBrandGroup(group)) notFound();

  const brands = await getBrandsByGroup(group);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Our Brands" title={GROUP_LABELS[group]} />

        {brands.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link key={brand.documentId} href={`/brands/${group}/${brand.slug}`}>
                <Card className="flex h-full flex-col items-center p-8 text-center transition-shadow hover:shadow-lg">
                  <div className="relative h-14 w-full">
                    {brand.logo_url ? (
                      <Image
                        src={getMediaUrl(brand.logo_url)}
                        alt={brand.name}
                        fill
                        sizes="200px"
                        className="object-contain"
                        unoptimized={isUnoptimizedMediaUrl(getMediaUrl(brand.logo_url))}
                      />
                    ) : (
                      <p className="font-display text-lg font-semibold text-navy">{brand.name}</p>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-ink/60">{brand.hotels?.length ?? 0} hotels</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink/60">
            No brands published under this group yet — check back soon.
          </p>
        )}
      </Container>
    </div>
  );
}
