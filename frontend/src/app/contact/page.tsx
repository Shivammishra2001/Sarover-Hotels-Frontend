import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Contact Us",
  fallbackDescription: "Reach the Sarovar Hotels team for reservations and enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StubLanding
      eyebrow="Get in Touch"
      title="Contact Us"
      description="Reach the Sarovar Hotels team for reservations and enquiries."
    />
  );
}
