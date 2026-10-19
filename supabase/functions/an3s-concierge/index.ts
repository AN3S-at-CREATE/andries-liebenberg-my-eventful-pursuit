/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { checkRateLimit, getClientIP, rateLimitResponse } from "../_shared/rateLimit.ts";
import { generateKnowledgePrompt } from "./data.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limit: 20 messages per hour per IP
const RATE_LIMIT_CONFIG = { maxRequests: 20, windowMs: 60 * 60 * 1000 };

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  const ipDigest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(clientIP));
  const ipHash = Array.from(new Uint8Array(ipDigest), byte => byte.toString(16).padStart(2, "0")).join("");
  const rateLimitKey = `an3s-concierge:${ipHash}`;
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG);

  if (!rateLimit.allowed) {
    console.log(`[AN3S Concierge] Rate limit exceeded, remaining: ${rateLimit.remaining}`);
    return rateLimitResponse(rateLimit.resetAt);
  }

  try {
    const rawBody: unknown = await req.json();

    if (!rawBody || typeof rawBody !== "object" || !("messages" in rawBody)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = rawBody as RequestBody;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (messages.length > 10) {
      return new Response(
        JSON.stringify({ error: "Too many messages provided. Maximum is 10." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validMessages: Message[] = [];
    for (const msg of messages) {
      if (!msg || typeof msg !== "object") {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { role, content } = msg as unknown as Record<string, unknown>;

      if (role !== "user" && role !== "assistant") {
        return new Response(
          JSON.stringify({ error: "Invalid message role. Only 'user' or 'assistant' allowed." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (typeof content !== "string" || content.trim().length === 0) {
        return new Response(
          JSON.stringify({ error: "Message content cannot be empty" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Message content exceeds maximum length of 2000 characters" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      validMessages.push({ role, content });
    }

    console.log(`[AN3S Concierge] Processing ${validMessages.length} messages, remaining: ${rateLimit.remaining}`);

    const systemPrompt = `You are the AN3S Concierge on Andries Liebenberg's website. You help a potential client find the right AN3S service and price.

RULES:
1. Answer the client's question first. Use only the services and price list in the KNOWLEDGE BASE.
2. When you mention a price, quote the service name and its price line exactly as written in the knowledge base, with the VAT note as stated there (for example "excl. VAT if applicable"). Never invent, round, combine or estimate prices. If a service is "quote only" or "on request", say so.
3. Ask at most one short follow-up question per reply, and only if it helps choose a service.
4. Never state results, metrics, client counts, client names, savings, revenue, testimonials or awards. Never invent anything that is not in the knowledge base.
5. Never use exclamation marks or emoji.
6. If you are unsure, or the question is not covered, say so briefly and offer to connect them with Andries.
7. When the client asks to book a call or speak to Andries, reply with the contact route from the knowledge base only: WhatsApp (the number in the contact section) and email create@an3s.info. Do not promise times, availability or response speeds beyond what the knowledge base says.
8. Speak about Andries in the third person.

STYLE:
- Short and plain: two or three short paragraphs or a short bullet list at most.
- Confident, warm and direct. No hype.

=== KNOWLEDGE BASE START ===
${generateKnowledgePrompt()}
=== KNOWLEDGE BASE END ===`;

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("[AN3S Concierge] API key not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call Lovable AI Gateway
    const response = await fetch("https://ai-gateway.lovable.dev/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.8-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...validMessages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AN3S Concierge] AI service error: ${response.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Unable to respond right now. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    console.log(`[AN3S Concierge] Response generated successfully`);

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        suggestCTA: assistantMessage.toLowerCase().includes("book") || 
                    assistantMessage.toLowerCase().includes("contact") ||
                    assistantMessage.toLowerCase().includes("growth call")
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[AN3S Concierge] Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
