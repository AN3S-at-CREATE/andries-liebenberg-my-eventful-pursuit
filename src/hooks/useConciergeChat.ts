import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestCTA?: boolean;
}

const MAX_MESSAGES_PER_SESSION = 15;
const SESSION_KEY = "an3s_concierge_count";

export function useConciergeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getMessageCount = useCallback((): number => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }, []);

  const incrementMessageCount = useCallback(() => {
    const current = getMessageCount();
    sessionStorage.setItem(SESSION_KEY, String(current + 1));
  }, [getMessageCount]);

  const remainingMessages = MAX_MESSAGES_PER_SESSION - getMessageCount();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      if (getMessageCount() >= MAX_MESSAGES_PER_SESSION) {
        toast.error("Message limit reached. Book a growth call to continue the conversation!");
        return;
      }

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
      incrementMessageCount();

      try {
        // Prepare message history for the API (last 10 messages for context)
        const messageHistory = [...messages, userMessage]
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const { data, error: fnError } = await supabase.functions.invoke(
          "an3s-concierge",
          {
            body: {
              messages: messageHistory,
            },
          }
        );

        if (fnError) {
          throw new Error(fnError.message || "Failed to get response");
        }

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
          suggestCTA: data.suggestCTA,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        console.error("[Concierge] Error:", err);
        setError("Sorry, I couldn't respond. Please try again.");
        toast.error("Failed to get response. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages, getMessageCount, incrementMessageCount]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    remainingMessages,
    messagesEndRef,
  };
}
