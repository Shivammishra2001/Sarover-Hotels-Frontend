import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ city: string; hotel: string }>;
}

export const metadata: Metadata = { title: "Sarovar Hotels" };

export default async function MeetingsPage({ params }: Props) {
  await params;
  notFound();
}
