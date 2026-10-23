"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/logo";
import { setIntroState } from "@/components/motion/intro-state";

const SEEN_KEY = "excellexior-intro-seen";
const DURATION_MS = 2300;
const NAME = "HÔTEL EXCELLEXIOR";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Once-per-browser-session opening sequence on the home page's first load:
 * the crest appears, a brass rule draws itself, the hotel name types in
 * letter by letter, then the two halves of the curtain part to reveal the
 * page. Not shown on client-side navigation back to "/", on deep links, or
 * under prefers-reduced-motion.
 */
export default function SiteIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || sessionStorage.getItem(SEEN_KEY)) {
      setIntroState("done");
      return;
    }

    sessionStorage.setItem(SEEN_KEY, "1");
    setIntroState("playing");
    // Intentional: sessionStorage can only be read client-side, so whether
    // to show this one-time overlay is only known after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  // Kept separate from the mount-guard effect above: in development,
  // React Strict Mode runs that effect twice, and since its sessionStorage
  // guard short-circuits the second run, a dismiss timer scheduled inside
  // it would get armed then immediately cleared, leaving the intro stuck.
  // This effect re-arms safely because it keys off the `show` state itself.
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), DURATION_MS);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence onExitComplete={() => setIntroState("done")}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60] overflow-hidden"
          exit={{ pointerEvents: "none" }}
          aria-hidden="true"
        >
          {/* Curtain halves: they slide apart on exit. */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-burgundy"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-burgundy"
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="relative flex h-full flex-col items-center justify-center px-6"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-brass/30 blur-2xl"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0.6], scale: [0.6, 1.3, 1.1] }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
              <LogoMark className="relative h-24 w-24 sm:h-28 sm:w-28" />
            </motion.div>

            <motion.span
              className="mt-7 block h-px w-48 origin-center bg-gradient-to-r from-transparent via-brass to-transparent sm:w-64"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            />

            <p className="mt-5 flex font-display text-xl font-semibold tracking-[0.3em] text-white sm:text-2xl">
              {NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.45, delay: 0.75 + i * 0.035, ease: EASE }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </p>

            <motion.p
              className="mt-3 text-xs font-medium uppercase tracking-[0.4em] text-brass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Yaoundé · Cameroun
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
