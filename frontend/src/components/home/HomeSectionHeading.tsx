import { cn } from "@/lib/utils";

// Figma "Homepage V4" (node 892:13949) uses one consistent heading style
// across every section (Destinations, Offers, Plan Your Event, Gallery,
// etc.): a small tracked-out eyebrow in muted dark navy (NOT the accent
// red the generic `SectionHeading` component uses), a 53px regular-weight
// title, and an optional 23px description — exact values pulled via
// get_design_context on node 940:17566, matching the same spec already
// used on the About and Hotel-detail pages.
export function HomeSectionHeading({
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
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* `.eyebrow` (global) hardcodes 0.75rem regardless of context — Figma's
          spec here is 16px/tracking-[3.2px] (same 0.2em ratio, so only the
          size needs overriding). */}
      {eyebrow && (
        <p className={cn("eyebrow text-[16px]", light ? "text-white/70" : "text-[#192128]/70")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "font-display text-[32px] font-normal leading-none sm:text-[40px] lg:text-[53px]",
          light ? "text-white" : "text-[#2d3e50]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg font-medium leading-[1.6] tracking-[-0.2px] sm:text-xl lg:text-[23px]",
            light ? "text-white/90" : "text-[#2d3e50]/90"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
