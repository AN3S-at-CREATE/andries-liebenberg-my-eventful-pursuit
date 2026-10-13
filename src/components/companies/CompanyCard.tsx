import { memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectorBadge } from "./SectorBadge";
import type { Company } from "@/data/companies";
import { ArrowUpRight } from "lucide-react";
export const CompanyCard = memo(({company}:{company:Company})=><Link to={`/companies/${company.slug}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"><Card interactive glow="primary" variant="glass" className="h-full flex flex-col"><CardHeader className="flex-1"><div className="flex items-start justify-between gap-3"><CardTitle className="text-lg text-foreground leading-snug">{company.name}</CardTitle><ArrowUpRight className="h-5 w-5 text-primary shrink-0" aria-hidden="true"/></div>{company.role && <SectorBadge sector={company.sector}/>}</CardHeader>{company.role && <CardContent className="mt-auto space-y-3"><p className="text-sm text-muted-foreground">{company.role}</p></CardContent>}</Card></Link>);
CompanyCard.displayName="CompanyCard";
