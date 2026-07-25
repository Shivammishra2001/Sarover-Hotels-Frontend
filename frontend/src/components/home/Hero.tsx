import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Destination } from "@/types";

// `destinations` is kept in the signature (used by the search widget in the
// previous design) so callers/props don't change — see note in section 1.
export function Hero({ destinations: _destinations }: { destinations: Destination[] }) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://picsum.photos/seed/hero-lifestyle/1920/1080)" }}
      />
      <div className="absolute inset-0 bg-navy/55" />

      <Container className="relative flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
          Where Every Stay Feels Personal
        </h1>
        <p className="max-w-xl text-base font-light text-white/90 sm:text-lg">
          Thoughtful hospitality, wherever you go.
        </p>
        <Button href="/hotels" variant="primary" className="mt-2 uppercase tracking-wide">
          Find Your Stay
        </Button>
      </Container>
    </section>
  );
}
