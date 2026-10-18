import type { HTMLAttributes } from "react";
import { MotionStagger } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

/** Equal tracks allow the tallest card to set every card's natural height. */
export function CardGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <MotionStagger {...props} data-card-grid className={cn("grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch", className)} />;
}