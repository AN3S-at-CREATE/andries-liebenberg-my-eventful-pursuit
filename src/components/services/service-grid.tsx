import { services } from "@/data/services";
import { disciplines } from "@/data/disciplines";
import { whatsappLink } from "@/data/facts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Panel } from "@/components/brand/brand-parts";
export function ServiceGrid() {
  return <div className="space-y-8">{disciplines.map(discipline => {
    const offers = services.filter(service => service.discipline === discipline.title);
    return <div key={discipline.title}>
      <h3 className="text-lg font-semibold text-foreground mb-6">{discipline.title}</h3>
      {offers.length > 0 && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        {offers.map(service => <Card key={service.title} variant="glass" className="p-6 flex flex-col h-full border-blue/35">
          <img src={discipline.icon} alt="" width="56" height="56" className="h-icon-tile w-icon-tile mb-5"/>
          <h4 className="text-lg font-semibold text-foreground mb-3">{service.title}</h4>
          <p className="text-caption text-muted-foreground flex-1 mb-4">{service.price} {service.vat}</p>
          <Button asChild className="w-full mt-auto"><a href={whatsappLink(`Hi Andries, I'm interested in ${service.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Discuss ${service.title} on WhatsApp`}>WhatsApp</a></Button>
        </Card>)}
      </div>}
    </div>;
  })}</div>;
}
export function ServicesBlock() { return <Panel label="SERVICES"><ServiceGrid/></Panel>; }
