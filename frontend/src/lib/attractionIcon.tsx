import { Landmark, TrainFront, ShoppingBag, UtensilsCrossed, Building2, MapPin } from "lucide-react";
import type { AttractionCategory } from "@/types";

// Same rationale as amenityIcon.tsx — `Attraction` has no per-record icon
// asset, so nearby places are grouped by their category enum and given one
// representative lucide icon per category.
const CATEGORY_ICONS: Record<AttractionCategory, typeof MapPin> = {
  sightseeing: Landmark,
  transport: TrainFront,
  shopping: ShoppingBag,
  dining: UtensilsCrossed,
  business: Building2,
  other: MapPin,
};

export function AttractionIcon({
  category,
  size = 20,
  className,
}: {
  category?: AttractionCategory;
  size?: number;
  className?: string;
}) {
  const Icon = (category && CATEGORY_ICONS[category]) || MapPin;
  return <Icon size={size} className={className} />;
}
