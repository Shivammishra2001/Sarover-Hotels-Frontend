import {
  getActiveOffers,
  getBanquets,
  getBrands,
  getDestinations,
  getFeaturedHotels,
  getGallerySample,
  getHotels,
} from "@/lib/api";
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
    featuredHotels,
    offers,
    brands,
    banquets,
    gallery,
    businessHotels,
    leisureHotels,
    pilgrimageHotels,
    allActiveHotels,
  ] = await Promise.all([
    getDestinations(),
    getFeaturedHotels(),
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
  ]);

  const spotlightHotel = featuredHotels[0];
  const totalHotels = allActiveHotels.meta.pagination?.total ?? 0;
  const totalDestinations = destinations.length;

  return (
    <>
      <Hero destinations={destinations} />
      <DestinationsGrid
        destinations={destinations}
        totalHotels={totalHotels}
        totalDestinations={totalDestinations}
      />
      {/* FeaturedHotelSpotlight intentionally not rendered here — Figma
          "Homepage V4" (node 892:13949) has no corresponding section between
          the destinations grid and the editorial band; its data (spotlightHotel)
          still feeds EditorialBand's imagery below. */}
      <EditorialBand
        images={spotlightHotel?.hotel_galleries?.slice(0, 2) ?? gallery.slice(0, 2)}
        totalHotels={totalHotels}
        totalDestinations={totalDestinations}
      />
      <OffersCarousel offers={offers} />
      <FullBleedBanner image={gallery[2]?.media_url} />
      <ExperienceTabs
        hotels={{
          business: businessHotels.data[0],
          leisure: leisureHotels.data[0],
          pilgrimage: pilgrimageHotels.data[0],
        }}
      />
      <WeddingsCTA images={gallery.slice(3, 7)} />
      <ValueProps backgroundImage={gallery[16]} />
      <PlanYourEvent banquets={banquets} images={gallery.slice(7, 10)} />
      <BrandShowcase brands={brands} />
      <GalleryFeed images={gallery.slice(10, 16)} />
    </>
  );
}
