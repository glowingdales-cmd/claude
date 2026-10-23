"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HotelPhoto from "@/components/hotel-photo";
import type { SitePhoto } from "@/lib/photos";

const SWIPE_THRESHOLD = 60;

export default function PhotoCarousel({
  photos,
  label,
  className = "",
}: {
  photos: SitePhoto[];
  label: string;
  className?: string;
}) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  if (photos.length === 0) {
    return <div className={`bg-gradient-to-br from-burgundy via-burgundy-deep to-ink ${className}`} />;
  }

  // Photos can be deleted from the admin while the page is open; keep the
  // index in range instead of rendering nothing.
  const current = index % photos.length;
  const go = (step: number) =>
    setState([(current + step + photos.length) % photos.length, step]);
  const many = photos.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
      tabIndex={many ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className={`group relative isolate overflow-hidden bg-burgundy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${className}`}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={photos[current].id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d >= 0 ? "100%" : "-100%" }),
            center: { x: 0 },
            exit: (d: number) => ({ x: d >= 0 ? "-100%" : "100%" }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          drag={many ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(1);
            else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <HotelPhoto
            src={photos[current].url}
            alt={photos[current].alt}
            className="pointer-events-none h-full w-full"
          />
        </motion.div>
      </AnimatePresence>

      {many && (
        <>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-sm transition-colors hover:bg-ink/70 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/45 text-white backdrop-blur-sm transition-colors hover:bg-ink/70 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`Afficher la photo ${i + 1} sur ${photos.length}`}
                aria-current={i === current}
                onClick={() => setState([i, i > current ? 1 : -1])}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  i === current ? "w-6 bg-brass" : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <span className="sr-only" aria-live="polite">
        Photo {current + 1} sur {photos.length} : {photos[current].alt}
      </span>
    </div>
  );
}
