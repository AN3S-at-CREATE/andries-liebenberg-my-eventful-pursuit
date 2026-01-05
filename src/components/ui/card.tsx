import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border text-card-foreground shadow-sm transition-all duration-300 ease-out will-change-transform",
  {
    variants: {
      variant: {
        default: "bg-card",
        glass: "bg-card/40 backdrop-blur-xl border-foreground/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        "glass-cyan": "bg-primary/5 backdrop-blur-xl border-primary/20 shadow-[0_8px_32px_0_hsl(var(--primary)/0.1),inset_0_1px_0_0_hsl(var(--primary)/0.1)]",
        "glass-pink": "bg-secondary/5 backdrop-blur-xl border-secondary/20 shadow-[0_8px_32px_0_hsl(var(--secondary)/0.1),inset_0_1px_0_0_hsl(var(--secondary)/0.1)]",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.4)] hover:border-primary/40 cursor-pointer active:translate-y-0 active:scale-100",
        false: "",
      },
      glow: {
        none: "",
        cyan: "hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.5),0_8px_30px_-10px_hsl(var(--primary)/0.3)]",
        pink: "hover:shadow-[0_0_40px_-8px_hsl(var(--secondary)/0.5),0_8px_30px_-10px_hsl(var(--secondary)/0.3)]",
        both: "hover:shadow-[0_0_40px_-8px_hsl(var(--primary)/0.4),0_0_30px_-5px_hsl(var(--secondary)/0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      glow: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, glow, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
