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
  const rateLimitKey = `an3s-concierge:${clientIP}`;
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG);

  if (!rateLimit.allowed) {
    console.log(`[AN3S Concierge] Rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(rateLimit.resetAt);
  }

  try {
    const { messages }: RequestBody = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[AN3S Concierge] Processing ${messages.length} messages, IP: ${clientIP}, remaining: ${rateLimit.remaining}`);

    const systemPrompt = `You are the AN3S Concierge, a helpful AI assistant for Andries Liebenberg's portfolio website.

CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
1. ONLY answer from the provided KNOWLEDGE BASE below - never invent information
2. If a question is NOT covered in the knowledge base, respond: "I don't have that specific information yet. You can book a growth call to discuss further with Andries directly."
3. NEVER invent or fabricate clients, metrics, revenue figures, testimonials, or any claims
4. Keep responses concise, professional, and friendly
5. Use the AN3S brand voice: confident but not arrogant, data-driven, action-oriented
6. When giving helpful answers about services or experience, naturally suggest booking a growth call
7. For contact questions, always provide the WhatsApp number (+27 72 974 9703) and email (book@hello.an3s.info)
8. Refer to Andries in third person or as "I" depending on context - be natural

FORMATTING:
- Use bullet points for lists
- Keep paragraphs short (2-3 sentences max)
- Be conversational but professional

=== KNOWLEDGE BASE START ===
${generateKnowledgePrompt()}
=== KNOWLEDGE BASE END ===

Remember: You represent AN3S professionally. Be helpful, accurate, and never fabricate information.`;

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
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
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
