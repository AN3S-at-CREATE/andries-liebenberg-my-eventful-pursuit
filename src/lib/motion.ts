/** AN3S timings in seconds, matching the global CSS tokens. */
export const motionTokens = {
  fast: 0.12, base: 0.24, slow: 0.42, breath: 4, stagger: 0.06,
  ease: [0.2, 0.7, 0.2, 1] as const,
  easeIo: [0.65, 0, 0.35, 1] as const,
  navHeight: 64,
};
/** Global stars follow scroll only on desktop fine pointers without reduced motion. */
export function starfieldOffset(scrollY: number, isDesktop: boolean, isReduced: boolean) {
  return isDesktop && !isReduced ? scrollY * -0.04 : 0;
}
/** Bound delays for large card grids. */
export function staggerIndex(index: number, isMobile: boolean) {
  return Math.min(Math.max(index, 0), isMobile ? 5 : 7);
}
