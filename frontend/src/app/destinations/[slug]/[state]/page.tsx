import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCountryStateParams, getStateBySlugs } from "@/lib/api";
import { DestinationCollectionView } from "@/components/destination/DestinationCollectionView";
import { buildMetadata } from "@/lib/seo";

interface StatePageProps {
  params: Promise<{ slug: string; state: string }>;
}

export async function generateStaticParams() {
  const params = await getAllCountryStateParams();
  return params.map(({ country, state }) => ({ slug: country, state }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { slug, state: stateSlug } = await params;
  const state = await getStateBySlugs(slug, stateSlug);
  if (!state) return { title: "Destinations Not Found" };

  return buildMetadata({
    seo: state.seo,
    fallbackTitle: `Destinations in ${state.name}`,
    fallbackDescription: `Explore Sarovar destinations across ${state.name}${state.country ? `, ${state.country.name}` : ""}.`,
    path: `/destinations/${slug}/${stateSlug}`,
  });
}

export default async function DestinationStatePage({ params }: StatePageProps) {
  const { slug, state: stateSlug } = await params;
  const state = await getStateBySlugs(slug, stateSlug);

  if (!state) notFound();

  return (
    <DestinationCollectionView
      eyebrow={state.country?.name ?? "Popular Destinations"}
      title={`Destinations in ${state.name}`}
      destinations={state.destinations ?? []}
      emptyMessage={`No destinations listed for ${state.name} yet.`}
    />
  );
}
