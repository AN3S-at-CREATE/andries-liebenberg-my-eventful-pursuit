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
        "group relative flex flex-col h-full rounded-xl p-6 transition-all duration-300",
        "hover:-translate-y-1",
        accentColor === "primary" ? "glass-cyan" : "glass-pink",
        accentColor === "primary"
          ? "hover:shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.5)]"
          : "hover:shadow-[0_8px_30px_-10px_hsl(var(--secondary)/0.5)]",
        isClickable && "cursor-pointer"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Main content area — grows to match the tallest card */}
      <div className="flex-1">
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

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer — status badge and actions align at the bottom */}
      <div className="mt-auto flex flex-col gap-3">
        <div className="flex justify-end">
          <Badge
            variant={status === "available" ? "glow-cyan" : "glow-pink"}
            className="text-xs shrink-0"
          >
            {status === "available" ? "Available" : "Coming Soon"}
          </Badge>
        </div>
        {children}
      </div>

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
