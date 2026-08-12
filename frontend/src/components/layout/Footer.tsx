import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/config/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const SOCIAL_ICONS = [
  { Icon: TwitterIcon, href: siteConfig.social.twitter, label: "X (Twitter)" },
  { Icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { Icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
  { Icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
];

function FooterLogo() {
  return (
    <Link href="/" className="inline-flex flex-col">
      <Image
        src="/brand/sarovar-logo.png"
        alt={siteConfig.name}
        width={197}
        height={56}
        className="h-14 w-auto rounded-md bg-white/95 object-contain p-2"
      />
      <span className="mt-2 h-[2px] w-full bg-gradient-to-r from-[#1965a1] via-[#76c04f] to-[#f3cf23]" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <FooterLogo />
          <p className="mt-6 text-sm leading-relaxed">{siteConfig.description}</p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_ICONS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-gold"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        {siteConfig.footerLinkGroups.map((group, index) => {
          const secondary = siteConfig.footerSecondaryLinkGroups[index];
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
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <p className="font-display text-base font-semibold text-white">Stay Updated</p>
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          <p>
            © {siteConfig.name}, {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/70">
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
            <span className="h-3 w-px bg-white/20" aria-hidden />
            <span>Simplotel - Hotel Website Design &amp; Booking Engine</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
