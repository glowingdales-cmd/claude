import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import BrassDivider from "@/components/brass-divider";
import { SITE } from "@/lib/constants";

export default function FinalCta() {
  const message = encodeURIComponent(
    "Bonjour Hôtel Excellexior, je souhaite avoir des informations sur une réservation."
  );

  return (
    <section className="bg-brass px-6 py-16 text-ink md:px-8 md:py-20">
      <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-balance text-3xl font-semibold md:text-5xl">
          Prêt à vivre l&apos;expérience Excellexior ?
        </h2>
        <p className="max-w-xl text-sm text-ink/75 md:text-base">
          Notre équipe vous répond sous quelques heures, par téléphone,
          WhatsApp ou email.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact#reservation"
            className="cursor-pointer rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Réserver maintenant
          </Link>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </a>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> Appeler
          </a>
        </div>
      </Reveal>
      <BrassDivider className="mx-auto mt-14 max-w-xl opacity-30" />
    </section>
  );
}
