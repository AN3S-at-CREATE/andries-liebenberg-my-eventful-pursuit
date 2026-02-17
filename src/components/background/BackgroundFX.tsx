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
  colorString: string;
  glowString: string;
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
    const cyanColor = "rgba(13, 229, 255, ";
    const pinkColor = "rgba(255, 26, 140, ";

    // Optimization: Render grid to offscreen canvas
    const gridCanvas = document.createElement('canvas');
    const gridCtx = gridCanvas.getContext('2d');

    const renderGridToOffscreen = (targetCtx: CanvasRenderingContext2D, width: number, height: number) => {
      targetCtx.clearRect(0, 0, width, height);

      const horizonY = height * 0.65;
      const gridLines = 25;
      const vanishingPointX = width / 2;

      targetCtx.strokeStyle = "rgba(13, 229, 255, 0.06)";
      targetCtx.lineWidth = 1;

      for (let i = 0; i <= gridLines; i++) {
        const progress = i / gridLines;
        const y = horizonY + (height - horizonY) * Math.pow(progress, 1.5);
        const spread = 1 + progress * 2.5;

        targetCtx.beginPath();
        targetCtx.moveTo(vanishingPointX - (width * spread) / 2, y);
        targetCtx.lineTo(vanishingPointX + (width * spread) / 2, y);
        targetCtx.stroke();
      }

      const verticalLines = 35;
      for (let i = -verticalLines / 2; i <= verticalLines / 2; i++) {
        const baseX = vanishingPointX + i * (width / verticalLines) * 3;
        targetCtx.beginPath();
        targetCtx.moveTo(vanishingPointX, horizonY);
        targetCtx.lineTo(baseX, height);
        targetCtx.stroke();
      }

      const horizonGradient = targetCtx.createLinearGradient(0, horizonY - 60, 0, horizonY + 60);
      horizonGradient.addColorStop(0, "rgba(13, 229, 255, 0)");
      horizonGradient.addColorStop(0.5, "rgba(13, 229, 255, 0.08)");
      horizonGradient.addColorStop(1, "rgba(13, 229, 255, 0)");
      targetCtx.fillStyle = horizonGradient;
      targetCtx.fillRect(0, horizonY - 60, width, 120);

      const bottomGradient = targetCtx.createLinearGradient(0, height - 150, 0, height);
      bottomGradient.addColorStop(0, "rgba(255, 26, 140, 0)");
      bottomGradient.addColorStop(0.5, "rgba(255, 26, 140, 0.04)");
      bottomGradient.addColorStop(1, "rgba(255, 26, 140, 0.02)");
      targetCtx.fillStyle = bottomGradient;
      targetCtx.fillRect(0, height - 150, width, 150);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (gridCtx) {
        gridCanvas.width = window.innerWidth;
        gridCanvas.height = window.innerHeight;
        renderGridToOffscreen(gridCtx, window.innerWidth, window.innerHeight);
      }
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const opacity = Math.random() * 0.6 + 0.15;
        const color = Math.random() > 0.4 ? cyanColor : pinkColor;

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity,
          color,
          colorString: color + opacity + ")",
          glowString: color + (opacity * 0.15) + ")",
        });
      }
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.colorString;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = particle.glowString;
        ctx.fill();
      });
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

      if (gridCanvas.width > 0) {
        ctx.drawImage(gridCanvas, 0, 0);
      }

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
