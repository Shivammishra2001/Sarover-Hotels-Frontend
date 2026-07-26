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
  // Flat top-level nav per the operator-approved header redesign: only F&B
  // and More carry a dropdown; every other top-level item is a plain link to
  // its own section index, which then links onward to its own sub-pages
  // (destinations/weddings/MICE/deals/experiences/rewards all have their own
  // in-page navigation — see each section's own landing page). Deeper nodes
  // that used to live in a mega-dropdown here are reached by clicking through
  // from that section's own landing page, or via "More" for the pages that
  // have no natural top-level section of their own.
  nav: [
    { label: "Destinations", href: "/destinations" },
    { label: "Weddings", href: "/weddings" },
    { label: "MICE", href: "/meetings" },
    { label: "Deals", href: "/offers" },
    { label: "Experiences", href: "/experiences" },
    {
      label: "F&B",
      href: "/restaurants",
      children: [
        { label: "FoodGully", href: "/restaurants/foodgully" },
        { label: "Ghar Mehfil", href: "/restaurants/ghar-mehfil" },
        { label: "Culinary Caravan", href: "/restaurants/culinary-caravan" },
        { label: "Private Dining", href: "/restaurants/private-dining" },
        { label: "Chef Specials", href: "/restaurants/chef-specials" },
        { label: "Reservations", href: "/restaurants/reservations" },
      ],
    },
    { label: "Rewards", href: "/rewards" },
    {
      label: "More",
      children: [
        { label: "Our Brands", href: "/brands" },
        { label: "Explore Hotels", href: "/hotels" },
        { label: "Blog & Travel Guides", href: "/blogs" },
        { label: "New & Upcoming Hotels", href: "/hotels/new-and-upcoming-hotels" },
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Media", href: "/media" },
        { label: "Investors", href: "/investors" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "CSR", href: "/csr" },
        { label: "Partner With Us", href: "/partner-with-us" },
        { label: "Hotel Directory", href: "/hotel-directory" },
        { label: "FAQs", href: "/faqs" },
        { label: "Contact", href: "/contact" },
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
