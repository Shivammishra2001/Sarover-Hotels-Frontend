import type { Metadata } from "next";
import { StubLanding } from "@/components/layout/StubLanding";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Corporate Social Responsibility",
  fallbackDescription: "Sarovar Hotels community and sustainability initiatives.",
  path: "/csr",
});

export default function CsrPage() {
  return (
    <StubLanding
      eyebrow="Giving Back"
      title="Corporate Social Responsibility"
      description="Sarovar Hotels community and sustainability initiatives."
    />
  );
}
