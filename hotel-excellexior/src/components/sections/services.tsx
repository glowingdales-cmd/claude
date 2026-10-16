"use client";

import { motion } from "framer-motion";
import {
  AirVent,
  Bath,
  Dumbbell,
  PlaneTakeoff,
  Shirt,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";
import Reveal from "@/components/motion/reveal";
import StaggerGroup, { staggerItem } from "@/components/motion/stagger-group";

const SERVICE_ITEMS = [
  { icon: Wifi, label: "Wi-Fi gratuit haut débit" },
  { icon: UtensilsCrossed, label: "Restaurant & bar panoramique" },
  { icon: Waves, label: "Piscine extérieure" },
  { icon: Dumbbell, label: "Salle de sport" },
  { icon: Sparkles, label: "Spa & massage sur réservation" },
  { icon: PlaneTakeoff, label: "Navette aéroport Nsimalen" },
  { icon: Shirt, label: "Blanchisserie & pressing" },
  { icon: AirVent, label: "Climatisation dans tout l'hôtel" },
  { icon: Bath, label: "Room service 24h/24" },
  { icon: ShieldCheck, label: "Réception & sécurité 24h/24" },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-stone px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            À votre service
          </p>
          <h2 className="font-display text-balance mt-3 text-4xl font-semibold text-ink md:text-5xl">
            Équipements & services inclus
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICE_ITEMS.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="flex flex-col items-center gap-3 rounded-sm bg-stone-soft p-5 text-center shadow-sm shadow-black/5"
            >
              <Icon className="h-6 w-6 text-burgundy" aria-hidden="true" />
              <p className="text-xs font-medium leading-snug text-ink/80">{label}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
