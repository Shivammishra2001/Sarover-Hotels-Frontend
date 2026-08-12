import {
  Wifi,
  BedDouble,
  Bath,
  Tv,
  UtensilsCrossed,
  Accessibility,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { AmenityCategory } from "@/types";

// The CMS has no per-amenity icon asset (`Amenity.icon_class` is a raw,
// unreliable scraped CSS class), so amenities are grouped by their category
// enum and rendered with one representative lucide icon per category —
// visually similar to the Figma facilities grid (icon + label chips)
// without pretending we have bespoke per-amenity artwork.
const CATEGORY_ICONS: Record<AmenityCategory, typeof Wifi> = {
  connectivity: Wifi,
  comfort: BedDouble,
  bathroom: Bath,
  entertainment: Tv,
  food_beverage: UtensilsCrossed,
  accessibility: Accessibility,
  safety: ShieldCheck,
  general: Sparkles,
};

export function AmenityIcon({
  category,
  size = 28,
  className,
}: {
  category?: AmenityCategory;
  size?: number;
  className?: string;
}) {
  const Icon = (category && CATEGORY_ICONS[category]) || Sparkles;
  return <Icon size={size} className={className} />;
}
