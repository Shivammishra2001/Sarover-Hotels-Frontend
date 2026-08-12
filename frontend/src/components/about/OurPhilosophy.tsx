import Image from "next/image";
import { Container } from "@/components/layout/Container";

// Figma node 2950:82232 (copy + icon cards) and 2950:81181 (photo).
const PILLARS = [
  { title: ["Guest", "First"], icon: "/about/icon-guestfirst.svg", ring: "rgba(81,189,163,0.4)" },
  {
    title: ["Heartfelt", "Service"],
    icon: "/about/icon-heartfelt.svg",
    ring: "rgba(242,94,7,0.4)",
  },
  {
    title: ["Local", "Connection"],
    icon: "/about/icon-localconnection.svg",
    ring: "rgba(235,88,137,0.4)",
  },
  {
    title: ["Responsible", "Hospitality"],
    icon: "/about/icon-responsible.svg",
    ring: "rgba(242,94,7,0.4)",
  },
];

export function OurPhilosophy() {
  return (
    <section className="bg-white py-24">
      <Container className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto aspect-[854/629] w-full max-w-[560px] overflow-hidden rounded-[24px] lg:order-1">
          <Image
            src="/about/philosophy-couple.png"
            alt="Guests enjoying a relaxed morning at a Sarovar hotel"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-16 lg:order-2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-start gap-5">
              <p className="eyebrow text-[#192128]/70">Our Philosophy</p>
              <h2 className="font-display text-[32px] font-normal leading-[1.2] text-[#2d3e50] sm:text-[40px] lg:text-[53px]">
                Hospitality That Feels Personal
              </h2>
            </div>
            <p className="max-w-[790px] text-lg leading-[2] tracking-[-0.2px] text-[#2d3e50]/90 sm:text-xl lg:text-[23px]">
              {
                "At Sarovar Hotels, hospitality is more than service—it's an experience built on care, comfort, and meaningful connections. Every interaction is designed to make our guests feel valued and at home."
              }
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title.join(" ")}
                className="flex flex-col items-center gap-6 rounded-[16px] border border-[#eae4dc] bg-white px-4 py-7 text-center shadow-[4px_4px_36px_0px_rgba(0,0,0,0.08)]"
              >
                <div
                  className="flex size-[90px] items-center justify-center rounded-full border bg-[#fafaf5] p-2"
                  style={{ borderColor: pillar.ring }}
                >
                  <Image src={pillar.icon} alt="" width={50} height={50} unoptimized />
                </div>
                <p className="text-lg font-semibold leading-[1.2] text-[#192128]">
                  {pillar.title[0]}
                  <br />
                  {pillar.title[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
