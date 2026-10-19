import { Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { EvidenceIcon } from "@/components/lab/evidence-glyph";
import { labConstellations, labStatusLabels } from "@/data/lab";
import { labWorkshopCount } from "@/data/lab";
import { visibleLabWorkshops } from "@/lib/lab-workshops";

export function LabWorkshop() {
  const workshops = visibleLabWorkshops();
  return <main id="page-content" className="min-h-screen bg-deep-space text-ink px-5 py-8 pb-28">
    <Seo path="/lab/workshop" title="In the workshop | AN3S Lab" description="Documented public AN3S repositories, with source-linked rooms explaining their purpose, implementation and limits." />
    <div className="max-w-5xl mx-auto">
      <nav aria-label="Breadcrumb" className="text-caption text-ink-muted mb-8"><Link to="/lab" className="text-cyan-glow min-h-11 inline-flex items-center focus-visible:ring-2 focus-visible:ring-ring">Lab</Link> / Workshop</nav>
      <p className="text-eyebrow text-pink-glow mb-4">AN3S Lab</p>
      <h1 className="text-3xl font-extrabold mb-5">In the workshop</h1>
      <p className="text-cyan-glow mb-3">{labWorkshopCount} documented public repositories</p>
      <p className="text-sm text-ink-muted leading-relaxed max-w-2xl mb-8">Each room links to the public documentation behind it. Repository code is not a claim that a project is live, production-ready or running on this site.</p>
      {workshops.length === 0 ? <p className="text-ink-muted py-8">No workshop repositories are documented here yet.</p> : <ul className="divide-y divide-line">
        {workshops.map(workshop => <li key={workshop.slug}><Link to={`/lab/${workshop.slug}`} className="flex items-start gap-4 py-6 min-h-14 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-cyan-glow">
          <EvidenceIcon status={workshop.status} /><div className="min-w-0"><h2 className="font-semibold text-ink">{workshop.name}</h2><p className="text-sm text-ink-muted mt-2 leading-relaxed">{workshop.line}</p><p className="text-caption text-cyan-glow mt-3">{labConstellations.find(group => group.id === workshop.constellation)?.name} · {labStatusLabels[workshop.status]}</p><p className="text-caption text-ink-muted mt-2 break-all">{workshop.sourceUrl?.replace("https://github.com/", "")}</p></div>
        </Link></li>)}
      </ul>}
      <Button asChild variant="outline" className="mt-8 min-h-11"><Link to="/lab">Back to the galaxy</Link></Button>
    </div>
  </main>;
}
