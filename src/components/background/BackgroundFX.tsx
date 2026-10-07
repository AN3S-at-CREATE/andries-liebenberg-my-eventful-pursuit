import { useEffect, useRef } from "react";
import { setBackgroundFXMounted } from "@/lib/backgroundStatus";
import { color } from "@/design-system/tokens";

// The site-wide backdrop, from the AN3S design system's Starfield: circuit traces entering from
// the upper left and light streaks falling from the upper right, drawn once per resize (no
// animation loop), with pink smoke low on the left and blue smoke on the right. The stars
// themselves come from ParallaxStarfield.

const TAU = Math.PI * 2;
const SEED = 2003;

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawSky(canvas: HTMLCanvasElement) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const rnd = seeded(SEED);

  // Light streaks falling from the upper right toward the lower left.
  ctx.lineCap = "round";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 7; i++) {
    const sx = w * (0.62 + rnd() * 0.4);
    const sy = h * rnd() * 0.45;
    const len = 60 + rnd() * 160;
    const ex = sx - len;
    const ey = sy + len * 0.35;
    const trail = ctx.createLinearGradient(sx, sy, ex, ey);
    trail.addColorStop(0, i % 2 ? color.cyan : color.pink);
    trail.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = trail;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = color.ink;
    ctx.beginPath();
    ctx.arc(sx, sy, 1.3, 0, TAU);
    ctx.fill();
  }

  // Circuit traces entering from the upper left: run, bend 45 degrees, end in a node.
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.strokeStyle = color.blue;
  for (let i = 0; i < 6; i++) {
    const y0 = h * (0.05 + i * 0.05);
    const x1 = w * (0.04 + rnd() * 0.1);
    const run = 14 + rnd() * 34;
    const tail = 8 + rnd() * 24;
    ctx.globalAlpha = 0.3 + rnd() * 0.3;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1 + run, y0 + run);
    ctx.lineTo(x1 + run + tail, y0 + run);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x1 + run + tail + 2.4, y0 + run, 2.4, 0, TAU);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setBackgroundFXMounted(true);
    const canvas = canvasRef.current;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      // Debounced so a resize drag repaints once.
      resizeTimeout = setTimeout(() => canvas && drawSky(canvas), 150);
    };
    if (canvas) {
      drawSky(canvas);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      setBackgroundFXMounted(false);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none"
      />

      {/* Pink smoke low on the left */}
      <div
        aria-hidden="true"
        className="fixed -bottom-48 -left-48 h-[640px] w-[560px] rounded-full bg-pink opacity-20 blur-[160px] pointer-events-none -z-10 animate-pulse-slow"
      />

      {/* Blue smoke on the right */}
      <div
        aria-hidden="true"
        className="fixed top-1/4 -right-48 h-[560px] w-[480px] rounded-full bg-blue opacity-20 blur-[150px] pointer-events-none -z-10 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
    </>
  );
}
