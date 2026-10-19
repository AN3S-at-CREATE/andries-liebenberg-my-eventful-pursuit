import { labWorkshops } from "@/data/lab-workshops";
import type { LabWorkshop } from "@/data/lab-workshops";

/** The index, count and room resolver use the same public documentation gate. */
export function visibleLabWorkshops(): LabWorkshop[] {
  return labWorkshops.filter(workshop => workshop.visibility === "show");
}
/** Unknown and approval-gated workshop slugs never resolve to a room. */
export function findLabWorkshop(slug?: string) {
  return visibleLabWorkshops().find(workshop => workshop.slug === slug);
}
/** Workshop navigation wraps within its collection without altering galaxy navigation. */
export function nextLabWorkshop(workshop: LabWorkshop) {
  const rooms = visibleLabWorkshops();
  return rooms[(rooms.findIndex(room => room.slug === workshop.slug) + 1) % rooms.length];
}
