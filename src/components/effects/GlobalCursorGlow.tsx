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
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Spring-based smooth cursor following
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  // Unconditionally call useTransform at the top level
  // This avoids conditional hook issues when we early return for mobile
  const primaryX = useTransform(mouseX, (x) => x - size / 2);
  const primaryY = useTransform(mouseY, (y) => y - size / 2);

  const secondaryX = useTransform(mouseX, (x) => x - (size * 0.4) / 2);
  const secondaryY = useTransform(mouseY, (y) => y - (size * 0.4) / 2);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      // Removed window.scrollY because we are using 'fixed inset-0'
      // The fixed container already tracks the viewport, so clientY is correct
      mouseY.set(e.clientY);
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
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Primary glow */}
      <motion.div
        className={`absolute pointer-events-none rounded-full blur-[80px] ${getGlowColor()}`}
        style={{
          width: size,
          height: size,
          x: primaryX,
          y: primaryY,
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
          x: secondaryX,
          y: secondaryY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? intensity * 1.5 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};
