import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllOfferSlugs, getOfferBySlug } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { formatDate, getMediaUrl } from "@/lib/utils";

interface OfferPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllOfferSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) return { title: "Offer Not Found" };

  return {
    title: offer.title,
    description: offer.description?.slice(0, 160),
    openGraph: {
      title: offer.title,
      description: offer.description?.slice(0, 160),
      images: offer.banner_url ? [getMediaUrl(offer.banner_url)] : undefined,
    },
  };
}

export default async function OfferDetailPage({ params }: OfferPageProps) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);

  if (!offer) notFound();

  return (
    <div className="pb-20">
      <section className="relative flex h-[40vh] min-h-[300px] items-end">
        {offer.banner_url ? (
          <Image
            src={getMediaUrl(offer.banner_url)}
            alt={offer.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <Container className="relative pb-10 text-white">
          <Badge tone="gold">{offer.scope === "global" ? "All Hotels" : offer.scope === "brand" ? offer.brand?.name : offer.hotel?.name}</Badge>
          <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">{offer.title}</h1>
        </Container>
      </section>

      <Container className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {offer.description && <p className="text-base leading-relaxed text-ink/70">{offer.description}</p>}

          <p className="text-sm text-ink/60">
            Valid {formatDate(offer.starts_at)}
            {offer.ends_at ? ` – ${formatDate(offer.ends_at)}` : ""}
            {offer.offer_code ? ` · Code: ${offer.offer_code}` : ""}
          </p>

          {offer.terms && (
            <div>
              <h2 className="font-display text-xl font-semibold text-navy">Terms &amp; Conditions</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{offer.terms}</p>
            </div>
          )}

          {offer.hotel?.slug && (
            <Link
              href={`/hotels/${offer.hotel.slug}`}
              className="inline-block text-sm font-semibold text-accent hover:underline"
            >
              View {offer.hotel.name} →
            </Link>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <InquiryForm
            defaultInquiryType="general"
            offerId={offer.documentId}
            hotelId={offer.hotel?.documentId}
            title="Claim This Offer"
            description="Send your details and quote the offer — our team will confirm availability."
          />
        </div>
      </Container>
    </div>
  );
}
