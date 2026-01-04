import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TruthBadge } from "./TruthBadge";

interface MetricCardProps {
  label: string;
  value: string;
  basis?: "doc" | "model";
  showBadge?: boolean;
  glowColor?: "cyan" | "pink";
}

export const MetricCard = ({ label, value, basis, showBadge = false, glowColor = "cyan" }: MetricCardProps) => {
  const glowClass = glowColor === "pink" ? "border-glow-pink-hover" : "border-glow-hover";
  
  return (
    <Card interactive glow={glowColor} className={`bg-card/50 backdrop-blur-sm border-border/50 ${glowClass}`}>
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
