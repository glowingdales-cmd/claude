"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared state of the home-page intro overlay, so the hero can hold its
 * entrance animation until the curtain lifts instead of playing it hidden
 * underneath. "pending" until SiteIntro has decided whether to play.
 */
type IntroState = "pending" | "playing" | "done";

let state: IntroState = "pending";
const listeners = new Set<() => void>();

export function setIntroState(next: IntroState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** True once the intro has finished or was skipped. */
export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => state === "done",
    () => false,
  );
}
