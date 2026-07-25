import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotelBySlug, getAllBanquetParams } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { Badge } from "@/components/ui/Badge";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { humanizeEnum } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string; hall: string }>;
}

export const revalidate = 3600;

const CAPACITY_COLUMNS: Array<{ key: string; label: string }> = [
  { key: "theatre_capacity", label: "Theatre" },
  { key: "classroom_capacity", label: "Classroom" },
  { key: "ushape_capacity", label: "U-Shape" },
  { key: "cluster_capacity", label: "Cluster" },
  { key: "round_table_capacity", label: "Round Table" },
  { key: "floating_capacity", label: "Floating" },
];

export async function generateStaticParams() {
  const params = await getAllBanquetParams();
  return params.map((p) => ({ slug: p.hotel, hall: p.hall }));
}

async function findBanquet(hotelSlug: string, hallSlug: string) {
  const hotel = await getHotelBySlug(hotelSlug);
  if (!hotel) return { hotel: null, banquet: null };
  const banquet = hotel.banquets?.find((b) => b.slug === hallSlug) ?? null;
  return { hotel, banquet };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, hall } = await params;
  const { hotel, banquet } = await findBanquet(slug, hall);
  if (!hotel || !banquet) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: `${banquet.name} | ${hotel.name}`,
    fallbackDescription: banquet.description,
    path: `/hotels/${slug}/banquets/${hall}`,
  });
}

export default async function BanquetDetailPage({ params }: Props) {
  const { slug, hall } = await params;
  const { hotel, banquet } = await findBanquet(slug, hall);
  if (!hotel || !banquet) notFound();

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title={banquet.name} className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current="/banquets" sections={[]} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              {banquet.event_type && <Badge tone="gold">{humanizeEnum(banquet.event_type)}</Badge>}
              {banquet.area_sqft && <span className="text-sm text-ink/70">{banquet.area_sqft} sq.ft</span>}
              {banquet.is_outdoor && <span className="text-sm text-ink/70">Outdoor venue</span>}
            </div>
            {banquet.description && (
              <p className="text-base leading-relaxed text-ink/70">{banquet.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CAPACITY_COLUMNS.map((col) => {
                const value = (banquet as unknown as Record<string, number | undefined>)[col.key];
                if (!value) return null;
                return (
                  <div key={col.key} className="rounded-xl border border-border p-4 text-center">
                    <p className="font-display text-2xl font-semibold text-navy">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{col.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm
              defaultInquiryType="banquet"
              hotelId={hotel.documentId}
              banquetId={banquet.documentId}
              title="Enquire About This Venue"
              description="Tell us about your event and we'll get back to you with availability and pricing."
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
