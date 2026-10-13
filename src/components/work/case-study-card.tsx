import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CaseStudyCardProps {
  title: string;
  role: string;
  built: string;
  proof?: string;
  image?: string;
  href: string;
}

export function CaseStudyCard({ title, role, built, proof, image, href }: CaseStudyCardProps) {
  return <Card variant="glass" interactive glow="primary" className="h-full flex flex-col overflow-hidden" data-work-card>
    {image ? <img src={image} alt="Event production by Andries, 360 Vision Events" width="1485" height="768" className="aspect-video w-full object-cover" loading="lazy" />
      : <div className="aspect-video bg-gradient-space flex items-center p-6 border-b border-border"><p className="text-label text-secondary">{title}</p></div>}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-foreground line-clamp-2 min-h-14 mb-4">{title}</h3>
      <p className="text-sm text-secondary min-h-16 mb-3">{role}</p>
      <p className="text-body text-muted-foreground mb-6">{built}</p>
      {proof && <p className="text-sm text-foreground border-t border-border pt-4 mb-6">{proof}</p>}
      <Button asChild variant="outline" className="mt-auto w-full"><Link to={href}>View work</Link></Button>
    </div>
  </Card>;
}