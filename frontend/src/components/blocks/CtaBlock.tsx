import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CtaBlock as CtaBlockType } from "@/types";

export function CtaBlock({ block }: { block: CtaBlockType }) {
  const isExternal = /^https?:\/\//.test(block.href);

  return (
    <Link
      href={block.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
        block.style === "secondary" && "bg-navy text-white hover:bg-navy/90",
        block.style === "outline" && "border border-navy text-navy hover:bg-navy/5",
        (!block.style || block.style === "primary") && "bg-accent text-white hover:bg-accent/90"
      )}
    >
      {block.label}
    </Link>
  );
}
