"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import HotelPhoto from "@/components/hotel-photo";
import type { SitePhoto } from "@/lib/photos";
import type { SiteContent } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const BIG = "col-span-2 row-span-2";
const TALL = "row-span-2";
const SMALL = "";
const WIDE = "col-span-2";
const FULL = "col-span-2 md:col-span-4";

// Bento blocks that each fill whole rows of both the 2-column (mobile) and
// 4-column grids, so the mosaic never has holes. Full groups of 6 use the
// first block; the leftover 1–5 photos at the end use the matching one.
const BLOCKS: Record<number, string[]> = {
  6: [BIG, TALL, SMALL, SMALL, WIDE, WIDE],
  1: [FULL],
  2: [WIDE, WIDE],
  3: [BIG, TALL, TALL],
  4: [BIG, TALL, SMALL, SMALL],
  5: [BIG, TALL, SMALL, SMALL, FULL],
};

function tileSpan(index: number, total: number) {
  const groupStart = index - (index % 6);
  const groupSize = Math.min(6, total - groupStart);
  return BLOCKS[groupSize][index - groupStart];
}

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const tile: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94, clipPath: "inset(12% 12% 12% 12% round 4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 4px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function Gallery({ photos, content }: { photos: SitePhoto[]; content: SiteContent["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <section id="galerie" className="scroll-mt-24 bg-ink px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">
              {content.eyebrow}
            </p>
            <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-white md:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-stone-soft/60">
            {content.text}
          </p>
        </Reveal>

        <motion.ul
          className="mt-12 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4"
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {photos.map((photo, i) => (
            <motion.li key={photo.id} variants={tile} className={tileSpan(i, photos.length)}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Agrandir : ${photo.alt}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <HotelPhoto
                  src={photo.url}
                  alt={photo.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span aria-hidden="true" className="absolute inset-2 rounded-sm border border-brass/0 transition-colors duration-500 group-hover:border-brass/60" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left">
                  <span className="translate-y-1 font-display text-base font-semibold text-white transition-transform duration-500 group-hover:translate-y-0 md:text-lg">
                    {photo.alt}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 scale-75 items-center justify-center rounded-full bg-brass text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: SitePhoto[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [direction, setDirection] = useState(0);
  const go = useCallback(
    (step: number) => {
      setDirection(step);
      onIndex((index + step + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const photo = photos[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Galerie photo"
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-stone-soft/80">
        <span className="text-sm tabular-nums">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brass hover:text-ink"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={photo.id}
            custom={direction}
            className="absolute inset-0 px-4 md:px-20"
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 80 : -80, scale: 0.96 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -80 : 80, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
          >
            <div className="relative h-full w-full">
              <Image src={photo.url} alt={photo.alt} fill sizes="100vw" className="pointer-events-none object-contain" />
            </div>
          </motion.div>
        </AnimatePresence>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-brass hover:text-ink md:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-brass hover:text-ink md:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="px-5 pb-4 pt-3" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.p
            key={photo.id}
            className="text-center font-display text-lg text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {photo.alt}
          </motion.p>
        </AnimatePresence>
        {/* Thumbnail strip */}
        <div className="mx-auto mt-3 flex max-w-3xl justify-center gap-2 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                onIndex(i);
              }}
              aria-label={`Afficher : ${p.alt}`}
              aria-current={i === index}
              className={`relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all ${
                i === index ? "ring-2 ring-brass" : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={p.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
