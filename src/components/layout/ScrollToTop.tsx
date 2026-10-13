import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      // 🚀 Optimizer: Debounce scroll events using requestAnimationFrame
      // This prevents layout thrashing and limits executions to screen refresh rate (typically 60fps)
      if (!ticking) {
        // ⚡ Bolt Optimization: Fixed flawed rAF debouncing to ensure flag is only reset async
        // and eliminate double-nested requestAnimationFrame calls
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 🚀 Optimizer: Debounce scroll events using requestAnimationFrame and use passive listener
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
          className={`fixed bottom-5 left-4 z-50 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-opacity duration-150 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
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
