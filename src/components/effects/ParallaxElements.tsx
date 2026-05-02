import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ParallaxElementsProps {
  variant?: "cyan" | "pink" | "mixed";
}

// Check if device is mobile or prefers reduced motion
const checkReducedMode = () => {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

export function ParallaxElements({ variant = "mixed" }: ParallaxElementsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReducedMode, setIsReducedMode] = useState(false);

  useEffect(() => {
    setIsReducedMode(checkReducedMode());
    
    // 🚀 Optimizer: Debounce window resize to prevent layout thrashing
    let resizeTimeout: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setIsReducedMode(checkReducedMode());
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduced parallax distances on mobile for smoother performance
  const multiplier = isReducedMode ? 0.4 : 1;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150 * multiplier]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80 * multiplier]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200 * multiplier]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -120 * multiplier]);

  const cyanGlow = "hsl(var(--primary) / 0.15)";
  const pinkGlow = "hsl(var(--secondary) / 0.15)";

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Large blurred orb - top right */}
      <motion.div
        style={{ y: isReducedMode ? 0 : y1, willChange: "transform" }}
        className={`absolute -top-32 -right-32 rounded-full ${
          isReducedMode ? "w-64 h-64 blur-2xl" : "w-96 h-96 blur-3xl"
        } opacity-40`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: variant === "pink" ? pinkGlow : cyanGlow,
            boxShadow: isReducedMode 
              ? undefined 
              : `0 0 120px 60px ${variant === "pink" ? pinkGlow : cyanGlow}`,
          }}
        />
      </motion.div>

      {/* Medium orb - left side */}
      <motion.div
        style={{ y: isReducedMode ? 0 : y2, willChange: "transform" }}
        className={`absolute top-1/4 -left-24 rounded-full ${
          isReducedMode ? "w-48 h-48 blur-2xl" : "w-64 h-64 blur-3xl"
        } opacity-30`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: variant === "cyan" ? cyanGlow : pinkGlow,
            boxShadow: isReducedMode 
              ? undefined 
              : `0 0 100px 50px ${variant === "cyan" ? cyanGlow : pinkGlow}`,
          }}
        />
      </motion.div>

      {/* Small accent orb - center right (hidden on mobile for performance) */}
      {!isReducedMode && (
        <motion.div
          style={{ y: y3, willChange: "transform" }}
          className="absolute top-1/2 right-16 w-48 h-48 rounded-full blur-2xl opacity-25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: cyanGlow,
              boxShadow: `0 0 80px 40px ${cyanGlow}`,
            }}
          />
        </motion.div>
      )}

      {/* Bottom left glow (hidden on mobile for performance) */}
      {!isReducedMode && (
        <motion.div
          style={{ y: y4, willChange: "transform" }}
          className="absolute bottom-32 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: pinkGlow,
              boxShadow: `0 0 100px 50px ${pinkGlow}`,
            }}
          />
        </motion.div>
      )}

      {/* Floating grid lines (hidden on mobile) */}
      {!isReducedMode && (
        <>
          <motion.div
            style={{ y: y2 }}
            className="absolute top-20 left-1/4 w-px h-64 opacity-10"
          >
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${cyanGlow}, transparent)`,
              }}
            />
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            className="absolute top-40 right-1/3 w-px h-48 opacity-10"
          >
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${pinkGlow}, transparent)`,
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
