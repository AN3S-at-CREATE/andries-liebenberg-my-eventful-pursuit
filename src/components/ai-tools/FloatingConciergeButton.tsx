import { useState, useEffect } from "react";
import { MessageSquareText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { cn } from "@/lib/utils";

const TOOLTIP_STORAGE_KEY = "an3s_concierge_tooltip_seen";

export function FloatingConciergeButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem(TOOLTIP_STORAGE_KEY);
    if (!hasSeenTooltip) {
      // Delay showing tooltip for better UX
      const timer = setTimeout(() => setShowTooltip(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem(TOOLTIP_STORAGE_KEY, "true");
  };

  const handleModalOpen = () => {
    dismissTooltip();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 animate-fade-in">
          <div className="relative bg-card border border-border/50 rounded-lg p-3 shadow-lg shadow-secondary/10 max-w-[200px]">
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border/50 rotate-45" />
            
            {/* Close button */}
            <button
              onClick={dismissTooltip}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            
            {/* Content */}
            <p className="text-sm text-foreground font-medium mb-1">
              Ask AN3S Concierge
            </p>
            <p className="text-xs text-muted-foreground">
              Chat with AI about my experience and how I can help your business.
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <ConciergeModal
        trigger={
          <Button
            size="lg"
            onClick={handleModalOpen}
            className={cn(
              "h-14 w-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all hover:scale-105",
              showTooltip && "animate-pulse"
            )}
          >
            <MessageSquareText className="h-6 w-6" />
            <span className="sr-only">Ask AN3S Concierge</span>
          </Button>
        }
      />
    </div>
  );
}
