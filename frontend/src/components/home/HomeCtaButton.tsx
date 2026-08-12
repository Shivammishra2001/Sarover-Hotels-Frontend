import Link from "next/link";
import { cn } from "@/lib/utils";

// The exact same pill CTA (bg #c1392a, rounded-[55px], px-60/py-26 at
// desktop, 13px extrabold uppercase, tracking-[0.78px]) repeats across
// nearly every section of Figma "Homepage V4" (Hero, Destinations,
// Offers, Plan Your Event, Brands...) — factored once here rather than
// re-typed at each call site. #c1392a, not the theme's --color-accent
// (#c6482e) — see Hero.tsx's note on that token/Figma mismatch.
export function HomeCtaButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center rounded-full bg-[#c1392a] px-10 py-5 text-[13px] font-extrabold uppercase tracking-[0.78px] text-white transition-colors hover:bg-[#c1392a]/90 lg:px-[60px] lg:py-[26px]",
        className
      )}
    >
      {children}
    </Link>
  );
}
