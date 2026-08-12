import { Phone, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";
import { HotelGallery } from "@/components/hotel/HotelGallery";
import { HotelHero } from "@/components/hotel/HotelHero";
import { HotelStickyNav, type HotelNavSection } from "@/components/hotel/HotelStickyNav";
import { HotelExplore } from "@/components/hotel/HotelExplore";
import { HotelLeisureActivities } from "@/components/hotel/HotelLeisureActivities";
import { HotelFacilities } from "@/components/hotel/HotelFacilities";
import { HotelNearbyLocations } from "@/components/hotel/HotelNearbyLocations";
import { HotelDining } from "@/components/hotel/HotelDining";
import { HotelStayInComfort } from "@/components/hotel/HotelStayInComfort";
import { HotelBanquets } from "@/components/hotel/HotelBanquets";
import { HotelHappiness } from "@/components/hotel/HotelHappiness";
import { HotelGuestHighlights } from "@/components/hotel/HotelGuestHighlights";
import { HotelViewAllLink } from "@/components/hotel/HotelViewAllLink";
import { RoomCard } from "@/components/hotel/RoomCard";
import { OfferCard } from "@/components/hotel/OfferCard";
import { InquiryForm } from "@/components/forms/InquiryForm";
import type { Hotel } from "@/types";

/**
 * Shared body for both hotel-detail routes (`/hotels/[slug]` and
 * `/[city]/[hotel]`) — they fetch data + build JSON-LD differently but
 * render an identical page, so the markup lives here once. Rebuilt to carry
 * every section of the Figma hotel-detail design (node 1232:12297) in its
 * original order: hero → sticky nav → discover city → top experiences →
 * leisure activities → facilities → nearby locations → rooms → dining →
 * stay in comfort → meetings/banquets → happiness → guest highlights →
 * offers/gallery. Sections with genuinely no CMS-backed data (curated
 * "Top Experiences" copy, real reviews, third-party review-platform
 * mentions) use real records where the schema has them and honest
 * brand-wide/generic copy elsewhere — never fabricated per-hotel claims.
 */
export function HotelDetailView({ hotel, basePath }: { hotel: Hotel; basePath: string }) {
  const amenities = (hotel.rooms ?? []).flatMap((room) => room.amenities ?? []);
  const attractions = hotel.attractions ?? hotel.destination?.attractions ?? [];
  const gallery = hotel.hotel_galleries ?? [];

  // The `/hotels/[slug]` and `/[city]/[hotel]` route trees mirror most
  // sub-pages under the same names (rooms/dining/amenities/gallery), but
  // diverge on a couple (banquets vs. meetings; only the city tree has a
  // dedicated offers page) — so each "View all" link is built per-tree
  // rather than assuming one naming scheme fits both.
  const isHotelsTree = basePath.startsWith("/hotels/");
  const routes = {
    rooms: `${basePath}/rooms`,
    dining: `${basePath}/dining`,
    banquets: isHotelsTree ? `${basePath}/banquets` : `${basePath}/meetings`,
    amenities: `${basePath}/amenities`,
    gallery: `${basePath}/gallery`,
    offers: isHotelsTree ? undefined : `${basePath}/offers`,
  };

  const navSections: HotelNavSection[] = [
    hotel.destination || attractions.length > 0
      ? { id: "explore", label: `Explore ${hotel.destination?.city ?? ""}`.trim() }
      : null,
    amenities.length > 0 ? { id: "facilities", label: "Facilities" } : null,
    attractions.length > 0 || hotel.destination ? { id: "location", label: "Location" } : null,
    hotel.rooms && hotel.rooms.length > 0 ? { id: "rooms", label: "Rooms" } : null,
    hotel.dinings && hotel.dinings.length > 0 ? { id: "dining", label: "Dining" } : null,
    hotel.banquets && hotel.banquets.length > 0 ? { id: "banquets", label: "Banquets & Conferences" } : null,
    hotel.offers && hotel.offers.length > 0 ? { id: "offers", label: "Promotions" } : null,
    gallery.length > 0 ? { id: "gallery", label: "Gallery" } : null,
  ].filter((s): s is HotelNavSection => Boolean(s));

  return (
    <div className="pb-20">
      <HotelHero hotel={hotel} basePath={basePath} />
      <HotelStickyNav sections={navSections} />

      <HotelExplore destination={hotel.destination} attractions={attractions} />
      <HotelLeisureActivities city={hotel.destination?.city} />
      <HotelFacilities amenities={amenities} viewAllHref={routes.amenities} />
      <HotelNearbyLocations
        attractions={attractions}
        destination={hotel.destination}
        latitude={hotel.latitude}
        longitude={hotel.longitude}
      />

      {hotel.description && (
        <section id="overview" className="scroll-mt-[150px] bg-white py-20">
          <Container className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HotelSectionHeading align="left" eyebrow="Overview" title="About This Hotel" className="max-w-none" />
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#2d3e50]/80">{hotel.description}</p>
              <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-[#2d3e50]/70 sm:grid-cols-3">
                {hotel.address_line1 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#2d3e50]/40">Address</p>
                    <p className="mt-1">{hotel.address_line1}</p>
                  </div>
                )}
                {(hotel.check_in_time || hotel.check_out_time) && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#2d3e50]/40">Check-in / Check-out</p>
                    <p className="mt-1 flex items-center gap-1">
                      <Clock size={14} /> {hotel.check_in_time?.slice(0, 5)} – {hotel.check_out_time?.slice(0, 5)}
                    </p>
                  </div>
                )}
                {hotel.phone && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#2d3e50]/40">Phone</p>
                    <p className="mt-1 flex items-center gap-1">
                      <Phone size={14} /> {hotel.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {hotel.rooms && hotel.rooms.length > 0 && (
        <section id="rooms" className="scroll-mt-[150px] bg-[#fafaf5] py-20">
          <Container className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <HotelSectionHeading
                  align="left"
                  eyebrow="Stay With Us"
                  title="Rooms & Suites"
                  className="max-w-none"
                />
                <HotelViewAllLink href={routes.rooms} label="View All Rooms" />
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {hotel.rooms.map((room) => (
                  <RoomCard key={room.documentId} room={room} hotelSlug={hotel.slug} basePath={basePath} />
                ))}
              </div>
            </div>
            <div id="enquire" className="scroll-mt-[150px] lg:sticky lg:top-28 lg:self-start">
              <InquiryForm
                defaultInquiryType="room_booking"
                hotelId={hotel.documentId}
                title="Enquire About This Hotel"
                description="Share your travel dates and preferences — our reservations team will follow up shortly."
              />
            </div>
          </Container>
        </section>
      )}

      <HotelDining dinings={hotel.dinings ?? []} gallery={gallery} viewAllHref={routes.dining} />
      <HotelStayInComfort gallery={gallery} />
      <HotelBanquets banquets={hotel.banquets ?? []} basePath={basePath} viewAllHref={routes.banquets} />
      <HotelHappiness gallery={gallery} />
      <HotelGuestHighlights />

      {hotel.offers && hotel.offers.length > 0 && (
        <section id="offers" className="scroll-mt-[150px] bg-[#fafaf5] py-20">
          <Container>
            <HotelSectionHeading eyebrow="Promotions" title="Offers at This Hotel" />
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              {hotel.offers.map((offer) => (
                <OfferCard key={offer.documentId} offer={offer} />
              ))}
            </div>
            {routes.offers && (
              <div className="mt-10 flex justify-center">
                <HotelViewAllLink href={routes.offers} label="View All Offers" />
              </div>
            )}
          </Container>
        </section>
      )}

      {gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-[150px] bg-white py-20">
          <Container>
            <HotelSectionHeading eyebrow="Gallery" title={`A Closer Look at ${hotel.name}`} />
            <div className="mt-10">
              <HotelGallery images={gallery} />
            </div>
            <div className="mt-10 flex justify-center">
              <HotelViewAllLink href={routes.gallery} label="View Full Gallery" />
            </div>
          </Container>
        </section>
      )}

      {!hotel.rooms?.length && (
        <div id="enquire" className="scroll-mt-[150px]">
          <Container className="py-16">
            <div className="mx-auto max-w-xl">
              <InquiryForm
                defaultInquiryType="room_booking"
                hotelId={hotel.documentId}
                title="Enquire About This Hotel"
                description="Share your travel dates and preferences — our reservations team will follow up shortly."
              />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
