import { useEffect, useRef } from "react";
import { setBackgroundFXMounted } from "@/lib/backgroundStatus";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

// Pre-defined colors for batch rendering
const CYAN_COLOR = "rgb(13, 229, 255)";
const PINK_COLOR = "rgb(255, 26, 140)";

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // Group particles by color to minimize state changes
  const particlesRef = useRef<{ cyan: Particle[]; pink: Particle[] }>({
    cyan: [],
    pink: [],
  });

  useEffect(() => {
    setBackgroundFXMounted(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create noise pattern once
    let noisePattern: CanvasPattern | null = null;
    try {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = 256;
      noiseCanvas.height = 256;
      const nCtx = noiseCanvas.getContext('2d');
      if (nCtx) {
        const imageData = nCtx.createImageData(256, 256);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = Math.random();
          if (r < 0.25) {
            // White, low opacity
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 4; // ~1.5%
          } else if (r < 0.5) {
            // Black, low opacity
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 8; // ~3%
          } else {
            data[i + 3] = 0; // Transparent
          }
        }
        nCtx.putImageData(imageData, 0, 0);
        noisePattern = ctx.createPattern(noiseCanvas, 'repeat');
      }
    } catch (e) {
      console.error("Failed to create noise pattern", e);
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      // Reset groups
      particlesRef.current = { cyan: [], pink: [] };

      for (let i = 0; i < particleCount; i++) {
        const isCyan = Math.random() > 0.4;
        const particle: Particle = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.15,
        };

        if (isCyan) {
          particlesRef.current.cyan.push(particle);
        } else {
          particlesRef.current.pink.push(particle);
        }
      }
    };

    const drawGrid = () => {
      const horizonY = canvas.height * 0.65;
      const gridLines = 25;
      const vanishingPointX = canvas.width / 2;

      ctx.strokeStyle = "rgba(13, 229, 255, 0.06)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= gridLines; i++) {
        const progress = i / gridLines;
        const y = horizonY + (canvas.height - horizonY) * Math.pow(progress, 1.5);
        const spread = 1 + progress * 2.5;

        ctx.beginPath();
        ctx.moveTo(vanishingPointX - (canvas.width * spread) / 2, y);
        ctx.lineTo(vanishingPointX + (canvas.width * spread) / 2, y);
        ctx.stroke();
      }

      const verticalLines = 35;
      for (let i = -verticalLines / 2; i <= verticalLines / 2; i++) {
        const baseX = vanishingPointX + i * (canvas.width / verticalLines) * 3;
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, horizonY);
        ctx.lineTo(baseX, canvas.height);
        ctx.stroke();
      }

      const horizonGradient = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY + 60);
      horizonGradient.addColorStop(0, "rgba(13, 229, 255, 0)");
      horizonGradient.addColorStop(0.5, "rgba(13, 229, 255, 0.08)");
      horizonGradient.addColorStop(1, "rgba(13, 229, 255, 0)");
      ctx.fillStyle = horizonGradient;
      ctx.fillRect(0, horizonY - 60, canvas.width, 120);

      const bottomGradient = ctx.createLinearGradient(0, canvas.height - 150, 0, canvas.height);
      bottomGradient.addColorStop(0, "rgba(255, 26, 140, 0)");
      bottomGradient.addColorStop(0.5, "rgba(255, 26, 140, 0.04)");
      bottomGradient.addColorStop(1, "rgba(255, 26, 140, 0.02)");
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, canvas.height - 150, canvas.width, 150);
    };

    const drawParticles = () => {
      const processParticle = (particle: Particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      };

      const drawGroup = (particles: Particle[], color: string) => {
        if (particles.length === 0) return;

        ctx.fillStyle = color;

        particles.forEach(particle => {
          processParticle(particle);

          // Draw core
          ctx.globalAlpha = particle.opacity;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw glow
          ctx.globalAlpha = particle.opacity * 0.15;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      // Batch draw calls by color to optimize performance
      // Avoiding string concatenation in the loop reduces GC pressure significantly
      drawGroup(particlesRef.current.cyan, CYAN_COLOR);
      drawGroup(particlesRef.current.pink, PINK_COLOR);

      // Reset globalAlpha for other drawings
      ctx.globalAlpha = 1;
    };

    const drawNoise = () => {
      if (!noisePattern) return;

      // Use efficient pattern tiling instead of pixel manipulation
      ctx.save();
      // Random offset to simulate static
      ctx.translate(Math.random() * 100, Math.random() * 100);
      ctx.fillStyle = noisePattern;
      // Draw slightly larger to cover random offset
      ctx.fillRect(-100, -100, canvas.width + 100, canvas.height + 100);
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = "hsl(223, 24%, 6%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawParticles();

      // Maintain original 8% probability for the glitch/noise effect
      if (Math.random() < 0.08) {
        drawNoise();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      setBackgroundFXMounted(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ background: "hsl(223, 24%, 6%)" }}
      />
      
      {/* Cyan neon streak from left */}
      <div 
        className="fixed top-1/4 -left-32 w-96 h-[600px] bg-primary/15 blur-[150px] -rotate-12 pointer-events-none -z-10 animate-pulse-slow"
      />
      
      {/* Pink neon streak from right */}
      <div 
        className="fixed bottom-1/4 -right-32 w-80 h-[500px] bg-secondary/15 blur-[120px] rotate-12 pointer-events-none -z-10 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
    </>
  );
}
