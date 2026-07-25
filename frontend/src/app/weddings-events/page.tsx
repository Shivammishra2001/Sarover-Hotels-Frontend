import type { Metadata } from "next";
import Image from "next/image";
import { Heart, MapPinned, Sparkles, Users } from "lucide-react";
import { getBanquets } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { StatsBar } from "@/components/layout/StatsBar";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getMediaUrl, humanizeEnum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Weddings & Events",
  description:
    "Plan weddings, MICE conferences, and celebrations at Sarovar banquet venues across India — enquire for capacities, packages, and availability.",
};

const WEDDING_STATS = [
  { value: "80+", label: "Venues" },
  { value: "50+", label: "Destinations" },
  { value: "Dedicated", label: "Wedding Planners" },
  { value: "Trusted by", label: "1000s of Couples" },
];

const PERKS = [
  {
    icon: Sparkles,
    title: "Bespoke Styling",
    description: "Décor, cuisine, and choreography tailored to your story.",
  },
  {
    icon: Users,
    title: "Dedicated Planner",
    description: "One point of contact from first enquiry to the big day.",
  },
  {
    icon: MapPinned,
    title: "Multi-City Support",
    description: "Coordinate ceremonies across more than one destination.",
  },
];

export default async function WeddingsEventsPage() {
  const banquets = await getBanquets();

  const destinations = Array.from(
    new Map(
      banquets
        .filter((b) => b.hotel?.destination)
        .map((b) => [b.hotel!.destination!.slug, b.hotel!.destination!])
    ).values()
  ).slice(0, 3);

  return (
    <div className="pb-20">
      <section className="relative flex h-[55vh] min-h-[420px] items-center">
        <Image
          src="https://picsum.photos/seed/weddings-hero/1920/1080"
          alt="A grand wedding celebration at a Sarovar banquet hall"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <Container className="relative text-white">
          <p className="eyebrow text-gold">Weddings &amp; Events</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
            Beautifully Celebrated
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80">
            Create your vision, celebrated your way — from intimate ceremonies to milestone
            celebrations across Sarovar&rsquo;s banquet venues.
          </p>
        </Container>
      </section>

      <StatsBar stats={WEDDING_STATS} />

      <section className="bg-navy py-20 text-white sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Crafted With Care</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
              Celebrated Your Way
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Every love story is different, and so is every wedding we host. Our teams work
              closely with you from the first conversation to the final farewell, blending
              tradition, cuisine, and personal touches into a celebration entirely your own.
            </p>
            <div className="mt-8">
              <Button href="#enquire" variant="primary">
                Start Planning
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="https://picsum.photos/seed/wedding-couple/900/700"
              alt="A couple celebrating their wedding at a Sarovar hotel"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="The Essence of Your Story"
            description="Every celebration hosted at a Sarovar venue carries its own signature moments."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={`https://picsum.photos/seed/wedding-gallery-${index}/400/400`}
                  alt="Wedding celebration moment at a Sarovar venue"
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {destinations.length > 0 && (
        <section className="bg-muted py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Destination Weddings"
              title="Explore Wedding Destinations Across India"
              description="Host your celebration in some of India's most loved cities."
              align="center"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {destinations.map((destination) => (
                <Card key={destination.slug} className="relative aspect-[4/3] overflow-hidden">
                  {destination.hero_image_url && (
                    <Image
                      src={getMediaUrl(destination.hero_image_url)}
                      alt={destination.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white">
                    {destination.name}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container id="enquire" className="mt-20 grid gap-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <SectionHeading
            eyebrow="Plan Your Perfect Event"
            title="Venues Across Our Portfolio"
            description="Explore banquet halls and event spaces sized for boardrooms, weddings, and grand celebrations."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {banquets.map((banquet) => (
              <Card
                key={banquet.documentId}
                className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Badge tone="muted">{humanizeEnum(banquet.event_type ?? "")}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">{banquet.name}</h3>
                {banquet.hotel?.name && (
                  <p className="mt-1 text-xs text-ink/50">
                    {banquet.hotel.name}
                    {banquet.hotel.destination?.city ? ` · ${banquet.hotel.destination.city}` : ""}
                  </p>
                )}
                {banquet.description && (
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{banquet.description}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/70">
                  {banquet.theatre_capacity && <span>Theatre: {banquet.theatre_capacity}</span>}
                  {banquet.round_table_capacity && <span>Round Table: {banquet.round_table_capacity}</span>}
                  {banquet.floating_capacity && <span>Floating: {banquet.floating_capacity}</span>}
                  {banquet.area_sqft && <span>{banquet.area_sqft} sq.ft</span>}
                </div>
              </Card>
            ))}
          </div>

          <div className="rounded-2xl bg-ink p-8 text-white sm:p-10">
            <SectionHeading
              title="Book With Us for a Wedding Full of Perks"
              light
              className="max-w-none"
            />
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {PERKS.map((perk) => (
                <div key={perk.title} className="flex flex-col items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gold">
                    <perk.icon size={20} />
                  </div>
                  <p className="font-display text-base font-semibold">{perk.title}</p>
                  <p className="text-sm text-white/70">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <InquiryForm
            defaultInquiryType="wedding"
            title="Enquire for Your Event"
            description="Tell us about your event and we'll help you find the perfect venue and package."
          />
        </div>
      </Container>
    </div>
  );
}
