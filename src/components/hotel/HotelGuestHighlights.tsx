import { Award, Smile, Handshake, Sparkles, BedDouble } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HotelSectionHeading } from "@/components/hotel/HotelSectionHeading";

// Figma node 1297:1011 "Popular Mentions on TripAdvisor" — five icon+label
// highlight chips. There's no real TripAdvisor integration or aggregated
// review data behind this in the CMS, so it's presented as a generic
// "what guests love" highlight strip rather than attributed to a specific
// third-party platform that isn't actually wired up.
const HIGHLIGHTS = [
  { label: "Premier Hotel", icon: Award },
  { label: "Nice Ambience", icon: Smile },
  { label: "Friendly Front Office Team", icon: Handshake },
  { label: "Excellent Experience", icon: Sparkles },
  { label: "Spacious Rooms", icon: BedDouble },
];

export function HotelGuestHighlights() {
  return (
    <section className="bg-white py-20">
      <Container>
        <HotelSectionHeading eyebrow="Guest Favorites" title="What Our Guests Love" />
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-5">
          {HIGHLIGHTS.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-[80px] items-center justify-center rounded-full bg-[#fafaf5] text-accent">
                <Icon size={34} />
              </div>
              <p className="text-base font-medium leading-tight text-[#192128]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
