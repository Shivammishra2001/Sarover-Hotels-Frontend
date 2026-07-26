import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCityHotelParams, getHotelByCityAndSlug } from "@/lib/api";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ city: string; hotel: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCityHotelParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) return { title: "Not Found" };
  return buildMetadata({ fallbackTitle: `Book | ${hotel.name}`, path: `/${city}/${hotelSlug}/book` });
}

// No "book" `HotelPageSectionKey` and no direct booking-engine integration in
// this schema — reusing the existing InquiryForm (already wired to
// createInquiry) is functional, not fabricated, content for this route.
export default async function CityHotelBookPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/book" fallbackTitle="Book Your Stay">
      <div className="max-w-xl">
        <InquiryForm
          defaultInquiryType="room_booking"
          hotelId={hotel.documentId}
          title={`Book Your Stay at ${hotel.name}`}
          description="Share your travel dates and preferences — our reservations team will follow up shortly."
        />
      </div>
    </CityHotelSectionContent>
  );
}
