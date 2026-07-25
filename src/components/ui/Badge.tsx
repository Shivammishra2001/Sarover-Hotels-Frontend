import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "accent" | "gold" | "navy" | "muted";

const toneClasses: Record<Tone, string> = {
  accent: "bg-accent text-white",
  gold: "bg-gold text-navy",
  navy: "bg-navy text-white",
  muted: "bg-muted text-ink border border-border",
};

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
