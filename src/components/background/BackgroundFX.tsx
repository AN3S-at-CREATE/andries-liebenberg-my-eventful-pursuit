import { useEffect, useRef } from "react";
import { setBackgroundFXMounted } from "@/lib/backgroundStatus";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

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

    // Colors from design system
    const cyanColor = "13, 229, 255";
    const pinkColor = "255, 26, 140";

    let gridCanvas: HTMLCanvasElement | null = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Cache the static grid
      gridCanvas = document.createElement('canvas');
      gridCanvas.width = canvas.width;
      gridCanvas.height = canvas.height;
      const gCtx = gridCanvas.getContext('2d');
      if (gCtx) {
        const horizonY = gridCanvas.height * 0.65;
        const gridLines = 25;
        const vanishingPointX = gridCanvas.width / 2;

        gCtx.strokeStyle = "rgba(13, 229, 255, 0.06)";
        gCtx.lineWidth = 1;

        for (let i = 0; i <= gridLines; i++) {
          const progress = i / gridLines;
          const y = horizonY + (gridCanvas.height - horizonY) * Math.pow(progress, 1.5);
          const spread = 1 + progress * 2.5;

          gCtx.beginPath();
          gCtx.moveTo(vanishingPointX - (gridCanvas.width * spread) / 2, y);
          gCtx.lineTo(vanishingPointX + (gridCanvas.width * spread) / 2, y);
          gCtx.stroke();
        }

        const verticalLines = 35;
        for (let i = -verticalLines / 2; i <= verticalLines / 2; i++) {
          const baseX = vanishingPointX + i * (gridCanvas.width / verticalLines) * 3;
          gCtx.beginPath();
          gCtx.moveTo(vanishingPointX, horizonY);
          gCtx.lineTo(baseX, gridCanvas.height);
          gCtx.stroke();
        }

        const horizonGradient = gCtx.createLinearGradient(0, horizonY - 60, 0, horizonY + 60);
        horizonGradient.addColorStop(0, "rgba(13, 229, 255, 0)");
        horizonGradient.addColorStop(0.5, "rgba(13, 229, 255, 0.08)");
        horizonGradient.addColorStop(1, "rgba(13, 229, 255, 0)");
        gCtx.fillStyle = horizonGradient;
        gCtx.fillRect(0, horizonY - 60, gridCanvas.width, 120);

        const bottomGradient = gCtx.createLinearGradient(0, gridCanvas.height - 150, 0, gridCanvas.height);
        bottomGradient.addColorStop(0, "rgba(255, 26, 140, 0)");
        bottomGradient.addColorStop(0.5, "rgba(255, 26, 140, 0.04)");
        bottomGradient.addColorStop(1, "rgba(255, 26, 140, 0.02)");
        gCtx.fillStyle = bottomGradient;
        gCtx.fillRect(0, gridCanvas.height - 150, gridCanvas.width, 150);
      }
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.15,
          color: Math.random() > 0.4 ? cyanColor : pinkColor,
        });
      }

      // Sort by color to allow batching ctx.fillStyle in the render loop
      particlesRef.current.sort((a, b) => a.color.localeCompare(b.color));
    };

    const drawGrid = () => {
      if (gridCanvas) {
        ctx.drawImage(gridCanvas, 0, 0);
      }
    };

    const drawParticles = () => {
      let currentColor = "";

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Batch color changes
        if (currentColor !== particle.color) {
          currentColor = particle.color;
          ctx.fillStyle = `rgb(${currentColor})`;
        }

        // Core particle
        ctx.globalAlpha = particle.opacity;
        if (particle.size < 1.5) {
          ctx.fillRect(
            particle.x - particle.size,
            particle.y - particle.size,
            particle.size * 2,
            particle.size * 2
          );
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle glow
        ctx.globalAlpha = particle.opacity * 0.15;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Reset globalAlpha to default for next draws
      ctx.globalAlpha = 1.0;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
