import {
  getActiveOffers,
  getBanquets,
  getBrands,
  getDestinations,
  getFeaturedHotels,
  getGallerySample,
} from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { DestinationsGrid } from "@/components/home/DestinationsGrid";
import { FeaturedHotelSpotlight } from "@/components/home/FeaturedHotelSpotlight";
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
  const [destinations, featuredHotels, offers, brands, banquets, gallery] = await Promise.all([
    getDestinations(),
    getFeaturedHotels(),
    getActiveOffers(),
    getBrands(),
    getBanquets(),
    getGallerySample(12),
  ]);

  const spotlightHotel = featuredHotels[0];

  return (
    <>
      <Hero destinations={destinations} />
      <DestinationsGrid destinations={destinations} />
      {spotlightHotel && <FeaturedHotelSpotlight hotel={spotlightHotel} />}
      <EditorialBand />
      <OffersCarousel offers={offers} />
      <FullBleedBanner />
      <ExperienceTabs />
      <WeddingsCTA />
      <ValueProps />
      <PlanYourEvent banquets={banquets} />
      <BrandShowcase brands={brands} />
      <GalleryFeed images={gallery} />
    </>
  );
}
