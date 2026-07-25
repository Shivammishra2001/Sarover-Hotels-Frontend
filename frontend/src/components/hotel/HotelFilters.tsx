"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";
import type { Brand, Destination } from "@/types";

const PROPERTY_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "business_hotel", label: "Business Hotel" },
  { value: "heritage", label: "Heritage" },
  { value: "service_apartment", label: "Service Apartment" },
  { value: "villa", label: "Villa" },
];

const STAR_RATINGS = [
  { value: "5", label: "5 Star" },
  { value: "4", label: "4 Star" },
  { value: "3", label: "3 Star" },
];

export function HotelFilters({ brands, destinations }: { brands: Brand[]; destinations: Destination[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4">
      <Select
        label="Destination"
        placeholder="All Destinations"
        value={searchParams.get("destination") ?? ""}
        onChange={(e) => updateParam("destination", e.target.value)}
        options={destinations.map((d) => ({ value: d.slug, label: d.name }))}
      />
      <Select
        label="Brand"
        placeholder="All Brands"
        value={searchParams.get("brand") ?? ""}
        onChange={(e) => updateParam("brand", e.target.value)}
        options={brands.map((b) => ({ value: b.slug, label: b.name }))}
      />
      <Select
        label="Property Type"
        placeholder="All Types"
        value={searchParams.get("property_type") ?? ""}
        onChange={(e) => updateParam("property_type", e.target.value)}
        options={PROPERTY_TYPES}
      />
      <Select
        label="Star Rating"
        placeholder="Any Rating"
        value={searchParams.get("star_rating") ?? ""}
        onChange={(e) => updateParam("star_rating", e.target.value)}
        options={STAR_RATINGS}
      />
    </div>
  );
}
