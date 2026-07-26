import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { buildMetadata } from "@/lib/seo";

const EXPERIENCES = [
  { slug: "luxury-hotels", title: "Indulgent Luxury Escapes", description: "Sarovar's most indulgent luxury stays." },
  { slug: "business-hotels", title: "Hotels for Business Travelers", description: "Hotels suited for business travellers." },
  { slug: "family-hotels", title: "Family Hotels", description: "Hotels great for family holidays." },
  { slug: "couple-friendly-hotels", title: "Romantic Getaways for Couples", description: "Romantic stays for couples." },
  { slug: "kid-friendly-hotels", title: "Kid-Friendly Family Escapes", description: "Hotels with amenities for travelling with kids." },
  { slug: "pet-friendly-hotels", title: "Stays That Welcome Your Pets", description: "Hotels that welcome your pets." },
  { slug: "wedding-hotels", title: "Wedding Destinations & Venues", description: "Hotels equipped to host your wedding." },
  { slug: "beach-resorts", title: "Beach Resorts", description: "Sarovar resorts by the coast." },
  { slug: "hill-hotels", title: "Hill Hotels", description: "Sarovar hotels in the hills." },
  { slug: "heritage-hotels", title: "Heritage Hotels", description: "Hotels with a story steeped in heritage." },
  { slug: "wellness-resorts", title: "Wellness Resorts", description: "Resorts focused on rest and wellness." },
  { slug: "boutique-hotels", title: "Boutique Hotels", description: "Smaller, characterful boutique properties." },
  { slug: "long-stay-hotels", title: "Long Stay Hotels", description: "Hotels suited for extended stays." },
  { slug: "weekend-getaway-hotels", title: "Weekend Escapes", description: "Hotels perfect for a short weekend trip." },
] as const;

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Experiences",
  fallbackDescription: "Discover Sarovar hotels curated by the kind of trip you are planning.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Curated Stays"
          title="Experiences"
          description="Discover Sarovar hotels curated by the kind of trip you are planning."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((experience) => (
            <Link
              key={experience.slug}
              href={`/experiences/${experience.slug}`}
              className="group rounded-2xl border border-border p-6 transition-colors hover:border-gold"
            >
              <p className="font-display text-lg font-semibold text-ink group-hover:text-gold">
                {experience.title}
              </p>
              <p className="mt-2 text-sm text-ink/60">{experience.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
