import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import type { Banquet } from "@/types";

export function PlanYourEvent({ banquets }: { banquets: Banquet[] }) {
  if (banquets.length === 0) return null;

  const featuredDescription = banquets[0]?.description;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Events" title="Plan Your Perfect Event" align="center" />

        <div className="mt-10 grid gap-5 lg:grid-cols-[3fr_1fr_1fr]">
          <div className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
            <div className="relative aspect-[4/3] sm:aspect-auto">
              <Image
                src="https://picsum.photos/seed/banquet-hall/900/700"
                alt="A Sarovar banquet hall set for an event"
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <h3 className="font-display text-xl font-bold text-navy">Happy Happenings</h3>
              <p className="font-display text-xl font-bold text-accent">@Sarovar Hotel</p>
              {featuredDescription && (
                <p className="mt-4 line-clamp-4 text-base leading-relaxed text-ink/70">
                  {featuredDescription}
                </p>
              )}
              <Link
                href="/weddings-events"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent/90"
              >
                Explore More
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl sm:block">
            <Image
              src="https://picsum.photos/seed/event-dining/500/700"
              alt="Fine dining at a Sarovar event"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>

          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl sm:block">
            <Image
              src="https://picsum.photos/seed/event-venue-exterior/500/700"
              alt="A grand Sarovar event venue exterior at dusk"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
