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

// Simple global state for status page
let backgroundMounted = false;
export const getBackgroundFXStatus = () => ({ isMounted: backgroundMounted });

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    backgroundMounted = true;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors from design system
    const cyanColor = "rgba(13, 229, 255, ";
    const pinkColor = "rgba(255, 26, 140, ";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + (particle.opacity * 0.15) + ")";
        ctx.fill();
      });
    };

    const drawNoise = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 6;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      ctx.fillStyle = "hsl(223, 24%, 6%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawParticles();

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
      backgroundMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
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
