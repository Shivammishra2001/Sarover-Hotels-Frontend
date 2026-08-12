import Image from "next/image";
import { FileSearch, UserCheck, Umbrella, Wine } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { cn, getMediaUrl, isUnoptimizedMediaUrl } from "@/lib/utils";
import type { HotelGallery } from "@/types";

const VALUE_PROPS = [
  {
    icon: Umbrella,
    title: "Choose Your Perfect Venue",
    description:
      "Explore exceptional indoor and outdoor wedding spaces suited for intimate ceremonies or grand celebrations.",
    featured: true,
  },
  { icon: FileSearch, title: "Customize Every Detail" },
  { icon: Wine, title: "Celebrate in Style" },
  { icon: UserCheck, title: "Exceptional Guest Experience" },
];

// Figma's reference design shows a full-bleed background photo behind this
// band. There's no dedicated CMS slot for it, so `backgroundImage` is an
// already-fetched real gallery photo reused from the homepage's existing
// sample (see app/page.tsx) rather than a new asset — omit the prop entirely
// to keep the current flat `bg-muted` look if no distinct photo is available.
export function ValueProps({ backgroundImage }: { backgroundImage?: HotelGallery }) {
  const bgUrl = backgroundImage?.media_url ? getMediaUrl(backgroundImage.media_url) : undefined;

  return (
    <section className="relative overflow-hidden bg-muted py-20 sm:py-28">
      {bgUrl && (
        <>
          <Image
            src={bgUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            unoptimized={isUnoptimizedMediaUrl(bgUrl)}
          />
          <div className="absolute inset-0 bg-muted/90" />
        </>
      )}
      <Container className="relative text-center">
        <HomeSectionHeading eyebrow="Best Rate. Always Online." title="Unbeatable Online Value" />

        <div className="mt-16 flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-0">
          {VALUE_PROPS.map((prop, index) => (
            <div
              key={prop.title}
              className={cn(
                "flex aspect-square w-full max-w-[320px] flex-col items-center justify-center rounded-full p-8 text-center sm:max-w-[380px]",
                prop.featured ? "bg-navy text-white" : "bg-surface text-navy shadow-md",
                index > 0 && "lg:-ml-10"
              )}
              style={{ zIndex: VALUE_PROPS.length - index }}
            >
              <prop.icon size={36} strokeWidth={1.5} />
              <p className="mt-4 font-display text-lg font-semibold leading-snug">{prop.title}</p>
              {prop.description && (
                <p className="mt-3 text-sm leading-relaxed text-white/80">{prop.description}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
