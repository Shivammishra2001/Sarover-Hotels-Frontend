import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { getBrandsByGroup } from "@/lib/api";
import { PHASE7_BRAND_GROUPS } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

const GROUP_LABELS: Record<string, string> = {
  sarovar: "Sarovar Brands",
  louvre: "Louvre Brands",
  partner: "Partner Brands",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    fallbackTitle: "Our Brands",
    fallbackDescription: "Explore every hotel brand across the Sarovar and Louvre families.",
    path: "/brands",
  });
}

export default async function BrandsIndexPage() {
  const groups = await Promise.all(
    PHASE7_BRAND_GROUPS.map(async (group) => ({
      group,
      label: GROUP_LABELS[group],
      brands: await getBrandsByGroup(group),
    }))
  );

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Brands"
          title="Every Brand, One Group"
          description="From upscale business hotels to boutique economy stays — explore our full brand portfolio."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {groups.map(({ group, label, brands }) => (
            <Link key={group} href={`/brands/${group}`}>
              <Card className="flex h-full flex-col p-8 text-center transition-shadow hover:shadow-lg">
                <h2 className="font-display text-2xl font-semibold text-navy">{label}</h2>
                <p className="mt-3 text-sm text-ink/60">
                  {brands.length > 0
                    ? `${brands.length} brand${brands.length === 1 ? "" : "s"}`
                    : "Coming soon"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
