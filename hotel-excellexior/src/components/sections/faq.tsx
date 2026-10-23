"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Reveal from "@/components/motion/reveal";
import type { SiteContent } from "@/lib/content";

export default function Faq({ content }: { content: SiteContent["faq"] }) {
  // An emptied question in the admin hides that entry.
  const items = content.items.filter((item) => item.question.trim() !== "");
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy">
            {content.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-ink md:text-5xl">
            {content.title}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <div key={i}>
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
