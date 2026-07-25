import { FileSearch, UserCheck, Umbrella, Wine } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

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

export function ValueProps() {
  return (
    <section className="relative overflow-hidden bg-muted py-20 sm:py-28">
      <Container className="relative text-center">
        <p className="eyebrow text-ink/50">Best Rate. Always Online.</p>
        <h2 className="mt-4 font-display text-3xl font-medium text-navy sm:text-4xl">
          Unbeatable Online Value
        </h2>

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
