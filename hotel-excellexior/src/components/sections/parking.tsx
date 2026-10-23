"use client";

import { motion } from "framer-motion";
import { Car, Clock3, ShieldCheck, Video } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import HotelPhoto from "@/components/hotel-photo";
import type { SiteContent } from "@/lib/content";

const ICONS = [Car, ShieldCheck, Video, Clock3];

export default function Parking({ content }: { content: SiteContent["parking"] }) {
  return (
    <section id="parking" className="scroll-mt-24 bg-burgundy px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-soft/75">{content.text}</p>

          <StaggerGroup className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {content.features.map(({ title, description }, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div key={i} variants={staggerItem} className="rounded-sm border border-white/10 bg-white/5 p-5">
                  <Icon className="h-5 w-5 text-brass" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-soft/65">{description}</p>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </Reveal>

        <Reveal delay={0.15}>
          <HotelPhoto
            src="/photos/parking.webp"
            alt="Parking sécurisé dans la cour intérieure de l'hôtel"
            className="aspect-[4/5] w-full rounded-sm"
          />
        </Reveal>
      </div>
    </section>
  );
}
