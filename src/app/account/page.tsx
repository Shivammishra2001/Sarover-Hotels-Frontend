import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "My Account",
  fallbackDescription: "Manage your profile, bookings, and rewards.",
  path: "/account",
});

export default function AccountPage() {
  return (
    <StubLanding
      eyebrow="My Account"
      title="My Account"
      description="Manage your profile, bookings, and rewards."
    />
  );
}
