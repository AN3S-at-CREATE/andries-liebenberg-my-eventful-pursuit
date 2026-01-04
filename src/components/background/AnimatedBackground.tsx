import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors from design system (HSL to RGB)
    const cyanColor = "rgba(13, 229, 255, "; // hsl(186, 100%, 53%)
    const pinkColor = "rgba(255, 26, 140, "; // hsl(331, 100%, 55%)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? cyanColor : pinkColor,
        });
      }
    };

    const drawGrid = () => {
      const horizonY = canvas.height * 0.65;
      const gridLines = 20;
      const vanishingPointX = canvas.width / 2;

      ctx.strokeStyle = "rgba(13, 229, 255, 0.08)";
      ctx.lineWidth = 1;

      // Horizontal lines (perspective)
      for (let i = 0; i <= gridLines; i++) {
        const progress = i / gridLines;
        const y = horizonY + (canvas.height - horizonY) * Math.pow(progress, 1.5);
        const spread = 1 + progress * 2;
        
        ctx.beginPath();
        ctx.moveTo(vanishingPointX - (canvas.width * spread) / 2, y);
        ctx.lineTo(vanishingPointX + (canvas.width * spread) / 2, y);
        ctx.stroke();
      }

      // Vertical lines (converging to vanishing point)
      const verticalLines = 30;
      for (let i = -verticalLines / 2; i <= verticalLines / 2; i++) {
        const baseX = vanishingPointX + i * (canvas.width / verticalLines) * 3;
        
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, horizonY);
        ctx.lineTo(baseX, canvas.height);
        ctx.stroke();
      }

      // Horizon glow
      const gradient = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 50);
      gradient.addColorStop(0, "rgba(13, 229, 255, 0)");
      gradient.addColorStop(0.5, "rgba(13, 229, 255, 0.05)");
      gradient.addColorStop(1, "rgba(13, 229, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY - 50, canvas.width, 100);
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ")";
        ctx.fill();

        // Subtle glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + (particle.opacity * 0.2) + ")";
        ctx.fill();
      });
    };

    const drawNoise = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      // Clear with slight trail effect
      ctx.fillStyle = "hsl(223, 24%, 6%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawParticles();
      
      // Only apply noise occasionally for performance
      if (Math.random() < 0.1) {
        drawNoise();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "hsl(223, 24%, 6%)" }}
    />
  );
}
