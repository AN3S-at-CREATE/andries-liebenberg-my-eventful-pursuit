import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

/** Only mount an explicitly supplied film; never substitute another page's footage. */
export function HeroMedia({ src, poster = "/media/hero/hero-poster.jpg" }: { src?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const handleChange = () => {
      setCanPlay(query.matches);
      setIsPlaying(false);
      setIsBlocked(false);
    };
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!canPlay || !video) return;
    let isActive = true;
    video.play().catch((error: unknown) => {
      if (isActive && error instanceof DOMException && error.name === "NotAllowedError") setIsBlocked(true);
    });
    return () => { isActive = false; video.pause(); };
  }, [canPlay, src]);

  const handlePlay = () => {
    videoRef.current?.play().catch(() => setIsBlocked(true));
  };

  return <div data-home-film className="fixed inset-0 z-0 h-full w-full pointer-events-none">
    <img src={poster} alt="" width="1485" height="768" className="fixed inset-0 h-full w-full object-cover" fetchPriority="high" />
    {canPlay && src && <video ref={videoRef} src={src} poster={poster} muted autoPlay loop playsInline preload="auto" aria-hidden="true"
      onPlaying={() => { setIsPlaying(true); setIsBlocked(false); }}
      onError={() => { setIsPlaying(false); setIsBlocked(false); }}
      className={`fixed inset-0 h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${isPlaying ? "opacity-100" : "opacity-0"}`} />}
    <div aria-hidden="true" className="fixed inset-0 bg-background/45" />
    {isBlocked && <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-auto">
      <Button onClick={handlePlay} className="rounded-full text-on-glow">Play</Button>
    </div>}
  </div>;
}