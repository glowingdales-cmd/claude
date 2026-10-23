"use client";

import Link from "next/link";
import { ArrowRight, Maximize, Users } from "lucide-react";
import { ROOM_TYPES } from "@/lib/constants";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import HotelPhoto from "@/components/hotel-photo";
import type { SitePhoto } from "@/lib/photos";
import { motion } from "framer-motion";

export default function RoomsTeaser({
  coverPhotos,
}: {
  /** First photo of each room's carousel, keyed by room slug. */
  coverPhotos: Partial<Record<string, SitePhoto>>;
}) {
  return (
    <section id="chambres-apercu" className="scroll-mt-20 bg-stone px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
              Hébergement
            </p>
            <h2 className="font-display text-balance mt-3 max-w-xl text-4xl font-semibold text-ink md:text-5xl">
              Des chambres pensées pour chaque séjour
            </h2>
          </div>
          <Link
            href="/chambres"
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink hover:text-burgundy"
          >
            Voir toutes les chambres
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {ROOM_TYPES.map((room) => (
            <motion.div key={room.slug} variants={staggerItem}>
              <Link
                href={`/chambres#${room.slug}`}
                className="group block cursor-pointer overflow-hidden rounded-sm bg-stone-soft shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/15"
              >
                <div className="overflow-hidden">
                  {coverPhotos[room.slug] ? (
                    <HotelPhoto
                      src={coverPhotos[room.slug]!.url}
                      alt={room.name}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-burgundy via-burgundy-deep to-ink" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {room.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-ink/55">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" /> {room.capacity} pers.
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="h-3.5 w-3.5" aria-hidden="true" /> {room.size} m²
                    </span>
                  </div>
                  <p className="mt-3 font-display text-xl font-semibold text-burgundy">
                    {room.price.toLocaleString("fr-FR")} FCFA
                    <span className="text-xs font-normal text-ink/50"> / nuit</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
