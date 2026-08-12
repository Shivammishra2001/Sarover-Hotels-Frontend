import Image from "next/image";
import { Container } from "@/components/layout/Container";

// Figma node 2950:81156-81338 — dark "Our Purpose" band with 4 value cards.
const VALUES = [
  {
    title: "Our Vision",
    description: "Setting new standards in hospitality across every destination.",
  },
  {
    title: "Our Mission",
    description: "Delivering personalised hospitality with passion, care and innovation.",
  },
  {
    title: "Our Values",
    description: "Integrity, Respect, Excellence, Teamwork, and Care guide everything we do.",
  },
  {
    title: "Our Promise",
    description: "Welcoming every guest with warmth, care and heartfelt hospitality.",
  },
];

export function GuidedByValues() {
  return (
    <section className="relative overflow-hidden bg-[#0e1b2e] py-24">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.08]">
        <Image src="/about/footer-texture.png" alt="" fill className="object-cover" />
      </div>

      <Container className="relative flex flex-col items-center gap-5 text-center text-white">
        <p className="eyebrow text-white/70">Our Purpose</p>
        <h2 className="max-w-2xl font-display text-[32px] font-normal leading-[1.2] sm:text-[40px] lg:text-[53px]">
          Guided by Values. Driven by Purpose.
        </h2>
      </Container>

      <Container className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex min-h-[261px] flex-col items-center justify-center gap-7 rounded-[30px] border border-white/10 bg-black/40 px-8 py-10 text-center text-white"
          >
            <p className="font-display text-2xl font-semibold leading-[1.2] sm:text-[26px]">
              {value.title}
            </p>
            <p className="text-lg leading-[1.7] tracking-[-0.2px] text-white/90">
              {value.description}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
