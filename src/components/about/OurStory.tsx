import Image from "next/image";
import { Container } from "@/components/layout/Container";

// Figma node 2950:81168 (intro copy + photo) and 2950:81290-81317 (timeline cards).
const TIMELINE = [
  {
    year: "1990",
    caption: "The beginning of our hospitality journey.",
    image: "/about/timeline-1990.png",
  },
  {
    year: "2000",
    caption: "Expanded across India with new destinations.",
    image: "/about/timeline-2000.png",
  },
  {
    year: "2010",
    caption: "Strengthened our presence through multiple hotel brands.",
    image: "/about/timeline-2010.png",
  },
  {
    year: "2020+",
    caption: "Responsibly expanding, one memorable stay at a time.",
    image: "/about/timeline-2020.png",
  },
];

export function OurStory() {
  return (
    <section className="relative overflow-hidden bg-[#fafaf5] py-24">
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-0 opacity-5 mix-blend-darken">
        <Image
          src="/about/india-map-outline.png"
          alt=""
          width={1869}
          height={506}
          className="mx-auto w-full max-w-[1869px]"
        />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-5">
            <p className="eyebrow text-[#192128]/70">Our Story</p>
            <h2 className="font-display text-[36px] font-normal leading-[1.2] text-[#2d3e50] sm:text-[44px] lg:text-[53px]">
              A Journey of Passion
              <br />
              and Purpose
            </h2>
          </div>
          <div className="max-w-[790px] space-y-6 text-lg leading-[1.9] text-[#2d3e50]/90 sm:text-xl lg:text-[23px] lg:tracking-[-0.2px]">
            <p>
              Founded in 1990, Sarovar Hotels began with a simple vision—to create
              memorable hospitality experiences built on warmth, comfort, and genuine
              service.
            </p>
            <p>
              {
                "Today, we are one of India's leading hotel management companies with a strong presence across business hubs, leisure destinations, pilgrimage cities, and emerging travel markets."
              }
            </p>
          </div>
        </div>

        <div className="relative mx-auto aspect-[754/629] w-full max-w-[560px] overflow-hidden rounded-[24px]">
          <Image
            src="/about/our-story-team.png"
            alt="Sarovar Hotels team welcoming guests"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Container className="relative mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TIMELINE.map((item) => (
          <div
            key={item.year}
            className="overflow-hidden rounded-[24px] border border-[#eae4dc] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="relative aspect-[378/240] w-full">
              <Image
                src={item.image}
                alt={`Sarovar Hotels, ${item.year}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
              <p className="text-[28px] font-bold leading-[1] text-[#1e1e1e] sm:text-[34px]">
                {item.year}
              </p>
              <p className="max-w-[260px] text-lg font-medium leading-[1.6] tracking-[-0.2px] text-[#2d3e50]/90">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
