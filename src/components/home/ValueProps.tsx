import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HomeSectionHeading } from "@/components/home/HomeSectionHeading";
import { cn, getMediaUrl, isUnoptimizedMediaUrl, pickMediaUrl } from "@/lib/utils";
import { resolveIcon } from "@/lib/icons";
import type { Homepage, HotelGallery, ValuePropCard } from "@/types";

const FALLBACK_VALUE_PROPS: ValuePropCard[] = [
  {
    id: 1,
    icon_name: "Umbrella",
    title: "Choose Your Perfect Venue",
    description:
      "Explore exceptional indoor and outdoor wedding spaces suited for intimate ceremonies or grand celebrations.",
    is_featured: true,
  },
  { id: 2, icon_name: "FileSearch", title: "Customize Every Detail" },
  { id: 3, icon_name: "Wine", title: "Celebrate in Style" },
  { id: 4, icon_name: "UserCheck", title: "Exceptional Guest Experience" },
];

// Figma's reference design shows a full-bleed background photo behind this
// band. There's no dedicated CMS slot for it, so `backgroundImage` is an
// already-fetched real gallery photo reused from the homepage's existing
// sample (see app/page.tsx) rather than a new asset — omit the prop entirely
// to keep the current flat `bg-muted` look if no distinct photo is available.
export function ValueProps({
  backgroundImage,
  content,
}: {
  backgroundImage?: HotelGallery;
  content?: Homepage;
}) {
  if (content?.value_props?.is_enabled === false) return null;

  // Prefer an operator-chosen background (Content Manager -> Homepage ->
  // Value Props) over the arbitrary gallery-sample photo passed in as a fallback.
  const backgroundImageSrc =
    pickMediaUrl(content?.value_props?.background_image, undefined) ??
    pickMediaUrl(backgroundImage?.media, backgroundImage?.media_url);
  const bgUrl = backgroundImageSrc ? getMediaUrl(backgroundImageSrc) : undefined;
  const valueProps =
    content?.value_props?.items && content.value_props.items.length > 0
      ? content.value_props.items
      : FALLBACK_VALUE_PROPS;

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
        <HomeSectionHeading
          eyebrow={content?.value_props?.eyebrow ?? "Best Rate. Always Online."}
          title={content?.value_props?.title ?? "Unbeatable Online Value"}
        />

        <div className="mt-16 flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-0">
          {valueProps.map((prop, index) => {
            const Icon = resolveIcon(prop.icon_name);
            return (
              <div
                key={prop.id}
                className={cn(
                  "flex aspect-square w-full max-w-[320px] flex-col items-center justify-center rounded-full p-8 text-center sm:max-w-[380px]",
                  prop.is_featured ? "bg-navy text-white" : "bg-surface text-navy shadow-md",
                  index > 0 && "lg:-ml-10"
                )}
                style={{ zIndex: valueProps.length - index }}
              >
                <Icon size={36} strokeWidth={1.5} />
                <p className="mt-4 font-display text-lg font-semibold leading-snug">{prop.title}</p>
                {prop.description && (
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{prop.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
