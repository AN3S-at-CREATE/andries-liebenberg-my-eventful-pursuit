import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface HeroMediaProps {
  /** Explicit film source; never substitute another page's footage. */
  src?: string;
  /** Optional WebM twin, rendered as the first source for browsers without H.264. */
  webmSrc?: string;
  /** Poster shown until the first frame plays (and under reduced motion). */
  poster?: string;
  /** When false, the film pauses and hides but stays mounted (persistent non-home film on home). */
  active?: boolean;
}

/**
 * Full-bleed background film: fixed inset-0, edge to edge, no frame or side panel.
 * Poster until the first frame plays, then a fade-in; one Play button only if
 * autoplay is blocked. Reduced motion shows the poster and never autoplays.
 */
export function HeroMedia({ src, webmSrc, poster = "/media/hero-poster.jpg", active = true }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video || !active || !canPlay) return;
    // Set the DOM property too: muted autoplay must be established before play().
    video.muted = true;
    video.play().catch(() => {
      if (videoRef.current === video && video.paused) setIsBlocked(true);
    });
  };

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
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    if (!canPlay) return;
    let isActive = true;
    const resumePlayback = () => {
      if (!isActive || document.visibilityState === "hidden") return;
      video.muted = true;
      video.play().catch(() => {
        if (isActive && video.paused) setIsBlocked(true);
      });
    };
    resumePlayback();
    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("pageshow", resumePlayback);
    return () => {
      isActive = false;
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("pageshow", resumePlayback);
      video.pause();
    };
  }, [canPlay, src, active]);

  return <div data-home-film className={`fixed inset-0 h-full w-full pointer-events-none transition-opacity duration-500 motion-reduce:transition-none ${isBlocked && active ? "z-50" : "z-0"} ${active ? "opacity-100" : "opacity-0"}`}>
    <img src={poster} alt="" width="1485" height="768" className="fixed inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
    {canPlay && src && <video ref={videoRef} poster={poster} muted autoPlay loop playsInline preload="auto" aria-hidden="true"
      onCanPlay={handlePlay}
      onPlaying={() => { setIsPlaying(true); setIsBlocked(false); }}
      onPause={() => { if (active && canPlay) setIsBlocked(true); }}
      onError={() => { setIsPlaying(false); setIsBlocked(false); }}
      className={`fixed inset-0 h-full w-full object-cover object-center transition-opacity duration-500 motion-reduce:transition-none ${isPlaying ? "opacity-100" : "opacity-0"}`}>
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>}
    <div aria-hidden="true" className="fixed inset-0 bg-background/45" />
    {isBlocked && active && <div className="absolute bottom-24 inset-x-0 flex justify-center pointer-events-none">
      <Button onClick={handlePlay} className="pointer-events-auto rounded-full text-on-glow">Play</Button>
    </div>}
  </div>;
}
