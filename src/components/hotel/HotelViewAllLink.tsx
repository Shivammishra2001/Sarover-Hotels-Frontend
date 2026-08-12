import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Small "View all X" pill linking from a summary section on the main hotel
// page to that section's own dedicated sub-page (e.g. /hotels/{slug}/rooms).
export function HotelViewAllLink({ href, label, light = false }: { href: string; label: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
        light
          ? "border-white/20 text-white hover:bg-white/10"
          : "border-[#2d3e50]/20 text-[#2d3e50] hover:bg-[#2d3e50]/5"
      )}
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}
