import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HeroMedia } from "./hero-media";

/**
 * The seamless nebula loop behind every page except home. Lives outside the route
 * tree (App.tsx) so the film never restarts on navigation; on home it pauses and
 * hides while the arrival film owns the screen.
 */
export function NebulaFilm() {
  const { pathname } = useLocation();
  const [hasVisitedInnerPage, setHasVisitedInnerPage] = useState(pathname !== "/");
  useEffect(() => {
    if (pathname !== "/") setHasVisitedInnerPage(true);
  }, [pathname]);
  // Defer its first download on home, then keep the same film mounted across navigation.
  if (!hasVisitedInnerPage) return null;
  return <HeroMedia
    src="/media/hero-loop.mp4"
    webmSrc="/media/hero-loop.webm"
    poster="/media/hero-poster.jpg"
    active={pathname !== "/"}
  />;
}
