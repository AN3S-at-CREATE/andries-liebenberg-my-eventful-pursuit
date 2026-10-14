// The design system's loading mark: the wordmark whose glow breathes, still under prefers-reduced-motion.
import loader from "@/design-system/assets/an3s-loader.svg";
export function LoadingScreen({isLoading}:{isLoading:boolean}){return isLoading?<div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-8" role="status" aria-label="Loading AN3S" aria-busy="true"><img src={loader} alt="AN3S" width="376" height="123" className="w-72 h-auto"/><p className="text-caption text-muted-foreground">Loading…</p></div>:null;}
