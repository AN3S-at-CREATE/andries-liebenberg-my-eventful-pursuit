import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "coming-soon" | "available";
  accentColor: "primary" | "secondary";
  onClick?: () => void;
  children?: React.ReactNode;
}

export function AIToolCard({
  icon: Icon,
  title,
  description,
  status,
  accentColor,
  onClick,
  children,
}: AIToolCardProps) {
  const isClickable = status === "available" && onClick;

  return (
    <div
      className={cn(
        "group relative rounded-xl p-6 transition-all duration-300",
        "hover:-translate-y-1",
        accentColor === "primary" ? "glass-cyan" : "glass-pink",
        accentColor === "primary"
          ? "hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.5)]"
          : "hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.5)]",
        isClickable && "cursor-pointer"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
          accentColor === "primary"
            ? "bg-primary/10 text-primary"
            : "bg-secondary/10 text-secondary"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Title & Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          {title}
        </h3>
        <Badge
          variant={status === "available" ? "glow-cyan" : "glow-pink"}
          className="text-xs shrink-0"
        >
          {status === "available" ? "Available" : "Coming Soon"}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Children (e.g., trigger button) */}
      {children}

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          accentColor === "primary"
            ? "bg-gradient-to-br from-primary/5 to-transparent"
            : "bg-gradient-to-br from-secondary/5 to-transparent"
        )}
      />
    </div>
  );
}
