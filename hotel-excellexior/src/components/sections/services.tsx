"use client";

import { motion } from "framer-motion";
import {
  AirVent,
  Bath,
  CheckCircle2,
  Dumbbell,
  PlaneTakeoff,
  Shirt,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import type { SiteContent } from "@/lib/content";

// Icons follow the order of the default service list; services the admin
// adds beyond it get a generic check icon.
const ICONS = [Wifi, UtensilsCrossed, Waves, Dumbbell, Sparkles, PlaneTakeoff, Shirt, AirVent, Bath, ShieldCheck];

export default function Services({ content }: { content: SiteContent["services"] }) {
  return (
    <section id="services" className="scroll-mt-24 bg-stone px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {content.items.map((label, i) => {
            const Icon = ICONS[i] ?? CheckCircle2;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex flex-col items-center gap-3 rounded-sm bg-stone-soft p-5 text-center shadow-sm shadow-black/5"
              >
                <Icon className="h-6 w-6 text-burgundy" aria-hidden="true" />
                <p className="text-xs font-medium leading-snug text-ink/80">{label}</p>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
