import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import BrassDivider from "@/components/brass-divider";
import FacebookIcon from "@/components/icons/facebook-icon";
import { LogoMark } from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-stone-soft/90">
      <BrassDivider variant="dark" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <p className="font-display text-2xl font-semibold text-white">
              Hôtel Excellexior
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-soft/70">
            {SITE.tagline}. Chambres, salles de réunion, événementiel et
            parking sécurisé au cœur de {SITE.city}.
          </p>
          <a
            href={SITE.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Page Facebook de l'Hôtel Excellexior"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-brass hover:text-brass"
          >
            <FacebookIcon className="h-4 w-4" />
            Suivez-nous sur Facebook
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brass">
            Navigation
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-soft/75">
            <li><Link className="cursor-pointer hover:text-brass" href="/chambres">Chambres</Link></li>
            <li><Link className="cursor-pointer hover:text-brass" href="/#evenementiel">Salles & Événements</Link></li>
            <li><Link className="cursor-pointer hover:text-brass" href="/#parking">Parking sécurisé</Link></li>
            <li><Link className="cursor-pointer hover:text-brass" href="/#services">Services & équipements</Link></li>
            <li><Link className="cursor-pointer hover:text-brass" href="/contact">Contact & réservation</Link></li>
            <li><Link className="cursor-pointer hover:text-brass" href="/admin/login">Espace administration</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brass">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-stone-soft/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a className="cursor-pointer hover:text-brass" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
              <a className="cursor-pointer hover:text-brass" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brass">
            Paiement accepté
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
            <li className="rounded-full bg-white/10 px-3 py-1.5">Orange Money</li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">MTN Mobile Money</li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">Espèces à l&apos;arrivée</li>
          </ul>
          <p className="mt-5 text-xs text-stone-soft/60">
            Réservation rapide via WhatsApp disponible 24h/24.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-stone-soft/50 md:px-8">
        © {new Date().getFullYear()} Hôtel Excellexior — {SITE.city}, {SITE.country}. Tous droits réservés.
      </div>
    </footer>
  );
}
