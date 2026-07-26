import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Profile",
  fallbackDescription: "View and edit your account details.",
  path: "/account/profile",
});

export default function ProfilePage() {
  return (
    <StubLanding
      eyebrow="My Account"
      title="Profile"
      description="View and edit your account details."
    />
  );
}
