"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brass bar across the top of the viewport tracking scroll depth. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-brass-soft via-brass to-burgundy"
      style={{ scaleX }}
    />
  );
}
