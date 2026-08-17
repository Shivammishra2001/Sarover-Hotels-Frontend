import {
  getActiveOffers,
  getBanquets,
  getBrands,
  getDestinations,
  getGallerySample,
  getGlobalSettings,
  getHomepage,
  getHotels,
  getTopAmenities,
} from "@/lib/api";
import { pickMediaUrl } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { DestinationsGrid } from "@/components/home/DestinationsGrid";
import { EditorialBand } from "@/components/home/EditorialBand";
import { OffersCarousel } from "@/components/home/OffersCarousel";
import { FullBleedBanner } from "@/components/home/FullBleedBanner";
import { ExperienceTabs } from "@/components/home/ExperienceTabs";
import { WeddingsCTA } from "@/components/home/WeddingsCTA";
import { ValueProps } from "@/components/home/ValueProps";
import { PlanYourEvent } from "@/components/home/PlanYourEvent";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { GalleryFeed } from "@/components/home/GalleryFeed";

export const revalidate = 60;

export default async function HomePage() {
  const [
    destinations,
    offers,
    brands,
    banquets,
    gallery,
    businessHotels,
    leisureHotels,
    pilgrimageHotels,
    allActiveHotels,
    homepage,
    globalSettings,
    amenities,
  ] = await Promise.all([
    getDestinations(),
    getActiveOffers(),
    getBrands(),
    getBanquets(),
    // Sized generously so every homepage section that reuses real gallery
    // photos (editorial band, wedding CTA, plan-your-event, Instagram feed)
    // can each draw a distinct, real image instead of repeating one.
    getGallerySample(20),
    getHotels({ property_type: "business_hotel", pageSize: 1 }),
    getHotels({ property_type: "resort", pageSize: 1 }),
    getHotels({ destination: "rishikesh", pageSize: 1 }),
    // pageSize: 1 is just to keep the payload tiny — only `meta.pagination.total`
    // is used, to drive the real "N hotels across M destinations" homepage copy
    // instead of a hand-typed (and previously inconsistent: 150 vs 149) number.
    getHotels({ pageSize: 1 }),
    getHomepage(),
    getGlobalSettings(),
    getTopAmenities(5),
  ]);

  const totalHotels = allActiveHotels.meta.pagination?.total ?? 0;
  const totalDestinations = destinations.length;
  const instagramUrl = globalSettings.social_links?.find((s) => s.platform === "instagram")?.url;

  return (
    <>
      <Hero destinations={destinations} content={homepage} />
      <DestinationsGrid
        totalHotels={totalHotels}
        totalDestinations={totalDestinations}
        content={homepage}
      />
      <EditorialBand
        images={gallery.slice(0, 2)}
        totalHotels={totalHotels}
        totalDestinations={totalDestinations}
        content={homepage}
      />
      <OffersCarousel offers={offers} content={homepage} />
      <FullBleedBanner
        content={homepage}
        fallbackImage={pickMediaUrl(gallery[2]?.media, gallery[2]?.media_url)}
      />
      <ExperienceTabs
        hotels={{
          business: businessHotels.data[0],
          leisure: leisureHotels.data[0],
          pilgrimage: pilgrimageHotels.data[0],
        }}
        amenities={amenities}
      />
      <WeddingsCTA images={gallery.slice(3, 7)} content={homepage} />
      <ValueProps backgroundImage={gallery[16]} content={homepage} />
      <PlanYourEvent banquets={banquets} images={gallery.slice(7, 10)} content={homepage} />
      <BrandShowcase brands={brands} content={homepage} />
      <GalleryFeed images={gallery.slice(10, 16)} content={homepage} instagramUrl={instagramUrl} />
    </>
  );
}
