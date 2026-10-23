import { BedDouble, Car, PartyPopper, PlaneLanding } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import AnimatedCounter from "@/components/motion/animated-counter";
import type { SiteContent } from "@/lib/content";

const ICONS = [BedDouble, PartyPopper, Car, PlaneLanding];

export default function StatsStrip({ content }: { content: SiteContent["stats"] }) {
  return (
    <section className="bg-burgundy text-white">
      <Reveal>
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-6 md:grid-cols-4 md:divide-y-0 md:px-8">
          {content.items.map(({ value, label }, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
                <dd className="font-display text-3xl font-semibold tabular-nums text-white md:text-4xl">
                  <AnimatedCounter value={value} />
                </dd>
                <dt className="text-xs uppercase tracking-wider text-stone-soft/60">
                  {label}
                </dt>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </section>
  );
}
