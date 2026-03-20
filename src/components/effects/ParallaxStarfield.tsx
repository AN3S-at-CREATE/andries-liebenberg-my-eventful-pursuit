import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: "cyan" | "pink" | "white";
  twinkleSpeed: number;
  twinkleOffset: number;
}


// Check if device prefers reduced motion or is mobile
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAR_COLORS = {
  cyan: "rgb(13, 229, 255)",
  pink: "rgb(255, 26, 140)",
  white: "rgb(255, 255, 255)",
} as const;

export function ParallaxStarfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Group stars by color to batch draw calls and avoid state changes
  const starsRef = useRef<Record<keyof typeof STAR_COLORS, Star[]>>({
    cyan: [],
    pink: [],
    white: [],
  });
  const animationRef = useRef<number>();
  const scrollYRef = useRef(0);
  const [isReducedMode, setIsReducedMode] = useState(false);

  const { scrollY } = useScroll();

  // Check for mobile/reduced motion on mount
  useEffect(() => {
    setIsReducedMode(isMobile() || prefersReducedMotion());
    
    const handleResize = () => {
      setIsReducedMode(isMobile() || prefersReducedMotion());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scroll position for parallax
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      scrollYRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      // Use device pixel ratio for crisp rendering, but cap at 1 for mobile
      const dpr = isReducedMode ? 1 : Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * (isReducedMode ? 2 : 3) * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight * (isReducedMode ? 2 : 3)}px`;
    };

    const initStars = () => {
      // Reduce star count significantly on mobile (1/3 of desktop)
      const baseDensity = isReducedMode ? 24000 : 8000;
      const starCount = Math.floor(
        (window.innerWidth * window.innerHeight) / baseDensity
      );

      // Reset grouped stars
      starsRef.current = { cyan: [], pink: [], white: [] };

      for (let i = 0; i < starCount; i++) {
        const colorRand = Math.random();
        let color: "cyan" | "pink" | "white";
        if (colorRand < 0.15) color = "cyan";
        else if (colorRand < 0.25) color = "pink";
        else color = "white";

        starsRef.current[color].push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * (isReducedMode ? 2 : 3),
          size: Math.random() * (isReducedMode ? 1.2 : 1.8) + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          color,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

    };
    let lastFrameTime = 0;
    const targetFPS = isReducedMode ? 30 : 60; // Limit FPS on mobile
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle frame rate on mobile
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = currentTime * 0.001;
      const scrollOffset = scrollYRef.current;
      const canvasHeight = window.innerHeight * (isReducedMode ? 2 : 3);
      const currentFillStyle = "";

      // Batch draw calls by color to optimize performance
      (Object.keys(starsRef.current) as (keyof typeof STAR_COLORS)[]).forEach(
        (color) => {
          const stars = starsRef.current[color];
          if (stars.length === 0) return;

          // Set color once per group to avoid string parsing overhead
          ctx.fillStyle = STAR_COLORS[color];

          stars.forEach((star) => {
            // Skip twinkle calculation on reduced mode for performance
            const twinkle = isReducedMode
              ? 0.85
              : Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 +
                0.7;
            const finalOpacity = star.opacity * twinkle;

            // Parallax offset based on scroll and star's speed
            const parallaxY =
              (star.y - scrollOffset * star.speed) % canvasHeight;
            const adjustedY =
              parallaxY < 0 ? parallaxY + canvasHeight : parallaxY;

            // Only draw stars in visible viewport area
            const viewportY = adjustedY - scrollOffset * 0.1;
            if (viewportY > -50 && viewportY < window.innerHeight + 50) {
              // Star core
              ctx.globalAlpha = finalOpacity;

              if (star.size < 1.5) {
                // Optimization: Use fillRect for small stars to avoid expensive path construction
                ctx.fillRect(
                  star.x - star.size,
                  viewportY - star.size,
                  star.size * 2,
                  star.size * 2
                );
              } else {
                ctx.beginPath();
                ctx.arc(star.x, viewportY, star.size, 0, Math.PI * 2);
                ctx.fill();
              }

              // Skip glow on mobile for performance
              if (!isReducedMode && star.size > 1 && color !== "white") {
                ctx.globalAlpha = finalOpacity * 0.15;
                ctx.beginPath();
                ctx.arc(star.x, viewportY, star.size * 3, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });

        }
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animationRef.current = requestAnimationFrame(animate);

    // Debounce resize for performance
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
        initStars();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReducedMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-20"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
