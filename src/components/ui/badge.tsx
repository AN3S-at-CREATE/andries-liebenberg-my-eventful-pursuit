import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-cyan/40 bg-secondary/15 text-secondary shadow-[0_0_10px_hsl(var(--cyan-hsl)/0.25)] hover:bg-secondary/25",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border/50",
        "glow-primary": "border-pink/50 bg-primary/10 text-primary shadow-[0_0_10px_hsl(var(--pink-hsl)/0.4)]",
        "glow-secondary": "border-cyan/50 bg-secondary/10 text-secondary shadow-[0_0_10px_hsl(var(--cyan-hsl)/0.4)]",
        "selected": "border-cyan/60 bg-secondary/20 text-secondary shadow-[0_0_12px_hsl(var(--cyan-hsl)/0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
