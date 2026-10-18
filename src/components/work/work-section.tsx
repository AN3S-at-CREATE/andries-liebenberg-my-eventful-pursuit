import { Section } from "@/components/shared/section";
import { CardGrid } from "@/components/shared/card-grid";
import { MotionItem } from "@/components/motion/MotionReveal";
import { ventureFacts, proofOfWork } from "@/data/facts";
import { CaseStudyCard } from "./case-study-card";
import { ProofCard, ProofCards } from "./proof-card";

/** Missing project evidence is omitted rather than attaching unrelated CV proof. */
export function WorkSection({ includeProof = false }: { includeProof?: boolean }) {
  return <Section eyebrow="WORK" title="Selected work">
    <CardGrid>
      <MotionItem className="h-full"><CaseStudyCard title="Event production at 360 Vision Events" role={ventureFacts["360-vision-events-group"].role} built="Event production by Andries, 360 Vision Events" image="/media/events/event-production-04.webp" href="/showcase" /></MotionItem>
      <MotionItem className="h-full"><CaseStudyCard title={ventureFacts["lynkie-sky-ai"].name} role={ventureFacts["lynkie-sky-ai"].role} built="Lynkie Sky AI" image="/media/lynkie-sky/lynkie-logo-blue.webp" href="/ai/lynkie-sky" /></MotionItem>
      <MotionItem className="h-full"><CaseStudyCard title={ventureFacts["eventpulse-ai"].name} role={ventureFacts["eventpulse-ai"].role} built="EventPulse AI" href="/ai/eventpulse" /></MotionItem>
      <MotionItem className="h-full"><CaseStudyCard title="3D visualisation" role="3D stage and venue renders by Andries Liebenberg" built="3D stage and venue renders" image="/media/renders/render-stage-07.webp" href="/expertise/events-management" /></MotionItem>
    </CardGrid>
    {includeProof && <><p className="text-body text-secondary mt-16">{ventureFacts["veralogix-group"].role}</p><ProofCards /></>}
    {!includeProof && <div className="mt-12"><p className="text-label text-secondary mb-4">{proofOfWork.title}</p><ProofCard {...proofOfWork.items[0]} /></div>}
  </Section>;
}