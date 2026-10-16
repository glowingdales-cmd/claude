"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarHeart, CheckCircle2, Presentation, Sparkles } from "lucide-react";
import { MEETING_SPACES } from "@/lib/constants";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";
import PhotoPlaceholder from "@/components/photo-placeholder";

const ICONS = [Presentation, CalendarHeart, Sparkles];

export default function EventsMeeting() {
  return (
    <section id="evenementiel" className="scroll-mt-24 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            Réunions & grands jours
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            Salles de réunion, mariages et réceptions
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Du séminaire d&apos;entreprise au mariage de 300 invités, nos
            équipes événementielles prennent en charge l&apos;organisation
            complète : traiteur, décoration, sonorisation et hébergement de
            vos invités.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {MEETING_SPACES.map((space, i) => {
            const Icon = ICONS[i] ?? Presentation;
            return (
              <motion.div
                key={space.name}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group overflow-hidden rounded-sm bg-stone shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/15"
              >
                <div className="overflow-hidden">
                  <PhotoPlaceholder
                    icon={Icon}
                    label={`${space.name} — photo à venir`}
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{space.name}</h3>
                  <p className="mt-1 text-sm font-medium text-burgundy">{space.capacity}</p>
                  <p className="mt-2 text-sm text-ink/65">{space.bestFor}</p>
                  <ul className="mt-4 space-y-2">
                    {space.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Link
            href="/contact#reservation"
            className="cursor-pointer rounded-full bg-burgundy px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Demander un devis événementiel
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
