import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

// Figma node 2950:81130 — hero band + the floating pill tab row that
// overlaps the seam between the hero photo and the navy strip beneath it.
const TABS = [
  { label: "About Us", href: "/about", active: true },
  { label: "Our Brands", href: "/brands" },
  { label: "Our Team", href: "/careers" },
];

export function AboutHero() {
  return (
    <section className="relative bg-[#0e1b2e]">
      <div className="relative h-[560px] overflow-hidden sm:h-[620px] lg:h-[651px]">
        <Image
          src="/about/hero-bg.png"
          alt="Sarovar Hotels property exterior at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02203d] via-[#02203d]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02050e]/90 via-transparent to-transparent" />

        <Container className="relative flex h-full flex-col justify-center pb-16 pt-10">
          <p className="eyebrow text-white/70">About Us</p>
          <h1 className="mt-6 font-display text-[42px] font-normal leading-[1.1] text-white sm:text-[56px] lg:text-[70px]">
            Hospitality
            <br />
            Inspired by People.
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium text-white sm:text-xl lg:max-w-2xl lg:text-2xl">
            For over three decades, Sarovar Hotels has delivered heartfelt hospitality
            through exceptional stays across India, Nepal and Africa.
          </p>
          <Button
            href="/hotels"
            variant="primary"
            className="mt-10 w-fit gap-2 px-10 py-4 text-[13px] font-extrabold uppercase tracking-[0.78px]"
          >
            Explore Hotels
          </Button>
        </Container>
      </div>

      {/* Floating tab row straddling the hero / navy-strip seam */}
      <div className="relative z-10 flex justify-center px-4">
        <div className="-mt-7 flex flex-wrap justify-center gap-3 sm:gap-[18px]">
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={
                tab.active
                  ? "flex h-[56px] items-center justify-center whitespace-nowrap rounded-[55px] bg-[#c1392a] px-8 text-[13px] font-semibold uppercase tracking-[0.78px] text-white sm:px-10"
                  : "flex h-[56px] items-center justify-center whitespace-nowrap rounded-[55px] border border-white/20 bg-[#0b172a]/40 px-8 text-[13px] font-semibold uppercase tracking-[0.78px] text-white transition-colors hover:bg-[#0b172a]/60 sm:px-10"
              }
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-[63px] sm:h-[70px]" />
    </section>
  );
}
