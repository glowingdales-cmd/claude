"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import HotelPhoto from "@/components/hotel-photo";

const PLATES = [
  { src: "/photos/cour-nuit.webp", label: "La cour intérieure de nuit" },
  { src: "/photos/facade-jour.webp", label: "Façade de l'hôtel" },
  { src: "/photos/chambre-deluxe.webp", label: "Chambre" },
  { src: "/photos/salle-conference-entree.webp", label: "Salle de conférence" },
  { src: "/photos/table-reception.webp", label: "Table de réception" },
  { src: "/photos/buffet.webp", label: "Service buffet" },
  { src: "/photos/salle-banquet.webp", label: "Salle de banquet" },
  { src: "/photos/batiment-chambres.webp", label: "Galeries des chambres" },
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
            Chambres, salles, réceptions et cour intérieure : découvrez
            l&apos;Hôtel Excellexior tel que nos clients le vivent.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {PLATES.map(({ src, label }, i) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-sm ${i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""} ${i === PLATES.length - 1 ? "hidden sm:block" : ""}`}
            >
              <HotelPhoto
                src={src}
                alt={label}
                sizes="(min-width: 640px) 33vw, 50vw"
                className={`w-full transition-transform duration-500 group-hover:scale-110 ${i === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"}`}
              />
              <span className="absolute bottom-3 left-3 rounded-sm bg-ink/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-soft/90 backdrop-blur-sm">
                {label}
              </span>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
