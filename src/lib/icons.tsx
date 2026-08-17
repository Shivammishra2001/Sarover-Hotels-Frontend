import {
  Car,
  Dumbbell,
  FileSearch,
  Sparkles,
  UserCheck,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
  Umbrella,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps a CMS-supplied icon name (Strapi `icon_name` string, e.g. on
 * `homepage.value_props`) to its Lucide component. Strapi stores icons as
 * plain strings rather than a fixed enum so new value props/amenities can be
 * added from Content Manager without a frontend deploy — unrecognized names
 * fall back to a neutral icon instead of breaking the section.
 */
const ICONS: Record<string, LucideIcon> = {
  Umbrella,
  FileSearch,
  Wine,
  UserCheck,
  Car,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Wifi,
};

export function resolveIcon(name?: string | null): LucideIcon {
  if (name && ICONS[name]) return ICONS[name];
  return Sparkles;
}

/** Keyword match from an Amenity's `name`/`icon_class` to a display icon —
 * amenity records use free-text names ingested from the source site, so this
 * is a best-effort mapping rather than a 1:1 enum lookup. */
const AMENITY_KEYWORDS: Array<{ icon: LucideIcon; keywords: string[] }> = [
  { icon: Car, keywords: ["car", "parking", "valet"] },
  { icon: Waves, keywords: ["pool", "swim"] },
  { icon: UtensilsCrossed, keywords: ["restaurant", "dining", "food", "coffee", "tea", "bar", "wine", "mini bar"] },
  { icon: Dumbbell, keywords: ["gym", "fitness"] },
  { icon: Sparkles, keywords: ["spa", "massage"] },
  { icon: Wifi, keywords: ["wifi", "internet", "connectivity"] },
];

export function resolveAmenityIcon(amenity: { name: string; icon_class?: string | null }): LucideIcon {
  const haystack = `${amenity.name} ${amenity.icon_class ?? ""}`.toLowerCase();
  const match = AMENITY_KEYWORDS.find(({ keywords }) => keywords.some((k) => haystack.includes(k)));
  return match?.icon ?? Sparkles;
}
