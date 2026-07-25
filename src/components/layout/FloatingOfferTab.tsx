import Link from "next/link";
import { Tag } from "lucide-react";

export function FloatingOfferTab() {
  return (
    <Link
      href="/offers"
      className="fixed right-0 top-[68%] z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-lg bg-accent px-2 py-4 text-white shadow-lg transition-colors hover:bg-accent/90"
      aria-label="View special offers"
    >
      <Tag size={16} />
      <span className="text-xs font-semibold uppercase tracking-widest [writing-mode:vertical-rl]">
        Special Offers
      </span>
    </Link>
  );
}
