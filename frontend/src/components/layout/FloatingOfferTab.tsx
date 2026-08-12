import Link from "next/link";
import { Gift } from "lucide-react";

export function FloatingOfferTab() {
  return (
    <Link
      href="/offers"
      className="fixed right-0 top-[150px] z-40 flex flex-col items-center gap-3 rounded-b-2xl bg-accent px-[22px] py-6 text-white shadow-lg transition-colors hover:bg-accent/90"
      aria-label="View special offers"
    >
      <Gift size={20} />
      <span className="text-[13px] font-semibold uppercase tracking-[0.15em] [writing-mode:vertical-rl]">
        Special Offers
      </span>
    </Link>
  );
}
