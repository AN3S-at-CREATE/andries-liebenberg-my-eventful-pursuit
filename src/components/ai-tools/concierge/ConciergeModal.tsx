import { useState, useRef, KeyboardEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageSquareText, Send, Loader2, Trash2 } from "lucide-react";
import { useConciergeChat } from "@/hooks/useConciergeChat";
import { ChatMessage } from "./ChatMessage";
import { CategoryTabs } from "./CategoryTabs";
import { SuggestedPrompts, type CategoryKey } from "./SuggestedPrompts";

interface ConciergeModalProps {
  trigger?: React.ReactNode;
}

export function ConciergeModal({ trigger }: ConciergeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("growth");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    remainingMessages,
    messagesEndRef,
  } = useConciergeChat();

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="gap-2 border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary"
          >
            <MessageSquareText className="w-4 h-4" />
            Ask AN3S Concierge
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 bg-card border-border/50">
        {/* Header */}
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
                    aria-label="Clear chat history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear chat history</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </DialogHeader>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Chat Area */}
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

              {/* Loading indicator */}
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

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading || remainingMessages <= 0}
              className="flex-1 bg-muted/30 border-border/50 focus-visible:ring-primary"
              aria-label="Chat input"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading || remainingMessages <= 0}
                    className="bg-primary hover:bg-primary/90"
                    size="icon"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
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
  );
}
