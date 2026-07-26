export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export const siteConfig = {
  name: "Sarovar Hotels",
  shortName: "Sarovar",
  description:
    "Sarovar Hotels Private Limited - India's Leading Hotel Chain 150 Hotels in 87 Destinations Across India, Nepal and Africa",
  url: "https://www.sarovarhotels.com",
  phone: "+91-98-8680-0049",
  phoneDisplay: "+91 98 8680 0049",
  email: "reservation@sarovarhotels.com",
  social: {
    instagram: "https://instagram.com/sarovarhotels",
    facebook: "https://facebook.com/sarovarhotels",
    twitter: "https://twitter.com/sarovarhotels",
    linkedin: "https://linkedin.com/company/sarovarhotels",
    youtube: "https://youtube.com/@sarovarhotels",
  },
  // Footer link columns from the redesign. None of these have dedicated
  // pages/routes built yet (no hard rule allows inventing new routes), so
  // every href stubs to "/" for now — flagged rather than fabricated.
  footerLinkGroups: [
    {
      heading: "About Us",
      links: [
        { label: "Our Brands", href: "/" },
        { label: "Our Team", href: "/" },
        { label: "Careers", href: "/" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/" },
        { label: "Data Act", href: "/" },
      ],
    },
    {
      heading: "Media",
      links: [
        { label: "News Room", href: "/" },
        { label: "Media Queries", href: "/" },
      ],
    },
  ],
  footerSecondaryLinkGroups: [
    { heading: "Partner with us", links: [{ label: "Partner", href: "/" }] },
    { heading: "Are you a travel agent?", links: [{ label: "Travel Agent", href: "/" }] },
  ],
  // Phase 7 burger-menu IA — single source of truth for both the header nav
  // and route generation (see PHASE7_IA in this file). Additive: ingested
  // source-path pages (e.g. /efcee-sarovar-portico-bhavnagar/) stay live
  // alongside this curated taxonomy layer, per the operator's "keep both"
  // decision. The header dropdown shows one level of children; deeper nodes
  // (e.g. an individual brand under a group) are reached by clicking through
  // from that group's own landing page.
  nav: [
    {
      label: "Our Brands",
      href: "/brands",
      children: [
        { label: "Sarovar Brands", href: "/brands/sarovar" },
        { label: "Louvre Brands", href: "/brands/louvre" },
        { label: "Partner Brands", href: "/brands/partner" },
      ],
    },
    {
      label: "Explore Hotels",
      href: "/hotels",
      children: [
        { label: "Hotels in Hills", href: "/hotels/hill-stations" },
        { label: "Hotels on Beaches", href: "/hotels/beach" },
        { label: "Pilgrimage Hotels", href: "/hotels/pilgrimage" },
        { label: "Weekend Getaway Hotels", href: "/hotels/weekend-getaways" },
        { label: "Wedding Hotels", href: "/hotels/wedding" },
        { label: "Couple Friendly Hotels", href: "/hotels/couple-friendly" },
        { label: "Kid Friendly Hotels", href: "/hotels/family" },
        { label: "Luxury Hotels", href: "/hotels/luxury" },
        { label: "Business Hotels", href: "/hotels/business" },
        { label: "Pet Friendly Hotels", href: "/hotels/pet-friendly" },
        { label: "New & Upcoming Hotels", href: "/hotels/new-and-upcoming-hotels" },
      ],
    },
    {
      label: "Popular Destinations",
      href: "/destinations",
      children: [
        { label: "Popular Wedding Destinations", href: "/destinations/popular" },
        { label: "Hot Destinations", href: "/destinations/hot" },
        { label: "Trending Cities", href: "/destinations/trending" },
        { label: "Weekend Destinations", href: "/destinations/weekend" },
        { label: "Beach Destinations", href: "/destinations/beaches" },
        { label: "Hill Destinations", href: "/destinations/hill-stations" },
        { label: "Pilgrimage Destinations", href: "/destinations/pilgrimage" },
        { label: "International Destinations", href: "/destinations/international" },
      ],
    },
    {
      label: "Deals & Offers",
      href: "/offers",
      children: [
        { label: "MICE Offers", href: "/offers/mice-offers" },
        { label: "Sarovar x Fly91", href: "/offers/sarovar-hotels-x-fly91" },
        { label: "Why Book Direct", href: "/offers/why-book-direct" },
      ],
    },
    {
      label: "Radisson Rewards",
      href: "/rewards",
      children: [
        { label: "Discover", href: "/rewards" },
        { label: "Member Benefits", href: "/rewards/benefits" },
        { label: "How to Earn", href: "/rewards/earn" },
        { label: "How to Redeem", href: "/rewards/redeem" },
        { label: "Member Deals", href: "/rewards/offers" },
        { label: "Join Now", href: "/rewards/join" },
      ],
    },
    {
      label: "Blog & Travel Guides",
      href: "/blogs",
      children: [
        { label: "Destination Guides", href: "/blogs/destination-guides" },
        { label: "Travel Tips", href: "/blogs/travel-tips" },
        { label: "Food & Dining", href: "/blogs/food-and-dining" },
        { label: "Weekend Getaways", href: "/blogs/weekend-getaways" },
        { label: "Weddings", href: "/weddings" },
        { label: "Hotel News", href: "/newsroom" },
        { label: "All Blogs", href: "/blogs" },
      ],
    },
  ] satisfies NavItem[],
};

/** Phase 7 IA seed lists — the single source both the [theme]/[category] route
 * branches (validate-against-seed-list) and the QA coverage report read from. */
export const PHASE7_BRAND_GROUPS = ["sarovar", "louvre", "partner"] as const;
export const PHASE7_REWARDS_PAGES = [
  { slug: "", title: "Discover" },
  { slug: "benefits", title: "Member Benefits" },
  { slug: "earn", title: "How to Earn" },
  { slug: "redeem", title: "How to Redeem" },
  { slug: "offers", title: "Member Deals" },
  { slug: "join", title: "Join Now" },
] as const;
export const PHASE7_BLOG_CATEGORIES = [
  { slug: "destination-guides", title: "Destination Guides", keywords: ["destination", "explore", "visit", "places to visit", "attractions", "heritage", "beauty of"] },
  { slug: "travel-tips", title: "Travel Tips", keywords: ["tips", "guide", "how to", "planning", "safe", "monsoon"] },
  { slug: "food-and-dining", title: "Food & Dining", keywords: ["food", "recipe", "cuisine", "dining", "khana", "trail"] },
  { slug: "weekend-getaways", title: "Weekend Getaways", keywords: ["weekend", "getaway", "drivable", "long weekend"] },
] as const;

export type SiteConfig = typeof siteConfig;
