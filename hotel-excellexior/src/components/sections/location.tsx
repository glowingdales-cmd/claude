import { MapPin, PlaneLanding } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";

export default function Location({ content }: { content: SiteContent["location"] }) {
  const mapQuery = encodeURIComponent(`${SITE.name} ${content.address}`);

  return (
    <section className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 flex items-start gap-2.5 text-base text-ink/70">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            {content.address}
          </p>
          <p className="mt-2 flex items-start gap-2.5 text-base text-ink/70">
            <PlaneLanding className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden="true" />
            {content.access}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-sm shadow-sm shadow-black/10">
          <iframe
            title="Localisation de l'Hôtel Excellexior sur Google Maps"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
