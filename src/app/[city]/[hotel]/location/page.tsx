import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Clock } from "lucide-react";
import { getAllCityHotelParams, getHotelByCityAndSlug, findHotelPage } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { CityHotelSectionContent } from "@/components/hotel/CityHotelSectionContent";
import { getMediaUrl } from "@/lib/utils";
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
  const page = findHotelPage(hotel.hotel_pages, "location");
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: `Location | ${hotel.name}`,
    path: `/${city}/${hotelSlug}/location`,
  });
}

export default async function CityHotelLocationPage({ params }: Props) {
  const { city, hotel: hotelSlug } = await params;
  const hotel = await getHotelByCityAndSlug(city, hotelSlug);
  if (!hotel) notFound();

  const page = findHotelPage(hotel.hotel_pages, "location");
  const attractions = hotel.attractions ?? [];
  const basePath = `/${city}/${hotelSlug}`;

  return (
    <CityHotelSectionContent hotel={hotel} basePath={basePath} current="/location" fallbackTitle="Location" page={page}>
      <div className="grid gap-4 text-sm text-ink/70 sm:grid-cols-3">
        {hotel.address_line1 && (
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>
              {hotel.address_line1}
              {hotel.address_line2 ? `, ${hotel.address_line2}` : ""}
              {hotel.postal_code ? `, ${hotel.postal_code}` : ""}
            </span>
          </div>
        )}
        {hotel.phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} className="shrink-0" />
            {hotel.phone}
          </div>
        )}
        {(hotel.check_in_time || hotel.check_out_time) && (
          <div className="flex items-center gap-2">
            <Clock size={16} className="shrink-0" />
            {hotel.check_in_time?.slice(0, 5)} – {hotel.check_out_time?.slice(0, 5)}
          </div>
        )}
      </div>

      {attractions.length > 0 && (
        <div className="mt-10">
          <h3 className="font-display text-xl font-semibold text-navy">Nearby Attractions</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction) => (
              <Card key={attraction.documentId} className="flex h-full flex-col overflow-hidden p-0">
                {attraction.image_url && (
                  <div className="aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getMediaUrl(attraction.image_url)}
                      alt={attraction.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="font-display text-lg font-semibold text-navy">{attraction.name}</h4>
                  {attraction.distance_km && (
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                      {attraction.distance_km} km away
                    </p>
                  )}
                  {attraction.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{attraction.description}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </CityHotelSectionContent>
  );
}
