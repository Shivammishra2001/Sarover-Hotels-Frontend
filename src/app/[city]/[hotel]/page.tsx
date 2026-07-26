import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ city: string; hotel: string }>;
}

export async function generateStaticParams() {
  return [];
}

export const metadata: Metadata = { title: "Sarovar Hotels" };

export default async function CityHotelPage({ params }: Props) {
  await params;
  notFound();
}
