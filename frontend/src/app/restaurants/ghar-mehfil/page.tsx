import type { Metadata } from "next";
import { CmsBackedPage } from "@/components/page/CmsBackedPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  fallbackTitle: "Ghar Mehfil",
  fallbackDescription: "Home-style Indian dining at Ghar Mehfil.",
  path: "/restaurants/ghar-mehfil",
});

export default function GharMehfilPage() {
  return (
    <CmsBackedPage
      path="/restaurants/ghar-mehfil/"
      eyebrow="Restaurants"
      title="Ghar Mehfil"
      description="Home-style Indian dining at Ghar Mehfil."
    />
  );
}
