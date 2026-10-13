import { useEffect, useState } from "react";

/** Do not download or play motion media on mobile or reduced-motion devices. */
export function HeroMedia({ background = false }: { background?: boolean }) {
  const [canPlay, setCanPlay] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const handleChange = () => setCanPlay(query.matches);
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return <div className={background ? "absolute inset-0 pointer-events-none" : "relative aspect-video overflow-hidden rounded-lg border border-pink/35"}>
    {canPlay ? <video poster="/media/hero/hero-poster.jpg" muted autoPlay loop playsInline preload="metadata" aria-label={background ? undefined : "Event production by Andries, 360 Vision Events"} aria-hidden={background || undefined} className="w-full h-full object-cover">
      <source src="/media/hero/hero-loop.webm" type="video/webm" />
      <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
    </video>
      : <img src="/media/hero/hero-poster.jpg" alt={background ? "" : "Event production by Andries, 360 Vision Events"} width="1485" height="768" className="w-full h-full object-cover" fetchPriority={background ? "low" : "high"} />}
    {background && <div className="absolute inset-0 bg-background/95" />}
  </div>;
}