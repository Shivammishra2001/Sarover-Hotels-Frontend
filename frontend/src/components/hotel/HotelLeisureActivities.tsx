import { Landmark, Footprints, ShoppingBag, Palette, UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";

// Figma node 1274:3200 "Leisure Activities" — five generic activity
// categories any destination offers. Unlike Top Experiences/Nearby
// Locations, the CMS has no structured "things to do" list at all, and
// these five categories are universal enough to reuse as-is across
// destinations rather than omitting the section entirely.
const ACTIVITIES = [
  { label: "Historical Tours", icon: Landmark },
  { label: "Heritage Walks", icon: Footprints },
  { label: "Shopping", icon: ShoppingBag },
  { label: "Workshops", icon: Palette },
  { label: "Local Cuisine", icon: UtensilsCrossed },
];

export function HotelLeisureActivities({ city }: { city?: string }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <HotelSectionHeading eyebrow="Things To Do" title={city ? `Leisure Activities in ${city}` : "Leisure Activities"} />
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-5">
          {ACTIVITIES.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-[80px] items-center justify-center rounded-full bg-[#fafaf5] text-accent">
                <Icon size={34} />
              </div>
              <p className="text-base font-medium text-[#192128]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
