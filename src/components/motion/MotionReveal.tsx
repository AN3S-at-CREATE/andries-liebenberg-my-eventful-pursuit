import { Children, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
interface MotionProps extends HTMLAttributes<HTMLDivElement> { children?: ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right"; staggerDelay?: number; lift?: boolean; scale?: boolean; glow?: "primary" | "secondary" | "both"; }

function useOneShot() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setIsVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}
export function MotionReveal({ children, className = "" }: MotionProps) {
  const { ref, isVisible } = useOneShot();
  return <div ref={ref} className={`scroll-reveal ${isVisible ? "is-visible" : ""} ${className}`}>{children}</div>;
}
/** CSS child indices avoid extra wrappers and preserve stretching grid tracks. */
export function MotionStagger({ children, className = "", ...props }: MotionProps) {
  const { ref, isVisible } = useOneShot();
  return <div {...props} ref={ref} className={`motion-stagger ${isVisible ? "is-visible" : ""} ${className}`}>
    {Children.toArray(children)}
  </div>;
}
export function MotionItem({ children, className = "", ...props }: MotionProps) {
  return <div {...props} className={`motion-item ${className}`}>{children}</div>;
}
export const MotionScale = MotionReveal;
export const MotionHover = MotionReveal;
export const motionConfig = { duration: motionTokens.slow, staggerDelay: motionTokens.stagger } as const;
