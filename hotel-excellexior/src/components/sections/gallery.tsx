"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import HotelPhoto from "@/components/hotel-photo";
import type { SitePhoto } from "@/lib/photos";

export default function Gallery({ photos }: { photos: SitePhoto[] }) {
  if (photos.length === 0) return null;

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
          {photos.map(({ id, url, alt }) => (
            <motion.div
              key={id}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-sm"
            >
              <HotelPhoto
                src={url}
                alt={alt}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-3 left-3 rounded-sm bg-ink/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-stone-soft/90 backdrop-blur-sm">
                {alt}
              </span>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
