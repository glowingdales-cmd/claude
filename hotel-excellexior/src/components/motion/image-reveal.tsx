"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Unveils an image when it scrolls into view: a burgundy panel wipes
 * upward off the photo while the photo settles from a slight zoom.
 */
export default function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-sm ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        variants={{ hidden: { scale: 1.2 }, visible: { scale: 1 } }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-top bg-burgundy"
        variants={{ hidden: { scaleY: 1 }, visible: { scaleY: 0 } }}
        transition={{ duration: 1, ease: EASE }}
      />
    </motion.div>
  );
}
