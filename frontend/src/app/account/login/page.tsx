import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Login",
  fallbackDescription: "Sign in to your Sarovar Hotels account.",
  path: "/account/login",
});

export default function LoginPage() {
  return (
    <StubLanding
      eyebrow="My Account"
      title="Login"
      description="Sign in to your Sarovar Hotels account."
    />
  );
}
