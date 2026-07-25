import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function WeddingsCTA() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <Image
          src="https://picsum.photos/seed/wedding-couple-hero/1000/900"
          alt="A couple celebrating their wedding at a Sarovar hotel"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-10 bg-navy p-8 text-white sm:p-12 lg:p-16">
        <div>
          <p className="eyebrow text-white/80">Weddings @ Sarovar Hotels</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl">
            Create Your Own Story
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            Turn every journey into a memorable experience with stays crafted around comfort,
            discovery, and delight.
          </p>
          <div className="mt-8">
            <Button href="/weddings-events" variant="primary" className="uppercase tracking-wide">
              Explore More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["wedding-thumb-1", "wedding-thumb-2", "wedding-thumb-3"].map((seed) => (
            <div key={seed} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={`https://picsum.photos/seed/${seed}/300/300`}
                alt="Wedding celebration moment at a Sarovar venue"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
