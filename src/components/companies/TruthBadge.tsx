import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TruthBadgeProps {
  basis: "doc" | "model";
}

export const TruthBadge = ({ basis }: TruthBadgeProps) => {
  if (basis === "doc") {
    return (
      <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary text-xs">
        From records
      </Badge>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">
          <Badge variant="outline" className="border-secondary/50 bg-secondary/10 text-secondary text-xs cursor-help">
            Indicative (modelled)
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>Indicative range for presentation; exact financials available on request.</p>
      </TooltipContent>
    </Tooltip>
  );
};
