import { Card } from "@/components/ui/card";
import { CardGrid } from "@/components/shared/card-grid";
import { MotionItem } from "@/components/motion/MotionReveal";
import { proofOfWork } from "@/data/facts";

export function ProofCard({ value, source }: { value: string; source: string }) {
  return <Card variant="glass" className="p-6 h-full flex flex-col" data-proof-card>
    <p className="text-body text-foreground flex-1">{value}</p>
    <p className="text-caption text-secondary mt-6">{source}</p>
  </Card>;
}

export function ProofCards() {
  return <div className="py-12">
    <p className="text-label text-secondary mb-4">Proof of work</p>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{proofOfWork.title}</h2>
    <CardGrid>{proofOfWork.items.map(item => <MotionItem key={item.value} className="h-full"><ProofCard {...item} /></MotionItem>)}</CardGrid>
  </div>;
}