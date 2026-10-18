import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { MotionStagger } from "@/components/motion/MotionStagger";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
}

/** Shared unframed page band; optional headings preserve existing page copy. */
export function Section({ eyebrow, title, lead, children, className, ...props }: SectionProps) {
  return <section {...props} className={cn("px-4 py-20 md:py-28", className)}>
    <div className="container max-w-6xl">
      {(eyebrow || title || lead) && <MotionStagger className="mb-12">
        {eyebrow && <p className="text-label text-secondary mb-4">{eyebrow}</p>}
        {title && <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">{title}</h2>}
        {lead && <p className="section-lead text-body text-muted-foreground max-w-2xl">{lead}</p>}
      </MotionStagger>}
      {children}
    </div>
  </section>;
}