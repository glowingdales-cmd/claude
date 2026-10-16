"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/logo";

const SEEN_KEY = "excellexior-intro-seen";

/**
 * A brief, once-per-browser-session crest reveal shown only on the home
 * page's first load — not on client-side navigation back to "/" or on
 * deep links. Skipped entirely under prefers-reduced-motion.
 */
export default function SiteIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;

    sessionStorage.setItem(SEEN_KEY, "1");
    // Intentional: sessionStorage can only be read client-side, so whether
    // to show this one-time overlay is only known after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoMark className="h-24 w-24 drop-shadow-[0_0_30px_rgba(230,151,14,0.35)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
