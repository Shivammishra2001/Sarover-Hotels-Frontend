import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HomeCtaButton } from "@/components/home/HomeCtaButton";
import { getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import type { Destination, Homepage } from "@/types";

// Figma's hero background is a single lifestyle photo with no CMS-managed
// analog of its own, so the closest real asset is the hero image of the
// first destination that has one — genuine CMS photography rather than a
// placeholder. Typography/colors pulled exact from Figma node 892:13949:
// h1 is two fixed lines at 70px/1.1 regular, subhead is 26px/1.1 medium
// (not the smaller/lighter values previously used here), and the CTA is
// the exact #c1392a red (not the theme's --color-accent, which is #c6482e
// — a longstanding token/Figma mismatch also fixed on the About/Hotel pages).
export function Hero({ destinations, content }: { destinations: Destination[]; content?: Homepage }) {
  if (content?.hero?.is_enabled === false) return null;

  const heroImage = destinations
    .map((d) => pickMediaUrl(d.hero_image, d.hero_image_url))
    .find((src): src is string => Boolean(src));

  // `hero.heading` stores its two lines separated by "\n" (see
  // backend seed-homepage-settings.ts) to reproduce the original <br/> layout.
  const headingLines = (content?.hero?.heading ?? "Where Every Stay\nFeels Personal").split("\n");
  const subheading = content?.hero?.subheading ?? "Thoughtful hospitality, wherever you go.";
  const ctaLabel = content?.hero?.cta_label ?? "Find Your Stay";
  const ctaHref = content?.hero?.cta_href ?? "/hotels";

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
      <div className="absolute inset-0 bg-navy/55" />

      <Container className="relative flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-[42px] font-normal leading-[1.1] text-white sm:text-[56px] lg:text-[70px]">
          {headingLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < headingLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.1] text-white sm:text-xl lg:text-[26px]">
          {subheading}
        </p>
        <HomeCtaButton href={ctaHref} className="mt-10">
          {ctaLabel}
        </HomeCtaButton>
      </Container>
    </section>
  );
}
