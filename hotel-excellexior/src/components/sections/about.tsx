import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import ImageReveal from "@/components/motion/image-reveal";
import HotelPhoto from "@/components/hotel-photo";
import type { SiteContent } from "@/lib/content";

export default function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <ImageReveal>
          <HotelPhoto
            src="/photos/cour-interieure.webp"
            alt="Cour intérieure arborée de l'hôtel et galeries des chambres"
            className="aspect-[4/5] w-full rounded-sm"
          />
        </ImageReveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">{content.text}</p>
          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {content.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
