import { labDemos, type LabStar } from "@/data/lab";
import { labDemoIds, type LabResult } from "@/lib/lab-demo";
import { visibleLabStars } from "@/lib/lab-galaxy";
export const roomTabLabels = { what: "What it is", how: "How it works", try: "Try it", build: "Build it" };
export type RoomTab = keyof typeof roomTabLabels;
/** Room access and navigation share the same approval gate as the sky. */
export function findLabRoom(slug?: string) { return visibleLabStars().find(star => star.slug === slug); }
/** A demo ID, including live/static modules, is the sole Try it gate. */
export function roomTabs(star: LabStar): RoomTab[] { return star.demoId ? ["what", "how", "try", "build"] : ["what", "how", "build"]; }
export function selectedRoomTab(star: LabStar, value: string | null): RoomTab {
  const tabs = roomTabs(star); return tabs.includes(value as RoomTab) ? value as RoomTab : star.demoId ? "try" : "what";
}
/** Next wraps within visible siblings, not across approval boundaries. */
export function nextLabStar(star: LabStar) {
  const siblings = visibleLabStars().filter(item => item.constellation === star.constellation);
  return siblings[(siblings.findIndex(item => item.slug === star.slug) + 1) % siblings.length];
}
export function isInteractiveDemo(id: string): id is typeof labDemoIds[number] { return labDemoIds.some(demo => demo === id); }
/** Replay artefacts retain structured rendering; the UI always labels the replay. */
export function labReplay(id: string): LabResult {
  const replay = labDemos[id].replay;
  return replay.artefact ? { artefact: replay.artefact } : { message: replay.assistant };
}
/** Bounded, transient handoff avoids encoding event content into URLs or storage. */
export function workflowBrief(artefact: Record<string, unknown>): string { return `Plan an automation for this event brief: ${JSON.stringify(artefact)}`.slice(0, 500); }
