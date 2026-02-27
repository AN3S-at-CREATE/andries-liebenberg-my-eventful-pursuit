import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface GlobalCursorGlowProps {
  color?: "cyan" | "pink" | "mixed";
  size?: number;
  intensity?: number;
}

export const GlobalCursorGlow = ({
  color = "mixed",
  size = 300,
  intensity = 0.15,
}: GlobalCursorGlowProps) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Spring-based smooth cursor following
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  // Transform values calculated unconditionally to satisfy hook rules
  const x1 = useTransform(mouseX, (x) => x - size / 2);
  const y1 = useTransform(mouseY, (y) => y - size / 2);
  const x2 = useTransform(mouseX, (x) => x - (size * 0.4) / 2);
  const y2 = useTransform(mouseY, (y) => y - (size * 0.4) / 2);

  useEffect(() => {
    // Optimization: Skip event listeners on mobile
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY + window.scrollY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  // Optimization: Do not render anything on mobile to save resources
  if (isMobile) return null;

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

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Primary glow */}
      <motion.div
        className={`absolute pointer-events-none rounded-full blur-[80px] ${getGlowColor()}`}
        style={{
          width: size,
          height: size,
          x: x1,
          y: y1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? intensity : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary smaller glow for more intensity at center */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[40px] bg-primary/20"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          x: x2,
          y: y2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? intensity * 1.5 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};
