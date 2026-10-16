"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Reveal from "@/components/motion/reveal";

const FAQS = [
  {
    question: "Quels sont les horaires d'arrivée et de départ ?",
    answer: "L'arrivée (check-in) est possible à partir de 14h00 et le départ (check-out) avant 12h00. Un départ tardif peut être organisé sur demande, selon disponibilité.",
  },
  {
    question: "Le parking est-il payant ?",
    answer: "Le parking interne est gratuit pour les clients résidents. Le parking externe est disponible pour les visiteurs et invités d'événements, avec un tarif préférentiel communiqué à la réservation.",
  },
  {
    question: "Puis-je payer par Orange Money ou MTN Mobile Money ?",
    answer: "Oui. Lors de la réservation, choisissez Orange Money ou MTN Mobile Money : vous recevrez le numéro marchand et les instructions pour effectuer votre dépôt, puis indiquerez la référence de transaction.",
  },
  {
    question: "Organisez-vous des mariages et événements d'entreprise ?",
    answer: "Oui, notre équipe événementielle organise mariages, réceptions et réunions professionnelles jusqu'à 300 invités, avec traiteur, décoration et parking dédié.",
  },
  {
    question: "Y a-t-il une politique d'annulation ?",
    answer: "Les réservations peuvent être annulées ou modifiées gratuitement jusqu'à 48h avant l'arrivée. Contactez-nous par téléphone, email ou WhatsApp pour toute modification.",
  },
  {
    question: "Le Wi-Fi est-il inclus ?",
    answer: "Le Wi-Fi fibre haut débit est gratuit dans toutes les chambres et espaces communs de l'hôtel.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            Questions fréquentes
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-ink md:text-5xl">
            Tout ce qu&apos;il faut savoir
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-base font-medium text-ink md:text-lg">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-brass" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-ink/65">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
