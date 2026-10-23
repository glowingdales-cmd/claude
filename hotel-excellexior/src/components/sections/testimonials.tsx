"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import type { SiteContent } from "@/lib/content";

const AUTOPLAY_MS = 6000;

export default function Testimonials({ content }: { content: SiteContent["testimonials"] }) {
  // An emptied quote in the admin hides that testimonial.
  const testimonials = content.items.filter((t) => t.quote.trim() !== "");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
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

  const current = testimonials[index % Math.max(count, 1)];
  if (!current) return null;

  return (
    <section className="bg-stone px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
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
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Témoignage ${i + 1} sur ${count}`}
                  onClick={() => go(i)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${
                    i === index ? "bg-brass" : "bg-burgundy/20"
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
