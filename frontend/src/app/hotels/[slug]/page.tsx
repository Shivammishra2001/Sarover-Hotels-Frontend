import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { getAllHotelSlugs, getHotelBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { HotelGallery } from "@/components/hotel/HotelGallery";
import { RoomCard } from "@/components/hotel/RoomCard";
import { DiningCard } from "@/components/hotel/DiningCard";
import { BanquetTable } from "@/components/hotel/BanquetTable";
import { OfferCard } from "@/components/hotel/OfferCard";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getMediaUrl, humanizeEnum } from "@/lib/utils";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllHotelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return { title: "Hotel Not Found" };

  return {
    title: hotel.name,
    description: hotel.description?.slice(0, 160),
    openGraph: {
      title: hotel.name,
      description: hotel.description?.slice(0, 160),
      images: hotel.hotel_galleries?.[0]?.media_url ? [getMediaUrl(hotel.hotel_galleries[0].media_url)] : undefined,
    },
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);

  if (!hotel) notFound();

  const cover = hotel.hotel_galleries?.find((img) => img.is_cover) ?? hotel.hotel_galleries?.[0];

  return (
    <div className="pb-20">
      <section className="relative flex h-[55vh] min-h-[420px] items-end">
        {cover?.media_url ? (
          <Image
            src={getMediaUrl(cover.media_url)}
            alt={hotel.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <Container className="relative pb-10 text-white">
          {hotel.brand?.name && <p className="eyebrow text-gold">{hotel.brand.name}</p>}
          <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">{hotel.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <StarRating rating={hotel.star_rating} />
            {hotel.destination?.city && (
              <span className="flex items-center gap-1.5">
                <MapPin size={16} />
                {hotel.destination.city}, {hotel.destination.state}
              </span>
            )}
            {hotel.property_type && <Badge tone="gold">{humanizeEnum(hotel.property_type)}</Badge>}
          </div>
        </Container>
      </section>

      <Container className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="space-y-16 lg:col-span-2">
          {hotel.description && (
            <section>
              <SectionHeading title="About This Hotel" />
              <p className="mt-4 text-base leading-relaxed text-ink/70">{hotel.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-ink/70 sm:grid-cols-3">
                {hotel.address_line1 && (
                  <div>
                    <p className="text-xs uppercase text-ink/40">Address</p>
                    <p>{hotel.address_line1}, {hotel.postal_code}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase text-ink/40">Check-in / Check-out</p>
                  <p className="flex items-center gap-1">
                    <Clock size={14} /> {hotel.check_in_time?.slice(0, 5)} – {hotel.check_out_time?.slice(0, 5)}
                  </p>
                </div>
                {hotel.phone && (
                  <div>
                    <p className="text-xs uppercase text-ink/40">Phone</p>
                    <p className="flex items-center gap-1">
                      <Phone size={14} /> {hotel.phone}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {hotel.hotel_galleries && hotel.hotel_galleries.length > 0 && (
            <section>
              <SectionHeading title="Gallery" />
              <div className="mt-6">
                <HotelGallery images={hotel.hotel_galleries} />
              </div>
            </section>
          )}

          {hotel.rooms && hotel.rooms.length > 0 && (
            <section>
              <SectionHeading title="Rooms &amp; Suites" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {hotel.rooms.map((room) => (
                  <RoomCard key={room.documentId} room={room} />
                ))}
              </div>
            </section>
          )}

          {hotel.dinings && hotel.dinings.length > 0 && (
            <section>
              <SectionHeading title="Dining" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {hotel.dinings.map((dining) => (
                  <DiningCard key={dining.documentId} dining={dining} />
                ))}
              </div>
            </section>
          )}

          {hotel.banquets && hotel.banquets.length > 0 && (
            <section>
              <SectionHeading title="Banquets &amp; Event Spaces" />
              <div className="mt-6">
                <BanquetTable banquets={hotel.banquets} />
              </div>
            </section>
          )}

          {hotel.offers && hotel.offers.length > 0 && (
            <section>
              <SectionHeading title="Offers at This Hotel" />
              <div className="mt-6 flex flex-wrap gap-5">
                {hotel.offers.map((offer) => (
                  <OfferCard key={offer.documentId} offer={offer} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <InquiryForm
            defaultInquiryType="room_booking"
            hotelId={hotel.documentId}
            title="Enquire About This Hotel"
            description="Share your travel dates and preferences — our reservations team will follow up shortly."
          />
        </div>
      </Container>
    </div>
  );
}
