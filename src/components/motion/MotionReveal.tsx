import { useEffect, useRef, useState, type ReactNode } from "react";
interface MotionProps {children:ReactNode;className?:string;delay?:number;direction?:"up"|"down"|"left"|"right";staggerDelay?:number;lift?:boolean;scale?:boolean;glow?:"primary"|"secondary"|"both";}
export function MotionReveal({children,className=""}:MotionProps){
  const ref=useRef<HTMLDivElement>(null);
  const [isVisible,setIsVisible]=useState(false);
  useEffect(()=>{
    const element=ref.current;
    if(!element || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches){setIsVisible(true);return;}
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setIsVisible(true);observer.disconnect();}},{threshold:0.08});
    observer.observe(element);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`scroll-reveal ${isVisible?"is-visible":""} ${className}`}>{children}</div>;
}
export function MotionStagger({children,className=""}:MotionProps){return <div className={className}>{children}</div>;}
export const MotionItem=MotionReveal;
export const MotionScale=MotionReveal;
export const MotionHover=MotionReveal;
export const motionConfig={duration:0.5,staggerDelay:0} as const;
