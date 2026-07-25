import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotelBySlug, getAllDiningParams } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { Badge } from "@/components/ui/Badge";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { humanizeEnum } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Clock, Users } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; outlet: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const params = await getAllDiningParams();
  return params.map((p) => ({ slug: p.hotel, outlet: p.outlet }));
}

async function findDining(hotelSlug: string, outletSlug: string) {
  const hotel = await getHotelBySlug(hotelSlug);
  if (!hotel) return { hotel: null, dining: null };
  const dining = hotel.dinings?.find((d) => d.slug === outletSlug) ?? null;
  return { hotel, dining };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, outlet } = await params;
  const { hotel, dining } = await findDining(slug, outlet);
  if (!hotel || !dining) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: `${dining.name} | ${hotel.name}`,
    fallbackDescription: dining.description,
    path: `/hotels/${slug}/dining/${outlet}`,
  });
}

export default async function DiningDetailPage({ params }: Props) {
  const { slug, outlet } = await params;
  const { hotel, dining } = await findDining(slug, outlet);
  if (!hotel || !dining) notFound();

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title={dining.name} className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current="/dining" sections={[]} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              {dining.outlet_type && <Badge tone="gold">{humanizeEnum(dining.outlet_type)}</Badge>}
              {dining.cuisine_type && <span className="text-sm text-ink/70">{dining.cuisine_type}</span>}
              <span className="flex items-center gap-1.5 text-sm text-ink/70">
                <Clock size={16} />
                {dining.is_24_hours
                  ? "Open 24 hours"
                  : `${dining.opening_time?.slice(0, 5) ?? ""} – ${dining.closing_time?.slice(0, 5) ?? ""}`}
              </span>
              {dining.seating_capacity && (
                <span className="flex items-center gap-1.5 text-sm text-ink/70">
                  <Users size={16} /> Seats {dining.seating_capacity}
                </span>
              )}
            </div>
            {dining.description && <p className="text-base leading-relaxed text-ink/70">{dining.description}</p>}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm
              defaultInquiryType="dining"
              hotelId={hotel.documentId}
              title="Reserve a Table"
              description="Let us know your preferred date and party size."
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
