"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, PlaneLanding } from "lucide-react";
import { SITE } from "@/lib/constants";
import PhotoPlaceholder from "@/components/photo-placeholder";
import { Building2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <PhotoPlaceholder
        icon={Building2}
        label="Façade de l'hôtel — photo à venir"
        tone="dark"
        className="absolute inset-0 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-8 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-brass"
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {SITE.city}, {SITE.country}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-balance mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          L&apos;excellence hôtelière, en plein cœur de Yaoundé.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-stone-soft/85"
        >
          Chambres raffinées, salles de réunion équipées, parking sécurisé et
          jardins événementiels : l&apos;Hôtel Excellexior accueille vos
          séjours d&apos;affaires comme vos grands jours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact#reservation"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-105"
          >
            Réserver une chambre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/chambres"
            className="cursor-pointer rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-brass hover:text-brass"
          >
            Voir les chambres
          </Link>
        </motion.div>
      </div>

      {/* Ticket-stub detail: a grounded, real selling point for a business
          hotel — distance to the airport — styled like a departure board. */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mb-8 ml-auto mr-6 hidden max-w-xs rounded-lg border border-white/15 bg-ink/70 px-5 py-4 backdrop-blur-md md:mr-10 md:block"
      >
        <div className="flex items-center gap-2 text-brass">
          <PlaneLanding className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider">Aéroport Nsimalen</span>
        </div>
        <p className="mt-1 font-display text-2xl font-semibold text-white">≈ 25 min</p>
        <p className="text-xs text-stone-soft/60">Navette sur demande</p>
      </motion.div>
    </section>
  );
}
