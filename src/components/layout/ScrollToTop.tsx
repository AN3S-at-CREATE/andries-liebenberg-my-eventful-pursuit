import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      // Use requestAnimationFrame to throttle scroll events and prevent layout thrashing
      // Ensures toggleVisibility runs at most once per frame
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    // Mark event listener as passive to avoid blocking the main thread during scrolling
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={scrollToTop}
          size="icon"
          className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_hsl(var(--primary))] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Scroll to top</p>
      </TooltipContent>
    </Tooltip>
  );
};
