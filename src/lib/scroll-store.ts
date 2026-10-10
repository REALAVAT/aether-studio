/**
 * Mutable scroll state shared between GSAP/Lenis (DOM) and the R3F render loop.
 * Deliberately not React state: it is written on every scroll tick and read
 * every frame, so it must never trigger re-renders.
 */
export const scrollState = {
  /** 0 → 1 across the pinned hero */
  hero: 0,
  /** Normalised pointer position, -1 → 1 */
  pointerX: 0,
  pointerY: 0,
};
