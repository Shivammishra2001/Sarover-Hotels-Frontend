"use client";

import { useState } from "react";
import { Phone, Mail, Share2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Figma node 1236:13092 — Call / Mail / Share / Save action row. Share and
// Save need client interactivity (Web Share API, local toggle) so they're
// split out of the otherwise-server HotelHero.
export function HotelQuickActions({
  phone,
  email,
  shareTitle,
}: {
  phone?: string;
  email?: string;
  shareTitle: string;
}) {
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: window.location.href });
      } catch {
        // user cancelled the share sheet — nothing to do
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[#2d3e50]">
      {phone && (
        <a href={`tel:${phone}`} className="flex items-center gap-2 text-lg font-medium hover:text-accent">
          <Phone size={22} />
          Call Hotel
        </a>
      )}
      {phone && email && <span className="hidden h-6 w-px bg-border sm:block" />}
      {email && (
        <a href={`mailto:${email}`} className="flex items-center gap-2 text-lg font-medium hover:text-accent">
          <Mail size={22} />
          Mail Hotel
        </a>
      )}
      {(phone || email) && <span className="hidden h-6 w-px bg-border sm:block" />}
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 text-lg font-medium hover:text-accent"
      >
        <Share2 size={22} />
        Share
      </button>
      <span className="hidden h-6 w-px bg-border sm:block" />
      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        className={cn("flex items-center gap-2 text-lg font-medium hover:text-accent", saved && "text-accent")}
      >
        <Heart size={22} className={saved ? "fill-accent" : undefined} />
        Save
      </button>
    </div>
  );
}
