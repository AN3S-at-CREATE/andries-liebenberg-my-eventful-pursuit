import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TruthBadge } from "./TruthBadge";

interface MetricCardProps {
  label: string;
  value: string;
  basis?: "doc" | "model";
  showBadge?: boolean;
}

export const MetricCard = ({ label, value, basis, showBadge = false }: MetricCardProps) => {
  return (
    <Card interactive glow="cyan" className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        {showBadge && basis && (
          <div className="mt-2">
            <TruthBadge basis={basis} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
