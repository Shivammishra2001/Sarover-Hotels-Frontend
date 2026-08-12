import { cn } from "@/lib/utils";

// Figma's section headings (e.g. node 1272:13433 "Top Experiences", 1274:3390
// "Hotel Facilities") are consistently: small uppercase eyebrow, then a large
// ~40-53px serif-weight title, centered. `SectionHeading` (used elsewhere in
// the app) renders much smaller (text-3xl/4xl) — this matches the hotel
// template to the same big, banded look used on the About page instead.
export function HotelSectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <p className={cn("eyebrow", light ? "text-white/70" : "text-[#192128]/70")}>{eyebrow}</p>}
      <h2
        className={cn(
          "font-display text-[32px] font-normal leading-[1.2] sm:text-[40px] lg:text-[48px]",
          light ? "text-white" : "text-[#2d3e50]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-lg leading-relaxed", light ? "text-white/80" : "text-[#2d3e50]/80")}>
          {description}
        </p>
      )}
    </div>
  );
}
