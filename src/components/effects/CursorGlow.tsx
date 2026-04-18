import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface CursorGlowProps {
  containerRef: React.RefObject<HTMLElement>;
  color?: "cyan" | "pink" | "mixed";
  size?: number;
  intensity?: number;
}

export const CursorGlow = ({
  containerRef,
  color = "mixed",
  size = 300,
  intensity = 0.15,
}: CursorGlowProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Spring-based smooth cursor following
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  // Transform for smooth opacity
  const glowOpacity = useTransform(
    [mouseX, mouseY],
    () => (isHovering ? intensity : 0)
  );

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 🚀 Optimizer: Debounce mousemove events to prevent main thread blocking
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          mouseX.set(x);
          mouseY.set(y);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY, isMobile]);

  const getGlowColor = () => {
    switch (color) {
      case "cyan":
        return "bg-primary/30";
      case "pink":
        return "bg-secondary/30";
      case "mixed":
      default:
        return "bg-gradient-radial from-primary/25 via-secondary/15 to-transparent";
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Primary glow */}
      <motion.div
        ref={glowRef}
        className={`absolute pointer-events-none rounded-full blur-[80px] z-20 ${getGlowColor()}`}
        style={{
          width: size,
          height: size,
          x: mouseX,
          y: mouseY,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: isHovering ? intensity : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary smaller glow for more intensity at center */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[40px] bg-primary/20 z-20"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          x: mouseX,
          y: mouseY,
          marginLeft: -(size * 0.4) / 2,
          marginTop: -(size * 0.4) / 2,
          opacity: isHovering ? intensity * 1.5 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
