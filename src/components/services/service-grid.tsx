import { services } from "@/data/services";
import { whatsappLink } from "@/data/facts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Panel } from "@/components/brand/brand-parts";
import brandIcon from "@/design-system/assets/icons/brand-strategy.svg";
import marketingIcon from "@/design-system/assets/icons/experimental-marketing.svg";
import developmentIcon from "@/design-system/assets/icons/web-app-development.svg";
const icons = {"brand-strategy":brandIcon,"experimental-marketing":marketingIcon,"web-app-development":developmentIcon};
export function ServiceGrid() { return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">{services.map(service=><Card key={service.title} variant="glass" className="p-6 flex flex-col h-full border-blue/35"><img src={icons[service.icon]} alt="" width="56" height="56" className="h-icon-tile w-icon-tile mb-5"/><h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3><p className="text-sm text-muted-foreground flex-1 mb-6">{service.description}</p><p className="text-caption text-muted-foreground mb-4">From [AN3S PRICE — leave as placeholder until supplied]</p><Button asChild className="w-full"><a href={whatsappLink(`Hi Andries, I'm interested in ${service.title} for my business.`)} target="_blank" rel="noopener noreferrer" aria-label={`Discuss ${service.title} on WhatsApp`}>WhatsApp</a></Button></Card>)}</div>; }
export function ServicesBlock() { return <Panel label="SERVICES"><ServiceGrid/></Panel>; }
