import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Contact Us",
  fallbackDescription: "Reach the Sarovar Hotels team for reservations and enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <CmsBackedPage
      path="/contact/"
      eyebrow="Get in Touch"
      title="Contact Us"
      description="Reach the Sarovar Hotels team for reservations and enquiries."
    />
  );
}
