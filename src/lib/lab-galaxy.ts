import { labConstellations, labStars, type LabConstellation, type LabStar } from "@/data/lab";

export type LabSignal = "all" | LabConstellation;
export interface PositionedStar { star: LabStar; x: number; y: number; index: number }
const clusterCentres: Record<LabConstellation, [number, number]> = { ai: [265, 210], agents: [710, 230], build: [710, 535], ventures: [270, 555] };
const offsets: [number, number][] = [[-100, -65], [10, -90], [120, -50], [-145, 25], [-30, 0], [90, 55], [-95, 105], [25, 135]];

/** Approval is applied once before counts, maps, lists and route lookup. */
export function visibleLabStars(): LabStar[] { return labStars.filter(star => star.visibility === "show"); }
/** Empty constellations never receive a flag or a drawing. */
export function visibleConstellations() {
  const stars = visibleLabStars();
  return labConstellations.filter(group => stars.some(star => star.constellation === group.id));
}
/** New stars reuse deterministic offsets, then additional bounded rings without slug-specific coordinates. */
export function positionLabStars(stars: LabStar[], isMobile = false): PositionedStar[] {
  const counts: Partial<Record<LabConstellation, number>> = {};
  return stars.map((star, index) => {
    const local = counts[star.constellation] ?? 0;
    counts[star.constellation] = local + 1;
    const centre = isMobile ? [480, 365] : clusterCentres[star.constellation];
    const offset = offsets[local % offsets.length];
    const angle = local * 2.39996;
    const x = local < offsets.length ? offset[0] : Math.cos(angle) * (100 + Math.floor(local / 8) * 24);
    const y = local < offsets.length ? offset[1] : Math.sin(angle) * (90 + Math.floor(local / 8) * 24);
    return { star, index, x: centre[0] + x * (isMobile ? 2.1 : 1), y: centre[1] + y * (isMobile ? 1.4 : 1) };
  });
}
/** Reject unknown or unapproved URL filters while preserving device defaults. */
export function labSignal(value: string | null, isMobile: boolean): LabSignal {
  if (value === "all" || visibleConstellations().some(group => group.id === value)) return value as LabSignal;
  return isMobile ? "ai" : "all";
}
