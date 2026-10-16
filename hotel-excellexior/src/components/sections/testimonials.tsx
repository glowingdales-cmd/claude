"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    quote:
      "Séminaire de 80 personnes organisé sans accroc : salle impeccable, pause-café soignée et équipe aux petits soins.",
    name: "Brice M.",
    role: "Directeur commercial, Yaoundé",
  },
  {
    quote:
      "Notre mariage dans le jardin de l'hôtel restera gravé dans nos mémoires. Décoration, traiteur et parking pour nos invités : tout était parfait.",
    name: "Carine & Steve",
    role: "Mariés en 2025",
  },
  {
    quote:
      "En déplacement professionnel toutes les semaines, je choisis toujours l'Excellexior : chambre calme, Wi-Fi rapide et parking sécurisé pour mon véhicule.",
    name: "Dr. Ngo Bisseck",
    role: "Consultant indépendant",
  },
];

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % count) + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    timerRef.current = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, paused, go]);

  const current = TESTIMONIALS[index];

  return (
    <section className="bg-stone px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            Ils nous ont fait confiance
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-ink md:text-5xl">
            La parole à nos clients
          </h2>
        </Reveal>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote className="mx-auto h-8 w-8 text-brass" aria-hidden="true" />

          <div
            className="mt-5 min-h-[160px]"
            role="group"
            aria-roledescription="carrousel"
            aria-label="Témoignages clients"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} sur ${count}`}
              >
                <p className="font-display text-balance text-xl leading-relaxed text-ink md:text-2xl">
                  “{current.quote}”
                </p>
                <p className="mt-5 text-sm font-semibold text-ink">{current.name}</p>
                <p className="text-xs text-ink/55">{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Témoignage précédent"
              className="cursor-pointer rounded-full border border-ink/15 p-2.5 transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Choisir un témoignage">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Témoignage ${i + 1} sur ${count}`}
                  onClick={() => go(i)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                    i === index ? "bg-brass" : "bg-ink/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Témoignage suivant"
              className="cursor-pointer rounded-full border border-ink/15 p-2.5 transition-colors hover:border-brass hover:text-brass"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
