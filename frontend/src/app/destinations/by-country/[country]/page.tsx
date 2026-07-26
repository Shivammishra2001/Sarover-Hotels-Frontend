import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return [];
}

export const metadata: Metadata = { title: "Destinations" };

export default async function DestinationCountryPage({ params }: Props) {
  await params;
  notFound();
}
