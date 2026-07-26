import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "My Bookings",
  fallbackDescription: "View your upcoming and past bookings.",
  path: "/account/bookings",
});

export default function BookingsPage() {
  return (
    <StubLanding
      eyebrow="My Account"
      title="My Bookings"
      description="View your upcoming and past bookings."
    />
  );
}
