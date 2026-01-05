import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number; // Parallax speed multiplier
  color: "cyan" | "pink" | "white";
  twinkleSpeed: number;
  twinkleOffset: number;
}

export function ParallaxStarfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const scrollYRef = useRef(0);

  const { scrollY } = useScroll();
  
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Taller for scroll
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        const colorRand = Math.random();
        let color: "cyan" | "pink" | "white";
        if (colorRand < 0.15) color = "cyan";
        else if (colorRand < 0.25) color = "pink";
        else color = "white";

        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.5 + 0.1, // Different parallax speeds for depth
          color,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const getStarColor = (star: Star, opacity: number): string => {
      switch (star.color) {
        case "cyan":
          return `rgba(13, 229, 255, ${opacity})`;
        case "pink":
          return `rgba(255, 26, 140, ${opacity})`;
        default:
          return `rgba(255, 255, 255, ${opacity})`;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const scrollOffset = scrollYRef.current;

      starsRef.current.forEach((star) => {
        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const finalOpacity = star.opacity * twinkle;

        // Parallax offset based on scroll and star's speed
        const parallaxY = (star.y - scrollOffset * star.speed) % canvas.height;
        const adjustedY = parallaxY < 0 ? parallaxY + canvas.height : parallaxY;

        // Only draw stars in visible viewport area
        const viewportY = adjustedY - scrollOffset * 0.1;
        if (viewportY > -100 && viewportY < window.innerHeight + 100) {
          // Star core
          ctx.beginPath();
          ctx.arc(star.x, viewportY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = getStarColor(star, finalOpacity);
          ctx.fill();

          // Glow for larger/brighter stars
          if (star.size > 1 && star.color !== "white") {
            ctx.beginPath();
            ctx.arc(star.x, viewportY, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = getStarColor(star, finalOpacity * 0.15);
            ctx.fill();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
