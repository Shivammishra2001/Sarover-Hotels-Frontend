import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ country: string; state: string }>;
}

export async function generateStaticParams() {
  return [];
}

export const metadata: Metadata = { title: "Destinations" };

export default async function DestinationStatePage({ params }: Props) {
  await params;
  notFound();
}
