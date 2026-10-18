import { describe, expect, it } from "vitest";
import { motionTokens, staggerIndex, starfieldOffset } from "./motion";

describe("AN3S motion v1 rules", () => {
  it("uses the approved timings and easing", () => {
    expect(motionTokens).toEqual({ fast: .12, base: .24, slow: .42, breath: 4, stagger: .06, ease: [.2, .7, .2, 1], easeIo: [.65, 0, .35, 1], navHeight: 64 });
  });
  it("moves desktop stars at exactly negative 0.04 times scroll", () => {
    expect(starfieldOffset(1000, true, false)).toBe(-40);
  });
  it("keeps mobile and tablet stars static", () => {
    expect(starfieldOffset(1000, false, false)).toBe(0);
  });
  it("keeps reduced-motion stars static", () => {
    expect(starfieldOffset(1000, true, true)).toBe(0);
  });
  it("caps desktop stagger at seven", () => {
    expect(staggerIndex(12, false)).toBe(7);
  });
  it("caps mobile stagger at five", () => {
    expect(staggerIndex(12, true)).toBe(5);
  });
});