import Link from "next/link";
import { CalendarCheck, MessageCircle, Smartphone, Wallet } from "lucide-react";
import Reveal from "@/components/motion/reveal";

const STEPS = [
  {
    icon: CalendarCheck,
    title: "1. Choisissez vos dates",
    description: "Sélectionnez votre chambre, vos dates et le nombre de voyageurs sur le formulaire de réservation.",
  },
  {
    icon: Smartphone,
    title: "2. Payez un acompte",
    description: "Réglez l'acompte via Orange Money, MTN Mobile Money, ou optez pour un paiement à l'arrivée.",
  },
  {
    icon: MessageCircle,
    title: "3. Recevez la confirmation",
    description: "Notre équipe confirme votre réservation par email ou WhatsApp sous quelques heures.",
  },
];

export default function PaymentMethods() {
  return (
    <section className="bg-ink px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
            Réservation simple & locale
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold md:text-5xl">
            Payez comme vous le souhaitez
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-soft/70">
            Nous acceptons les moyens de paiement mobile les plus utilisés au
            Cameroun, en plus du paiement en espèces à votre arrivée.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-4">
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold">
            <Wallet className="h-4 w-4 text-brass" aria-hidden="true" /> Orange Money
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold">
            <Wallet className="h-4 w-4 text-brass" aria-hidden="true" /> MTN Mobile Money
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold">
            <Wallet className="h-4 w-4 text-brass" aria-hidden="true" /> Espèces à l&apos;arrivée
          </span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <Reveal key={title}>
              <Icon className="h-6 w-6 text-brass" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-soft/65">{description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/contact#reservation"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Démarrer ma réservation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
