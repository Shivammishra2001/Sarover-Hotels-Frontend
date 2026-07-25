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
  // Restructured to match the redesign's nav (dropdowns for F&B / More).
  // Items with no dedicated route yet are mapped to the closest existing page
  // and flagged inline below rather than inventing new routes.
  nav: [
    { label: "Destinations", href: "/destinations" },
    { label: "Weddings", href: "/weddings-events" },
    { label: "MICE", href: "/weddings-events" }, // no dedicated MICE route; weddings-events already covers banquet/MICE content
    { label: "Deals", href: "/offers" },
    { label: "Experiences", href: "/hotels" }, // no dedicated experiences route yet
    {
      label: "F&B",
      children: [
        { label: "Restaurants", href: "/hotels" }, // no dedicated dining route yet
        { label: "Bars & Lounges", href: "/hotels" },
      ],
    },
    { label: "Rewards", href: "/" }, // no loyalty page yet
    {
      label: "More",
      children: [
        { label: "About", href: "/#about" },
        { label: "Contact", href: "/#contact" },
      ],
    },
  ] satisfies NavItem[],
};

export type SiteConfig = typeof siteConfig;
