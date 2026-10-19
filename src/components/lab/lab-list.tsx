import { Link } from "react-router-dom";
import { labStatusLabels, type LabConstellation } from "@/data/lab";
import { visibleConstellations, visibleLabStars } from "@/lib/lab-galaxy";
import { EvidenceIcon } from "./evidence-glyph";

export function LabList({ constellation }: { constellation?: LabConstellation }) {
  return <div id="lab-list" className="lab-list divide-y divide-line">
    {visibleConstellations().filter(group => !constellation || group.id === constellation).map(group => <section key={group.id} className="py-5">
      <h2 className="text-label text-ink mb-3">{group.name}</h2>
      <ul className="divide-y divide-line">{visibleLabStars().filter(star => star.constellation === group.id).map(star => <li key={star.slug}>
        <Link to={`/lab/${star.slug}`} className="flex min-h-14 items-start gap-3 py-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-cyan-glow" aria-label={`${star.name}, ${labStatusLabels[star.status]}: ${star.line}`}>
          <EvidenceIcon status={star.status} /><span className="min-w-0"><span className="block font-semibold text-ink">{star.name}</span><span className="block text-sm text-ink-muted mt-1">{star.line}</span><span className="block text-caption text-cyan-glow mt-2">{labStatusLabels[star.status]}</span></span>
        </Link>
      </li>)}</ul>
    </section>)}
  </div>;
}
