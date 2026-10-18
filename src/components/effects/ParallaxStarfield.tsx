import { useEffect, useRef } from "react";
import { color } from "@/design-system/tokens";
import { starfieldOffset } from "@/lib/motion";

/** Persistent global canvas; only this layer follows desktop scroll, never hero media. */
export function ParallaxStarfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
      let seed = 2003;
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (let i = 0; i < width * height / 8000; i++) {
        ctx.fillStyle = i % 10 === 0 ? color.pink : i % 17 === 0 ? color.cyan : color.ink;
        ctx.globalAlpha = .25 + random() * .6; ctx.beginPath();
        ctx.arc(random() * width, random() * height, .4 + random(), 0, Math.PI * 2); ctx.fill();
      }
    };
    const update = () => {
      frame = 0;
      canvas.style.transform = `translateY(${starfieldOffset(window.scrollY, desktop.matches, reduced.matches)}px)`;
    };
    const handleScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const configure = () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame); frame = 0;
      if (desktop.matches && !reduced.matches) window.addEventListener("scroll", handleScroll, { passive: true });
      update();
    };
    draw(); configure();
    window.addEventListener("resize", draw);
    desktop.addEventListener("change", configure); reduced.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", draw); window.removeEventListener("scroll", handleScroll);
      desktop.removeEventListener("change", configure); reduced.removeEventListener("change", configure);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" data-global-starfield className="global-starfield" />;
}
