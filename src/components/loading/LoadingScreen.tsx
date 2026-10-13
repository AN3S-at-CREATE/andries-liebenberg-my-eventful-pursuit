import logo from "@/design-system/assets/an3s-wordmark.png";
import { Loader2 } from "lucide-react";
export function LoadingScreen({isLoading}:{isLoading:boolean}){return isLoading?<div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-8" role="status" aria-label="Loading AN3S" aria-busy="true"><img src={logo} alt="AN3S" width="284" height="96" className="w-72 h-auto"/><Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true"/><p className="text-caption text-muted-foreground">Loading…</p></div>:null;}
