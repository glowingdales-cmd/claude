import Link from "next/link";
import { CalendarCheck, MessageCircle, Smartphone, Wallet } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import type { SiteContent } from "@/lib/content";

const ICONS = [CalendarCheck, Smartphone, MessageCircle];

export default function PaymentMethods({ content }: { content: SiteContent["payment"] }) {
  return (
    <section className="bg-burgundy px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-soft/70">
            {content.text}
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
          {content.steps.map(({ title, description }, i) => {
            const Icon = ICONS[i];
            return (
            <Reveal key={i}>
              <Icon className="h-6 w-6 text-brass" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-soft/65">{description}</p>
            </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/contact#reservation"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            {content.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
