import { useParams, Link } from "react-router-dom";
import { Seo } from "@/components/seo/Seo";
import { EvidenceIcon } from "@/components/lab/evidence-glyph";
import { labStatusLabels } from "@/data/lab";
import { visibleLabStars } from "@/lib/lab-galaxy";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";

export function LabStar() {
  const { slug } = useParams();
  const star = visibleLabStars().find(item => item.slug === slug);
  if (!star) return <NotFound />;
  return <main id="page-content" className="min-h-screen bg-deep-space pt-28 pb-20 text-ink">
    <Seo path={`/lab/${star.slug}`} title={`${star.name} | AN3S Lab`} description={star.line} />
    <div className="container"><Button asChild variant="ghost" className="mb-10 text-cyan-glow"><Link to="/lab">Back to the galaxy</Link></Button>
      <p className="text-eyebrow text-pink-glow mb-5">AN3S Lab</p><h1 className="text-4xl font-extrabold break-words">{star.name}</h1>
      <div className="flex items-center gap-3 mt-6 text-ink-muted"><EvidenceIcon status={star.status} /><span>{labStatusLabels[star.status]}</span></div>
    </div>
  </main>;
}
