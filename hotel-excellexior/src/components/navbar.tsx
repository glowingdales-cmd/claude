"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import NavLogo from "@/components/logo";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/chambres", label: "Chambres" },
  { href: "/#evenementiel", label: "Salles & Événements" },
  { href: "/#parking", label: "Parking" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "bg-stone-soft/95 backdrop-blur-sm shadow-sm shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8"
      >
        <NavLogo tone={scrolled || open ? "dark" : "light"} />

        <ul
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={`relative z-10 block cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled ? "text-ink" : "text-white"
                }`}
              >
                {link.label}
              </Link>
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover"
                  className={`absolute inset-0 rounded-full ${
                    scrolled ? "bg-ink/5" : "bg-white/10"
                  }`}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${SITE.phoneHref}`}
            className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phone}
          </a>
          <Link
            href="/contact#reservation"
            className="cursor-pointer rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition-transform hover:scale-105"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`cursor-pointer rounded-full p-2 lg:hidden ${
            scrolled || open ? "text-ink" : "text-white"
          }`}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-stone-soft lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-ink/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/contact#reservation"
                  onClick={() => setOpen(false)}
                  className="block cursor-pointer rounded-full bg-brass px-4 py-3 text-center text-base font-semibold text-ink"
                >
                  Réserver une chambre
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
