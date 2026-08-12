import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", light ? "text-gold" : "text-accent")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl font-medium leading-tight",
          light ? "text-white" : "text-[#2d3e50]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-white/70" : "text-[#2d3e50]/90")}>
          {description}
        </p>
      )}
    </div>
  );
}
