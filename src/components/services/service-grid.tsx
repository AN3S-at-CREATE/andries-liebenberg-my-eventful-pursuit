import { useState } from "react";
import { services } from "@/data/services";
import { disciplines } from "@/data/disciplines";
import { whatsappLink } from "@/data/facts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared/section";
import { CardGrid } from "@/components/shared/card-grid";
import { MotionItem } from "@/components/motion/MotionReveal";

export function ServiceGrid() {
  const [selected, setSelected] = useState<string | null>(null);
  const offers = services.filter(service => !selected || service.discipline === selected);
  return <div className="space-y-8">
    <div role="group" aria-label="Filter services by discipline" className="flex flex-wrap gap-2 border-y border-border py-4">
      {disciplines.map(discipline => <Button key={discipline.title} variant={selected === discipline.title ? "secondary" : "ghost"} aria-pressed={selected === discipline.title} onClick={() => setSelected(selected === discipline.title ? null : discipline.title)} className="h-auto min-h-10 whitespace-normal text-left justify-start text-sm">
        <img src={discipline.icon} alt="" width="24" height="24" className="w-6 h-6" />{discipline.title}
      </Button>)}
    </div>
    <CardGrid>{offers.map(service => {
      const discipline = disciplines.find(item => item.title === service.discipline);
      return <MotionItem key={service.title} className="h-full"><Card variant="glass" interactive className="p-6 flex flex-col h-full" data-service-card>
        {discipline && <img src={discipline.icon} alt="" width="56" height="56" className="h-icon-tile w-icon-tile mb-5" />}
        <p className="text-caption text-secondary mb-3">{service.discipline}</p>
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 min-h-14 mb-3">{service.title}</h3>
        <p className="text-sm text-muted-foreground min-h-10 mb-6">{service.description}</p>
        <p className="text-2xl font-semibold text-foreground leading-snug min-h-28 mb-2">{service.price}</p>
        <p className="text-caption text-muted-foreground mb-6">{service.vat}</p>
        <Button asChild className="w-full mt-auto"><a href={whatsappLink(`Hi Andries, I'm interested in ${service.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Discuss ${service.title} on WhatsApp`}>WhatsApp</a></Button>
      </Card></MotionItem>;
    })}</CardGrid>
    {offers.length === 0 && selected && <div className="py-8 text-center space-y-3" role="status">
      <p className="text-lg font-semibold text-foreground">No listed offers in {selected}</p>
      <p className="text-body text-muted-foreground max-w-xl mx-auto">Andries does not publish fixed prices in this discipline yet. Ask what is possible and he will suggest a starting point.</p>
      <Button asChild><a href={whatsappLink(`Hi Andries, I'm interested in your ${selected} services.`)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${selected} on WhatsApp`}>Ask on WhatsApp</a></Button>
    </div>}
  </div>;
}
export function ServicesBlock() { return <Section eyebrow="SERVICES" className="border-y border-border bg-panel/70"><ServiceGrid /></Section>; }
