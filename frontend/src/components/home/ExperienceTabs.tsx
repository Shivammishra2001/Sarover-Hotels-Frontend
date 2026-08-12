"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Car, Dumbbell, Sparkles, UtensilsCrossed, Waves } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { cn, getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Hotel } from "@/types";

const EXPERIENCE_META = [
  {
    key: "business",
    label: "Sarovar Business Hotels",
    href: "/hotels?property_type=business_hotel",
    description:
      "Our personalised services are sure to keep the discerning business traveller happy and relaxed. Comfort and convenience meet in our cosy rooms, enriching your stay with ultimate relaxation.",
  },
  {
    key: "leisure",
    label: "Sarovar Leisure Hotels",
    href: "/hotels?property_type=resort",
    description: "Resorts and getaways built for rest and rediscovery, wherever you choose to unwind.",
  },
  {
    key: "pilgrimage",
    // No hotel property_type maps to "pilgrimage" — that's a destination
    // region_tag, so this links to the existing pilgrimage-tagged destination.
    label: "Sarovar Pilgrimage Hotels",
    href: "/hotels?destination=rishikesh",
    description: "Peaceful stays close to India's most cherished spiritual destinations.",
  },
] as const;

const AMENITIES = [
  { icon: Car, label: "Car Park" },
  { icon: Waves, label: "Swimming Pool" },
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Sparkles, label: "Spa & Massage" },
];

// `hotels` supplies one representative hotel per experience key (business,
// leisure, pilgrimage) so each tab's photo is a real CMS hotel image rather
// than a placeholder.
export function ExperienceTabs({ hotels = {} }: { hotels?: Partial<Record<(typeof EXPERIENCE_META)[number]["key"], Hotel>> }) {
  const [active, setActive] = useState<(typeof EXPERIENCE_META)[number]["key"]>("business");
  const current = EXPERIENCE_META.find((exp) => exp.key === active) ?? EXPERIENCE_META[0];
  const currentHotel = hotels[active];
  const cover =
    currentHotel?.hotel_galleries?.find((item) => item.is_cover) ?? currentHotel?.hotel_galleries?.[0];

  return (
    <section className="bg-muted py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div>
            <HomeSectionHeading align="left" eyebrow="Experiences" title="Explore Stays by Experience" className="max-w-none" />

            <div className="mt-10 flex flex-col gap-6">
              {EXPERIENCE_META.map((exp) => (
                <button
                  key={exp.key}
                  type="button"
                  onClick={() => setActive(exp.key)}
                  className="group flex items-center gap-4 text-left"
                >
                  <span
                    className={cn(
                      "font-semibold transition-colors",
                      active === exp.key ? "text-ink" : "text-ink/40 group-hover:text-ink/70"
                    )}
                  >
                    {exp.label}
                  </span>
                  {active === exp.key && <span className="h-px flex-1 bg-[#c1392a]" aria-hidden />}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Decorative peeking layer behind the main image — subtle depth effect */}
            <div className="absolute -left-6 top-8 hidden h-[85%] w-24 rounded-2xl bg-navy/30 lg:block" aria-hidden />

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy shadow-lg sm:aspect-[16/9]">
              {cover?.media_url && (
                <Image
                  src={getMediaUrl(cover.media_url)}
                  alt={current.label}
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-cover"
                  unoptimized={isUnoptimizedMediaUrl(getMediaUrl(cover.media_url))}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 max-w-lg p-6 sm:p-10">
                <p className="text-base leading-relaxed text-white sm:text-lg">{current.description}</p>
                <Link
                  href={current.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#c1392a] px-6 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.78px] text-white transition-colors hover:bg-[#c1392a]/90"
                >
                  Explore More
                </Link>
              </div>
            </div>

            <div className="absolute -right-4 top-6 hidden w-40 rounded-lg bg-navy shadow-xl lg:block xl:-right-8">
              {AMENITIES.map((amenity, index) => (
                <div
                  key={amenity.label}
                  className={cn(
                    "flex flex-col items-center gap-2 px-4 py-5 text-white",
                    index > 0 && "border-t border-white/15"
                  )}
                >
                  <amenity.icon size={22} />
                  <span className="text-[11px] font-semibold uppercase tracking-wide">
                    {amenity.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
