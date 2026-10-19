import type { LabStatus } from "@/data/lab";

const ringClasses: Record<LabStatus, string> = {
  live: "stroke-success fill-success", demo: "stroke-cyan fill-cyan", built: "stroke-blue fill-ink",
  concept: "stroke-ink-muted fill-ink-muted", explainer: "stroke-ink-muted fill-ink-muted", venture: "stroke-pink fill-pink",
};
/** The source-backed status controls the glyph; visible words always accompany its use. */
export function EvidenceGlyph({ status, radius = 8 }: { status: LabStatus; radius?: number }) {
  return <g aria-hidden="true" className={ringClasses[status]}>
    <circle r={radius} fill="none" strokeWidth={status === "explainer" ? 0.7 : 1} strokeDasharray={status === "concept" ? "3 3" : undefined} opacity={status === "venture" ? 0.6 : 1} />
    {status === "built" && <circle r={radius + 4} fill="none" strokeWidth="0.7" />}
    <circle r="2.8" stroke="none" className={status === "built" ? "fill-ink" : ""} />
  </g>;
}
export function EvidenceIcon({ status }: { status: LabStatus }) {
  return <svg viewBox="-16 -16 32 32" className="h-7 w-7 shrink-0" aria-hidden="true"><EvidenceGlyph status={status} /></svg>;
}
