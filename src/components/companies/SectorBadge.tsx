import { Badge } from "@/components/ui/badge";

interface SectorBadgeProps {
  sector: string;
}

const sectorColors: Record<string, string> = {
  "Events/Production": "bg-primary/20 text-primary border-primary/30",
  "Projects/Construction": "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "Consulting/Strategy": "bg-chart-4/20 text-chart-4 border-chart-4/30",
  "Retail/Apparel": "bg-secondary/20 text-secondary border-secondary/30",
  "Tourism/Experiences": "bg-chart-5/20 text-chart-5 border-chart-5/30",
  "Industrial/B2B Services": "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/30",
};

export const SectorBadge = ({ sector }: SectorBadgeProps) => {
  const colorClass = sectorColors[sector] || "bg-muted text-muted-foreground";
  
  return (
    <Badge variant="outline" className={`${colorClass} text-xs`}>
      {sector}
    </Badge>
  );
};
