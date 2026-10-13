import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";
/** Unframed brand band composed exclusively from the exported AN3S tokens. */
export function Panel({label,children,tone="services"}:{label:string;children:ReactNode;tone?:"services"|"awards"}) {
 return <Section eyebrow={label} className={cn("border-y bg-panel/70",tone==="services"?"border-blue/35":"border-pink/35")}>{children}</Section>;
}
export function GradientText({children}:{children:ReactNode}) { return <span className="bg-gradient-glow bg-clip-text text-transparent">{children}</span>; }
