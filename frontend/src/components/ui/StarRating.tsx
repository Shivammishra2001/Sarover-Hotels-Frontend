import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, className }: { rating?: number; className?: string }) {
  if (!rating) return null;
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={index < rating ? "fill-gold text-gold" : "text-border"}
        />
      ))}
    </div>
  );
}
