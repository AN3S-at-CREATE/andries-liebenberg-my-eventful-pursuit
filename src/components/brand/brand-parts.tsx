import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
/** Unframed brand band composed exclusively from the exported AN3S tokens. */
export function Panel({label,children,tone="services"}:{label:string;children:ReactNode;tone?:"services"|"awards"}) {
 return <section className={cn("border-y bg-panel/70 px-4 py-16",tone==="services"?"border-blue/35":"border-pink/35")}><div className="container max-w-6xl"><h2 className="text-label text-foreground mb-8">{label}</h2>{children}</div></section>;
}
export function GradientText({children}:{children:ReactNode}) { return <span className="bg-gradient-glow bg-clip-text text-transparent">{children}</span>; }
