import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLocation, type Location } from "react-router-dom";
import { motionTokens } from "@/lib/motion";

/** Freeze route content during the old-page exit; the persistent shell never transitions. */
export function PageTransition({ children }: { children: (location: Location) => ReactNode }) {
  const location = useLocation();
  const [shownLocation, setShownLocation] = useState(location);
  const root = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const hasNativeTransition = typeof document.startViewTransition === "function";

  useLayoutEffect(() => {
    if (shownLocation === location) return;
    if (hasNativeTransition && !isReduced && shownLocation.pathname !== location.pathname) {
      const transition = document.startViewTransition(() => {
        flushSync(() => setShownLocation(location));
      });
      void transition.finished.then(() => {
        const heading = root.current?.querySelector("h1");
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }).catch(() => undefined);
    } else {
      setShownLocation(location);
    }
  }, [location, shownLocation, hasNativeTransition, isReduced]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const handleReady = () => {
      const page = element.querySelector(`[data-page-path="${CSS.escape(shownLocation.pathname)}"]`);
      const heading = page?.querySelector("h1");
      if (!heading) return false;
      heading.tabIndex = -1;
      const hash = shownLocation.hash.slice(1);
      const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" });
      heading.focus({ preventScroll: true });
      return true;
    };
    if (handleReady()) return;
    const observer = new MutationObserver(() => { if (handleReady()) observer.disconnect(); });
    observer.observe(element, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [shownLocation]);

  const isInstant = isReduced || hasNativeTransition;
  return <div ref={root} id="page-content" tabIndex={-1} className="page-content">
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => {
      // The entering page may have been deferred by AnimatePresence.
      requestAnimationFrame(() => {
        const heading = root.current?.querySelector("h1");
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      });
    }}>
      <m.div key={shownLocation.pathname} data-page-path={shownLocation.pathname} className="page-transition-root"
        initial={isInstant ? false : { opacity: 0, scale: 1.01 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: isInstant ? 0 : 0.32, delay: isInstant ? 0 : 0.06, ease: motionTokens.ease } }}
        exit={{ opacity: isInstant ? 1 : 0, scale: isInstant ? 1 : 0.99, transition: { duration: isInstant ? 0 : 0.18, ease: motionTokens.easeIo } }}>
        {children(shownLocation)}
      </m.div>
    </AnimatePresence>
  </div>;
}
