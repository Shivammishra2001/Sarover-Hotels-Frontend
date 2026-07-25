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
      <span className="flex items-center gap-2">
        <svg width="28" height="16" viewBox="0 0 46 24" fill="none" className="text-[#3b82f6]">
          <path
            d="M4 18C10 6 16 6 23 12C30 18 36 6 42 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-display text-xl font-semibold tracking-wide text-white">
          SAROVAR HOTELS
        </span>
      </span>
      <span className="mt-1 h-[3px] w-full bg-gradient-to-r from-[#3b82f6] via-accent to-gold" />
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
        <Container className="flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Where every stay feels personal.</p>
        </Container>
      </div>
    </footer>
  );
}
