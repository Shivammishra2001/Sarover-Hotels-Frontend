import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/config/site";
import { getGlobalSettings } from "@/lib/api";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { SocialPlatform } from "@/types";

const SOCIAL_ICON_BY_PLATFORM: Record<SocialPlatform, { Icon: typeof TwitterIcon; label: string }> = {
  twitter: { Icon: TwitterIcon, label: "X (Twitter)" },
  facebook: { Icon: FacebookIcon, label: "Facebook" },
  youtube: { Icon: YoutubeIcon, label: "YouTube" },
  linkedin: { Icon: LinkedInIcon, label: "LinkedIn" },
  instagram: { Icon: InstagramIcon, label: "Instagram" },
};

function FooterLogo({ siteName }: { siteName: string }) {
  return (
    <Link href="/" className="inline-flex flex-col">
      <Image
        src="/brand/sarovar-logo.png"
        alt={siteName}
        width={197}
        height={56}
        className="h-14 w-auto rounded-md bg-white/95 object-contain p-2"
      />
      <span className="mt-2 h-[2px] w-full bg-gradient-to-r from-[#1965a1] via-[#76c04f] to-[#f3cf23]" />
    </Link>
  );
}

// Server component — fetches `global-setting` directly so contact info,
// social links, footer columns, and newsletter copy are editable from
// Strapi Content Manager without a frontend deploy. Every value falls back
// to the previous hardcoded `siteConfig` default if the singleType hasn't
// been seeded/populated yet, so the footer never renders empty.
export async function Footer() {
  const settings = await getGlobalSettings();

  const siteName = settings.site_name ?? siteConfig.name;
  const description = settings.site_description ?? siteConfig.description;
  const phone = settings.phone ?? siteConfig.phone;
  const phoneDisplay = settings.phone_display ?? siteConfig.phoneDisplay;
  const email = settings.email ?? siteConfig.email;
  const footerCredit = settings.footer_credit_text ?? "Simplotel - Hotel Website Design & Booking Engine";

  const socialLinks =
    settings.social_links && settings.social_links.length > 0
      ? settings.social_links
      : (Object.keys(siteConfig.social) as SocialPlatform[]).map((platform) => ({
          id: 0,
          platform,
          url: siteConfig.social[platform],
        }));

  const toLinkGroups = (groups: typeof siteConfig.footerLinkGroups) =>
    groups.map((group, i) => ({
      id: i,
      heading: group.heading,
      links: group.links.map((link, j) => ({ id: j, label: link.label, href: link.href })),
    }));

  const linkGroups = settings.footer_link_groups ?? toLinkGroups(siteConfig.footerLinkGroups);
  const secondaryGroups =
    settings.footer_secondary_link_groups ?? toLinkGroups(siteConfig.footerSecondaryLinkGroups);

  return (
    <footer className="bg-ink text-white/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <FooterLogo siteName={siteName} />
          <p className="mt-6 text-sm leading-relaxed">{description}</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => {
              const meta = SOCIAL_ICON_BY_PLATFORM[social.platform];
              if (!meta) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={meta.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-gold"
                >
                  <meta.Icon width={16} height={16} />
                </a>
              );
            })}
          </div>
        </div>

        {linkGroups.map((group, index) => {
          const secondary = secondaryGroups[index];
          return (
            <div key={group.heading}>
              <p className="border-b border-white/15 pb-2 font-display text-base font-semibold text-white">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {secondary && (
                <div className="mt-8">
                  <p className="font-display text-base font-semibold text-white">
                    {secondary.heading}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {secondary.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <div>
          <p className="border-b border-white/15 pb-2 font-display text-base font-semibold text-white">
            Customer Care
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href={`tel:${phone}`} className="hover:text-white">
                {phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <p className="font-display text-base font-semibold text-white">
              {settings.newsletter_heading ?? "Stay Updated"}
            </p>
            <NewsletterForm
              placeholder={settings.newsletter_placeholder}
              ctaLabel={settings.newsletter_cta_label}
            />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          <p>
            © {siteName}, {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span>{footerCredit}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
