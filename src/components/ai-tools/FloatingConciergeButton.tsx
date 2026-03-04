import { useState, forwardRef, useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Trash2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useConciergeChat } from "@/hooks/useConciergeChat";
import { ChatMessage } from "./concierge/ChatMessage";
import { CategoryTabs } from "./concierge/CategoryTabs";
import { SuggestedPrompts, type CategoryKey } from "./concierge/SuggestedPrompts";
import { cn } from "@/lib/utils";

export const FloatingConciergeButton = forwardRef<HTMLDivElement>((_, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(() => {
    return localStorage.getItem("an3s-concierge-interacted") === "true";
  });
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("growth");

  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    remainingMessages,
    messagesEndRef,
  } = useConciergeChat();

  const handleOpenChat = () => {
    setIsHovered(false);
    setIsOpen(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem("an3s-concierge-interacted", "true");
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div 
      ref={ref} 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip - shows on hover */}
      <div className={cn(
        "absolute bottom-16 right-0 transition-all duration-300 pointer-events-none",
        isHovered && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}>
        <div className="relative bg-card border border-border/50 rounded-lg p-4 shadow-lg shadow-secondary/10 w-[280px]">
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border/50 rotate-45" />
          <p className="text-sm text-foreground font-medium mb-1">
            Ask AN3S Concierge
          </p>
          <p className="text-xs text-muted-foreground">
            Chat with AI about my experience and how I can help your business.
          </p>
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative">
        {!hasInteracted && (
          <div className="absolute -inset-1 rounded-full bg-secondary/50 animate-attention-pulse motion-reduce:animate-none" />
        )}
        <Button
          size="lg"
          onClick={handleOpenChat}
          className="relative h-14 w-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/25 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_hsl(var(--secondary))]"
        >
          <MessageSquareText className="h-6 w-6" />
          <span className="sr-only">Ask AN3S Concierge</span>
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 bg-card border-border/50">
          <DialogHeader className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <MessageSquareText className="w-4 h-4 text-secondary" />
                </div>
                Ask AN3S Concierge
              </DialogTitle>
              {messages.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearChat}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear chat</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </DialogHeader>

          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <ScrollArea className="flex-1 px-4 py-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MessageSquareText className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">
                    Hi! I'm the AN3S Concierge
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[300px]">
                    Ask me about Andries's experience, services, companies, or how
                    he can help grow your business.
                  </p>
                </div>
                <SuggestedPrompts
                  category={activeCategory}
                  onSelectPrompt={handleSelectPrompt}
                />
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isLatest={index === messages.length - 1}
                  />
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <MessageSquareText className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="bg-muted/50 border border-border/50 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                        <span className="text-sm text-muted-foreground">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t border-border/50 space-y-2">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading || remainingMessages <= 0}
                className="flex-1 bg-muted/30 border-border/50 focus-visible:ring-primary"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || remainingMessages <= 0}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {remainingMessages > 0 ? (
                <>
                  {remainingMessages} message{remainingMessages !== 1 ? "s" : ""}{" "}
                  remaining this session
                </>
              ) : (
                <>
                  Session limit reached.{" "}
                  <a
                    href="https://wa.me/27729749703"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline"
                  >
                    Book a growth call
                  </a>{" "}
                  to continue!
                </>
              )}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

FloatingConciergeButton.displayName = "FloatingConciergeButton";
