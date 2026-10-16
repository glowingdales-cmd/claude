import { BedDouble, Car, PartyPopper, PlaneLanding } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import AnimatedCounter from "@/components/motion/animated-counter";

const STATS = [
  { icon: BedDouble, value: "48", label: "Chambres & suites" },
  { icon: PartyPopper, value: "300", label: "Invités en événementiel" },
  { icon: Car, value: "60+", label: "Places de parking sécurisées" },
  { icon: PlaneLanding, value: "25 min", label: "De l'aéroport de Nsimalen" },
];

export default function StatsStrip() {
  return (
    <section className="bg-burgundy text-white">
      <Reveal>
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-6 md:grid-cols-4 md:divide-y-0 md:px-8">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
              <dd className="font-display text-3xl font-semibold tabular-nums text-white md:text-4xl">
                <AnimatedCounter value={value} />
              </dd>
              <dt className="text-xs uppercase tracking-wider text-stone-soft/60">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
