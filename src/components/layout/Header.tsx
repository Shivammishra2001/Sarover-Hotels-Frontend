"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, Menu, X } from "lucide-react";
import { Container } from "./Container";
import { siteConfig, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-[14px] font-bold text-[#2d3e50] transition-colors hover:text-accent"
      >
        {item.label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && item.children && (
        <div className="absolute left-1/2 top-full z-50 mt-0 w-48 -translate-x-1/2 rounded-lg border border-border bg-surface py-2 shadow-lg">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-ink/80 hover:bg-muted hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/brand/sarovar-logo.png"
        alt={siteConfig.name}
        width={355}
        height={178}
        priority
        className="h-16 w-auto object-contain sm:h-20"
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-surface transition-shadow duration-300",
        scrolled ? "shadow-md shadow-black/5" : "shadow-sm shadow-black/[0.03]"
      )}
    >
      <Container className="flex h-[88px] items-center headerfullwidth gap-8 lg:gap-0">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-ink shadow-sm lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Logo />

       <nav className="hidden h-full items-center gap-9 lg:ml-[0px] lg:flex">
          {siteConfig.nav.map((item) => (
           <div key={item.label} className="flex h-full items-center">
              {item.children ? (
                <NavDropdown item={item} />
              ) : (
                <Link
                  href={item.href!}
                  className="text-[14px] font-bold text-[#2d3e50] transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/hotels"
          className="ml-auto hidden shrink-0 items-center gap-1 rounded-full bg-accent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.78px] text-white transition-colors hover:bg-accent/90 lg:ml-[0px] lg:inline-flex"
        >
          <Calendar size={20} />
          Book Your Stay
        </Link>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) =>
              item.children ? (
               <div key={item.label} className="flex h-full items-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">
                    {item.label}
                  </p>
                  <div className="mt-1 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg px-2 py-2 text-sm text-ink hover:bg-muted"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/hotels"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book Your Stay
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
