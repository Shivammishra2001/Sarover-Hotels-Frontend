"use client";

import { Send } from "lucide-react";

export function NewsletterForm({
  placeholder = "Enter your email",
  ctaLabel = "Subscribe",
}: {
  placeholder?: string;
  ctaLabel?: string;
}) {
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="newsletter" className="sr-only">
        Email for newsletter
      </label>
      <input
        id="newsletter"
        type="email"
        placeholder={placeholder}
        className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
      />
      <button
        type="submit"
        aria-label={ctaLabel}
        className="flex shrink-0 items-center justify-center rounded-lg bg-accent px-3.5 text-white transition-colors hover:bg-accent/90"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
