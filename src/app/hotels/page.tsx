import type { Metadata } from "next";
import { getBrands, getDestinations, getHotels } from "@/lib/api";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelFilters } from "@/components/hotel/HotelFilters";
import { HotelCard } from "@/components/hotel/HotelCard";

export const metadata: Metadata = {
  title: "Hotels",
  description: "Browse Sarovar hotels and resorts across India by destination, brand, and property type.",
};

interface HotelsPageProps {
  searchParams: Promise<{
    destination?: string;
    brand?: string;
    property_type?: string;
    star_rating?: string;
    page?: string;
  }>;
}

export default async function HotelsPage({ searchParams }: HotelsPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;

  const [{ data: hotels, meta }, brands, destinations] = await Promise.all([
    getHotels({
      destination: params.destination,
      brand: params.brand,
      property_type: params.property_type,
      star_rating: params.star_rating ? Number(params.star_rating) : undefined,
      page,
    }),
    getBrands(),
    getDestinations(),
  ]);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Hotels"
          title="Find Your Perfect Stay"
          description="Filter by destination, brand, property type, or star rating to discover the right Sarovar hotel for your trip."
        />

        <div className="mt-8">
          <HotelFilters brands={brands} destinations={destinations} />
        </div>

        <p className="mt-6 text-sm text-ink/60">
          {meta.pagination?.total ?? hotels.length} hotel{(meta.pagination?.total ?? hotels.length) === 1 ? "" : "s"} found
        </p>

        {hotels.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.documentId} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="font-display text-xl font-semibold text-navy">No hotels match your filters</p>
            <p className="text-sm text-ink/60">Try adjusting or clearing your filters to see more results.</p>
          </div>
        )}

        {meta.pagination && meta.pagination.pageCount > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: meta.pagination.pageCount }).map((_, index) => {
              const pageNumber = index + 1;
              const query = new URLSearchParams({ ...params, page: String(pageNumber) } as Record<string, string>);
              return (
                <a
                  key={pageNumber}
                  href={`/hotels?${query.toString()}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
                    pageNumber === page ? "bg-navy text-white" : "bg-muted text-ink/70 hover:bg-navy/10"
                  }`}
                >
                  {pageNumber}
                </a>
              );
            })}
          </nav>
        )}
      </Container>
    </div>
  );
}
