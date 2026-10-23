"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, PlaneLanding } from "lucide-react";
import { SITE } from "@/lib/constants";
import HotelPhoto from "@/components/hotel-photo";
import { useIntroDone } from "@/components/motion/intro-state";

const SLIDES = [
  { src: "/photos/facade-nuit.webp", alt: "Façade de l'Hôtel Excellexior illuminée de nuit" },
  { src: "/photos/cour-nuit.webp", alt: "Cour intérieure de l'hôtel éclairée le soir" },
  { src: "/photos/facade-jour.webp", alt: "Façade de l'hôtel en journée" },
  { src: "/photos/salle-banquet.webp", alt: "Salle de banquet dressée pour une réception" },
];
const SLIDE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;
const TITLE = "L'excellence hôtelière, en plein cœur de Yaoundé.";

const content: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const title: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
// Each word slides up from behind its own clipping mask.
const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const introDone = useIntroDone();
  const reduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);

  // Parallax: the photo drifts slower than the page and the copy fades out
  // as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, slide]);

  const state = introDone ? "visible" : "hidden";

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-burgundy-deep">
      <motion.div className="absolute inset-0" style={{ y: reduceMotion ? 0 : imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            {/* Slow "Ken Burns" push-in while the slide is on screen. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.6, ease: "linear" }}
            >
              <HotelPhoto
                src={SLIDES[slide].src}
                alt={SLIDES[slide].alt}
                sizes="100vw"
                priority
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/95 via-burgundy/25 to-ink/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 md:px-8 md:pb-28"
        style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        variants={content}
        initial="hidden"
        animate={state}
      >
        <motion.p
          variants={rise}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-brass"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {SITE.city}, {SITE.country}
        </motion.p>

        <motion.h1
          variants={title}
          aria-label={TITLE}
          className="font-display text-balance mt-5 max-w-3xl text-5xl font-semibold leading-[1.08] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl"
        >
          {TITLE.split(" ").map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
              {" "}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-stone-soft/90">
          Chambres raffinées, salles de réunion équipées, parking sécurisé et
          jardins événementiels : l&apos;Hôtel Excellexior accueille vos
          séjours d&apos;affaires comme vos grands jours.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/contact#reservation"
            className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-brass px-7 py-3.5 text-base font-semibold text-ink shadow-lg shadow-brass/25 transition-transform hover:scale-105"
          >
            {/* Light sweep across the main call to action on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            Réserver une chambre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/chambres"
            className="cursor-pointer rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-brass hover:text-brass"
          >
            Voir les chambres
          </Link>
        </motion.div>
      </motion.div>

      {/* Ticket-stub detail: a grounded, real selling point for a business
          hotel — distance to the airport — styled like a departure board. */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="absolute bottom-28 right-6 z-10 hidden max-w-xs rounded-lg border border-white/15 bg-burgundy/70 px-5 py-4 backdrop-blur-md md:right-10 md:block"
      >
        <div className="flex items-center gap-2 text-brass">
          <PlaneLanding className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider">Aéroport Nsimalen</span>
        </div>
        <p className="mt-1 font-display text-2xl font-semibold text-white">≈ 25 min</p>
        <p className="text-xs text-stone-soft/60">Navette sur demande</p>
      </motion.div>

      {/* Slide indicators: the active one fills up over the slide's duration.
          Bottom-left, aligned with the copy, so the floating WhatsApp button
          in the bottom-right corner never covers them. */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-full max-w-7xl gap-2 px-6 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Afficher la photo ${i + 1} : ${s.alt}`}
            aria-current={i === slide}
            className="group relative h-6 w-10 cursor-pointer sm:w-14"
          >
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 group-hover:bg-white/40">
              {i === slide && (
                <motion.span
                  key={slide}
                  className="block h-full origin-left bg-brass"
                  initial={{ scaleX: reduceMotion ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#chambres-apercu"
        aria-label="Découvrir les chambres"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 hover:text-brass md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        Découvrir
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
