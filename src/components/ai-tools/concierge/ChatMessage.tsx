import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Phone } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/hooks/useConciergeChat";

interface ChatMessageProps {
  message: ChatMessageType;
  isLatest?: boolean;
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary/20 text-primary"
            : "bg-secondary/20 text-secondary"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <MessageSquare className="w-4 h-4" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-3",
          isUser
            ? "bg-primary/10 border border-primary/30 text-foreground"
            : "bg-muted/50 border border-border/50 text-foreground"
        )}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>

        {/* CTA Button for assistant messages */}
        {!isUser && message.suggestCTA && isLatest && (
          <Button
            asChild
            size="sm"
            className="mt-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <a
              href="https://wa.me/27729749703"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Phone className="w-3 h-3" />
              Book a Growth Call
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
