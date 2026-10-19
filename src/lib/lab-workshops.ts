import { labStars, type LabStar } from "@/data/lab";

/** Workshop entries share the galaxy visibility gate and require public repository evidence. */
export function visibleLabWorkshops(): LabStar[] {
  return labStars.filter(star => star.visibility === "show" && star.status === "built" && star.sourceUrl?.startsWith("https://github.com/"));
}
/** Unknown and approval-gated repository slugs never resolve. */
export function findLabWorkshop(slug?: string) {
  return visibleLabWorkshops().find(star => star.slug === slug);
}
/** Legacy workshop navigation wraps within the documented collection. */
export function nextLabWorkshop(workshop: LabStar) {
  const rooms = visibleLabWorkshops();
  return rooms[(rooms.findIndex(room => room.slug === workshop.slug) + 1) % rooms.length];
}
