"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Parses values like "48", "300", "60+", "25 min" into a numeric part to
 * count up and a suffix to keep static, so the stats strip can animate
 * without hardcoding a shape per stat.
 */
function splitValue(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { number: null as number | null, prefix: "", suffix: raw };
  return { number: Number(match[1]), prefix: "", suffix: match[2] };
}

export default function AnimatedCounter({ value }: { value: string }) {
  const { number, suffix } = splitValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });

  useEffect(() => {
    if (inView && number !== null) {
      motionValue.set(number);
    }
  }, [inView, number, motionValue]);

  useEffect(() => {
    if (number === null || !ref.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      ref.current.textContent = `${number}${suffix}`;
      return;
    }
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
    return unsubscribe;
  }, [spring, number, suffix]);

  if (number === null) {
    return <span>{value}</span>;
  }

  return <span ref={ref} aria-label={value}>0{suffix}</span>;
}
