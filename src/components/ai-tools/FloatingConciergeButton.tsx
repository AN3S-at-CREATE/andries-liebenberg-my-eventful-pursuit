import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConciergeModal } from "./concierge/ConciergeModal";

export function FloatingConciergeButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ConciergeModal
        trigger={
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all hover:scale-105"
          >
            <MessageSquareText className="h-6 w-6" />
            <span className="sr-only">Ask AN3S Concierge</span>
          </Button>
        }
      />
    </div>
  );
}
