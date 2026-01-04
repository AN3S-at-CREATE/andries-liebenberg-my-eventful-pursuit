import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TruthBadge } from "./TruthBadge";
import { SectorBadge } from "./SectorBadge";
import { formatZARRange, formatPercentage } from "@/lib/formatters";
import type { Company } from "@/data/companies";
import type { CompanyMetric } from "@/data/companyMetrics";
import { ArrowUpRight, TrendingUp, Users, Star } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  metrics: CompanyMetric;
}

export const CompanyCard = ({ company, metrics }: CompanyCardProps) => {
  return (
    <Link to={`/companies/${company.slug}`} className="group block">
      <Card interactive glow="cyan" className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <CardTitle className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
                {company.name}
              </CardTitle>
              <SectorBadge sector={company.sector} />
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue Range</p>
            <p className="font-heading font-semibold text-foreground">
              {formatZARRange(metrics.revenue.from, metrics.revenue.to)}
            </p>
            <TruthBadge basis={metrics.revenue.basis} />
          </div>
          
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <TrendingUp className="h-4 w-4" />
                <span className="font-heading font-bold">{formatPercentage(metrics.revenueGrowthPct)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Growth</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-foreground">
                <Users className="h-4 w-4" />
                <span className="font-heading font-bold">{metrics.clientsAcquired}</span>
              </div>
              <p className="text-xs text-muted-foreground">Clients</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-secondary">
                <Star className="h-4 w-4" />
                <span className="font-heading font-bold">{formatPercentage(metrics.customerSatisfactionPct)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
