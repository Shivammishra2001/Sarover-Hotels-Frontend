import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { Offer } from "@/types";

function discountLabel(offer: Offer) {
  if (!offer.discount_type || offer.discount_value === undefined) return null;
  if (offer.discount_type === "percentage") return `${offer.discount_value}% OFF`;
  if (offer.discount_type === "flat")
    return `₹${offer.discount_value?.toLocaleString("en-IN")} OFF`;
  if (offer.discount_type === "value_add") return "Complimentary Add-ons";
  if (offer.discount_type === "bogo") return "Buy One Get One";
  return null;
}

export function OfferCard({ offer }: { offer: Offer }) {
  const badge = discountLabel(offer);

  return (
    <Card className="flex w-72 shrink-0 flex-col snap-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-80">
      <Link href={`/offers/${offer.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        {offer.banner_url ? (
          <Image
            src={getMediaUrl(offer.banner_url)}
            alt={offer.title}
            fill
            sizes="320px"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(getMediaUrl(offer.banner_url))}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        {badge && (
          <Badge tone="accent" className="absolute left-4 top-4">
            {badge}
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-navy">{offer.title}</h3>
        {offer.description && (
          <p className="mt-2 line-clamp-2 text-sm text-ink/70">{offer.description}</p>
        )}
        <p className="mt-3 text-xs text-ink/50">
          Valid {formatDate(offer.starts_at)}
          {offer.ends_at ? ` – ${formatDate(offer.ends_at)}` : ""}
        </p>
        <Link
          href={`/offers/${offer.slug}`}
          className="mt-4 text-sm font-semibold text-accent hover:underline"
        >
          View Offer
        </Link>
      </div>
    </Card>
  );
}
