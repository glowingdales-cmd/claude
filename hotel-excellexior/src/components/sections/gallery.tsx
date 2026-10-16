"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  CalendarHeart,
  ConciergeBell,
  Presentation,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import PhotoPlaceholder from "@/components/photo-placeholder";

const PLATES = [
  { icon: ConciergeBell, label: "Hall & réception" },
  { icon: BedDouble, label: "Suite Exécutive" },
  { icon: Presentation, label: "Salle de conférence" },
  { icon: Waves, label: "Piscine extérieure" },
  { icon: CalendarHeart, label: "Jardin événementiel" },
  { icon: UtensilsCrossed, label: "Restaurant & bar" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="scroll-mt-24 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
              Galerie
            </p>
            <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
              L&apos;hôtel en images
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink/55">
            Nos photographies officielles arrivent prochainement — en
            attendant, chaque espace est identifié ci-dessous.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {PLATES.map(({ icon, label }, i) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className={`group overflow-hidden rounded-sm ${i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""}`}
            >
              <PhotoPlaceholder
                icon={icon}
                label={label}
                className={`w-full transition-transform duration-500 group-hover:scale-110 ${i === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"}`}
              />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
