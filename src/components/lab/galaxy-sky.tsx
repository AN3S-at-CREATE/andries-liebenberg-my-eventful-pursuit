import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import { labConstellations, labStatusLabels, type LabConstellation } from "@/data/lab";
import { color } from "@/design-system/tokens";
import wordmark from "@/design-system/assets/an3s-wordmark.png";
import { motionTokens } from "@/lib/motion";
import { positionLabStars, visibleLabStars, type LabSignal } from "@/lib/lab-galaxy";
import { EvidenceGlyph } from "./evidence-glyph";

const tint: Record<LabConstellation, string> = { ai: color.cyan, agents: color.blue, build: color.violet, ventures: color.pink };
export function GalaxySky({ signal, isMobile }: { signal: LabSignal; isMobile: boolean }) {
  const navigate = useNavigate();
  const isReduced = useReducedMotion();
  const svg = useRef<SVGSVGElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [echo, setEcho] = useState<LabConstellation | null>(null);
  const [echoId, setEchoId] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const stars = visibleLabStars();
  const raised = isMobile ? stars.filter(star => signal === "all" || star.constellation === signal) : stars;
  const pageCount = Math.ceil(raised.length / 8);
  const shown = isMobile ? raised.slice(mobilePage * 8, mobilePage * 8 + 8) : raised;
  const points = positionLabStars(shown, isMobile);
  const groups = labConstellations.filter(group => shown.some(star => star.constellation === group.id));
  const selected = points.find(point => point.star.slug === active);
  useEffect(() => { setMobilePage(0); setActive(null); setPointer(null); }, [signal]);
  const handleKeyboard = (event: KeyboardEvent<SVGAElement>, href: string) => {
    if (event.key === "Enter") { event.preventDefault(); navigate(href); }
    if (event.key === "Escape") { event.preventDefault(); setActive(null); setPointer(null); }
  };
  const focus = (slug: string, constellation: LabConstellation) => {
    setActive(slug);
    if (!isReduced && !isMobile) { setEcho(constellation); setEchoId(value => value + 1); }
  };
  return <div className="lab-sky relative min-w-0" onKeyDown={event => { if (event.key === "Escape") { setActive(null); setPointer(null); } }}>
    <svg ref={svg} viewBox="0 0 960 760" className="h-full w-full overflow-visible" role="group" aria-label="AN3S Lab constellation map"
      onPointerMove={event => {
        if (isMobile) return;
        const matrix = svg.current?.getScreenCTM();
        if (!matrix) return;
        const location = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
        setPointer({ x: location.x, y: location.y });
      }} onPointerLeave={() => { setPointer(null); setActive(null); }}>
      <defs>
        <linearGradient id="lab-neon"><stop stopColor={color.pink} /><stop offset="0.5" stopColor={color.violet} /><stop offset="1" stopColor={color.blue} /></linearGradient>
        <radialGradient id="lab-halo"><stop stopColor={color.pink} stopOpacity="0.18" /><stop offset="1" stopColor={color.pink} stopOpacity="0" /></radialGradient>
        <filter id="lab-nebula-blur"><feGaussianBlur stdDeviation="32" /></filter>
      </defs>
      {groups.map(group => {
        const cluster = points.filter(point => point.star.constellation === group.id);
        const cx = cluster.reduce((sum, point) => sum + point.x, 0) / cluster.length;
        const cy = cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;
        const dim = !isMobile && signal !== "all" && signal !== group.id;
        return <g key={group.id} opacity={dim ? 0.25 : 1} className="lab-cluster">
          <ellipse cx={cx} cy={cy} rx="195" ry="100" fill={tint[group.id]} opacity="0.08" filter="url(#lab-nebula-blur)" />
          <polyline points={cluster.map(point => `${point.x},${point.y}`).join(" ")} fill="none" stroke="url(#lab-neon)" strokeWidth="0.7" strokeOpacity="0.45" />
          {!isMobile && <text x={cx} y={Math.min(...cluster.map(point => point.y)) - 45} textAnchor="middle" className="fill-ink-muted text-caption uppercase" letterSpacing="2">{group.name.toUpperCase()}</text>}
        </g>;
      })}
      {!isMobile && <g aria-hidden="true">
        <m.circle cx="480" cy="380" r="125" fill="url(#lab-halo)" initial={false} animate={{ opacity: isReduced ? 1 : [0.5, 1, 0.5] }} transition={isReduced ? { duration: 0 } : { duration: motionTokens.breath, repeat: Infinity, ease: motionTokens.easeIo }} />
        <circle cx="480" cy="380" r="44" className="fill-deep-space stroke-pink" strokeWidth="1" />
        <image href={wordmark} x="444" y="367" width="72" height="26" />
      </g>}
      {points.map(({ star, x, y, index }) => {
        const dim = !isMobile && signal !== "all" && signal !== star.constellation;
        const matrix = svg.current?.getScreenCTM();
        const scale = matrix ? Math.hypot(matrix.a, matrix.b) : 1;
        const nearby = !!pointer && Math.hypot(pointer.x - x, pointer.y - y) * scale < 150;
        const isActive = star.slug === active;
        const showLabel = isMobile || isReduced || nearby || isActive;
        const labelY = isMobile ? y + 28 : y + 26;
        return <m.a key={star.slug} href={`/lab/${star.slug}`} tabIndex={0} data-lab-star={star.slug} aria-label={`${star.name}, ${labStatusLabels[star.status]}: ${star.line}`}
          initial={isReduced ? false : { opacity: 0 }} animate={{ opacity: dim ? 0.25 : 1 }} transition={{ duration: isReduced ? 0 : motionTokens.base, delay: isReduced ? 0 : Math.min(index, 7) * motionTokens.stagger }}
          onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); navigate(`/lab/${star.slug}`); } }}
          onKeyDown={event => handleKeyboard(event, `/lab/${star.slug}`)} onFocus={() => focus(star.slug, star.constellation)} onBlur={() => setActive(null)} onPointerEnter={() => setActive(star.slug)} className="lab-star-link outline-none">
          <g transform={`translate(${x} ${y})`}>
            <circle r={isMobile ? 22 : 20} className="fill-deep-space" fillOpacity="0.01" />
            {isActive && <circle r="22" fill="none" className="stroke-cyan lab-star-bloom" strokeWidth="1" opacity="0.55" />}
            <EvidenceGlyph status={star.status} radius={isMobile ? 10 : 8} />
            {echo === star.constellation && !isReduced && !isMobile && <m.circle key={echoId} r="18" fill="none" className="stroke-cyan" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0] }} transition={{ duration: motionTokens.slow }} />}
          </g>
          <text x={x} y={labelY} textAnchor="middle" className={`fill-ink lab-star-label ${isMobile ? "text-xl" : "text-sm"}`} opacity={showLabel ? 1 : 0}>{star.name}</text>
        </m.a>;
      })}
      {selected && !isMobile && (() => {
        const x = Math.min(Math.max(selected.x - 125, 10), 690);
        const y = Math.min(selected.y + 42, 600);
        return <foreignObject x={x} y={y} width="260" height="150" pointerEvents="none">
          <div role="tooltip" className="rounded-md border border-blue bg-panel p-4 text-ink">
            <p className="font-semibold text-sm">{selected.star.name}</p><p className="text-caption text-ink-muted mt-2">{selected.star.line}</p>
            <p className="text-caption text-cyan-glow mt-2">{labStatusLabels[selected.star.status]}</p><p className="text-caption text-ink-muted mt-2">Enter or click to open</p>
          </div>
        </foreignObject>;
      })()}
    </svg>
    {isMobile && pageCount > 1 && <div className="flex justify-center gap-3 pb-3">
      {Array.from({ length: pageCount }, (_, index) => <a key={index} href={`#sky-${index + 1}`} onClick={event => { event.preventDefault(); setMobilePage(index); }} className="text-caption text-cyan-glow p-2 focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Sky group ${index + 1}`} aria-current={mobilePage === index ? "page" : undefined}>{index + 1}</a>)}
    </div>}
  </div>;
}
