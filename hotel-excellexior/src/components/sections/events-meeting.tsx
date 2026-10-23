"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MEETING_SPACES } from "@/lib/constants";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import HotelPhoto from "@/components/hotel-photo";
import type { SiteContent } from "@/lib/content";

export default function EventsMeeting({ content }: { content: SiteContent["events"] }) {
  return (
    <section id="evenementiel" className="scroll-mt-24 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">{content.text}</p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {content.spaces.map((space, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group overflow-hidden rounded-sm bg-stone shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/15"
            >
              <div className="overflow-hidden">
                <HotelPhoto
                  src={MEETING_SPACES[i].photo}
                  alt={space.name}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{space.name}</h3>
                <p className="mt-1 text-sm font-medium text-burgundy">{space.capacity}</p>
                <p className="mt-2 text-sm text-ink/65">{space.bestFor}</p>
                <ul className="mt-4 space-y-2">
                  {space.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-ink/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Link
            href="/contact#reservation"
            className="cursor-pointer rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {content.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
