import Image from "next/image";
import heroVideo from "@/assets/hero.mp4";
import { Container } from "@/components/layout/Container";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Destination } from "@/types";

// Figma's hero background is a single lifestyle photo with no CMS-managed
// analog of its own, so the closest real asset is the hero image of the
// first destination that has one — genuine CMS photography rather than a
// placeholder. Typography/colors pulled exact from Figma node 892:13949:
// h1 is two fixed lines at 70px/1.1 regular, subhead is 26px/1.1 medium
// (not the smaller/lighter values previously used here), and the CTA is
// the exact #c1392a red (not the theme's --color-accent, which is #c6482e
// — a longstanding token/Figma mismatch also fixed on the About/Hotel pages).
export function Hero({ destinations }: { destinations: Destination[] }) {
  const heroImage = destinations.find((d) => d.hero_image_url)?.hero_image_url;

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-navy">
      
      {heroImage ? (
        
        <Image
          src={getMediaUrl(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          unoptimized={isUnoptimizedMediaUrl(getMediaUrl(heroImage))}
        />
      ) : null}


       {/* Video overlay */}
      <video
        className="absolute inset-0 z-[1] h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
         <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-navy/55" />

      <Container className="relative flex flex-col items-center py-24 text-center">
      

        <h1 className="font-display text-[42px] font-normal leading-[1.1] text-white sm:text-[56px] lg:text-[70px]">
          Where Every Stay
          <br />
          Feels Personal 
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.1] text-white sm:text-xl lg:text-[26px]">
          Thoughtful hospitality, wherever you go.
        </p>
        <HomeCtaButton href="/hotels" className="mt-10">
          Find Your Stay
        </HomeCtaButton>
      </Container>
    </section>
  );
}
