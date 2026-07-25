import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotelBySlug, getAllRoomParams } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelSectionNav } from "@/components/hotel/HotelSectionNav";
import { Badge } from "@/components/ui/Badge";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { formatCurrency, humanizeEnum, slugify } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { Users } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; room: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const params = await getAllRoomParams();
  return params.map((p) => ({ slug: p.hotel, room: slugify(p.name) }));
}

async function findRoom(hotelSlug: string, roomSlug: string) {
  const hotel = await getHotelBySlug(hotelSlug);
  if (!hotel) return { hotel: null, room: null };
  const room = hotel.rooms?.find((r) => slugify(r.name) === roomSlug) ?? null;
  return { hotel, room };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, room: roomSlug } = await params;
  const { hotel, room } = await findRoom(slug, roomSlug);
  if (!hotel || !room) return { title: "Not Found" };
  return buildMetadata({
    fallbackTitle: `${room.name} | ${hotel.name}`,
    fallbackDescription: room.description,
    path: `/hotels/${slug}/rooms/${roomSlug}`,
  });
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug, room: roomSlug } = await params;
  const { hotel, room } = await findRoom(slug, roomSlug);
  if (!hotel || !room) notFound();

  return (
    <div className="pb-20 pt-10">
      <Container>
        <p className="eyebrow text-accent">{hotel.name}</p>
        <SectionHeading title={room.name} className="mt-2" />
        <div className="mt-8">
          <HotelSectionNav hotelSlug={hotel.slug} current="/rooms" sections={[]} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              {room.room_category && <Badge tone="gold">{humanizeEnum(room.room_category)}</Badge>}
              <span className="flex items-center gap-1.5 text-sm text-ink/70">
                <Users size={16} />
                {room.max_adults} adults{room.max_children ? ` + ${room.max_children} children` : ""}
              </span>
              {room.size_sqft && <span className="text-sm text-ink/70">{room.size_sqft} sq.ft</span>}
              <span className="text-sm text-ink/70">{humanizeEnum(room.bed_type)} bed</span>
            </div>

            {room.description && <p className="text-base leading-relaxed text-ink/70">{room.description}</p>}

            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">Amenities</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity.documentId} tone="muted">
                      {amenity.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <p className="font-display text-2xl font-semibold text-accent">
              {formatCurrency(room.base_price, room.currency)}
              <span className="ml-1 text-sm font-normal text-ink/50">per night</span>
            </p>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm
              defaultInquiryType="room_booking"
              hotelId={hotel.documentId}
              title="Enquire About This Room"
              description="Share your travel dates and preferences — our reservations team will follow up shortly."
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
