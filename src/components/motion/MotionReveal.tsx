import type { ReactNode } from "react";
interface MotionProps {children:ReactNode;className?:string;delay?:number;direction?:"up"|"down"|"left"|"right";staggerDelay?:number;lift?:boolean;scale?:boolean;glow?:"primary"|"secondary"|"both";}
export function MotionReveal({children,className=""}:MotionProps){return <div className={className}>{children}</div>;}
export const MotionStagger=MotionReveal;
export const MotionItem=MotionReveal;
export const MotionScale=MotionReveal;
export const MotionHover=MotionReveal;
export const motionConfig={duration:4,staggerDelay:0} as const;
