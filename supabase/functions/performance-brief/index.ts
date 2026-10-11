import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIP, rateLimitResponse } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit: 5 briefs per hour per IP
const RATE_LIMIT_CONFIG = { maxRequests: 5, windowMs: 60 * 60 * 1000 };

import { companies } from "../../../src/data/companies.ts";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  const rateLimitKey = `performance-brief:${clientIP}`;
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG);

  if (!rateLimit.allowed) {
    console.log(`[performance-brief] Rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(rateLimit.resetAt);
  }

  try {
    const rawBody: unknown = await req.json();

    if (!rawBody || typeof rawBody !== "object" || !("companyId" in rawBody) || !("audience" in rawBody)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const { companyId, audience } = rawBody as { companyId: string, audience: string };

    console.log("[performance-brief] Generating brief:", { 
      companyId, 
      audience, 
      ip: clientIP,
      remaining: rateLimit.remaining
    });

    if (!companyId || !audience || typeof companyId !== "string" || typeof audience !== "string") {
      return new Response(
        JSON.stringify({ error: "Please select a company and audience" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Security: Validate audience against allowed values to prevent prompt injection
    const allowedAudiences = ["investor", "client", "partner"];
    if (!allowedAudiences.includes(audience)) {
      console.log(`[performance-brief] Invalid audience requested: ${audience.substring(0, 100)}`);
      return new Response(
        JSON.stringify({ error: "Invalid audience selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const company = companies.find((c) => c.id === companyId);

    if (!company) {
      return new Response(
        JSON.stringify({ error: "Company not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const companyContext = JSON.stringify({name: company.name, sector: company.sector, role: company.role, period: company.period});

    const audienceInstructions: Record<string, string> = {
      investor: "Discuss venture identity and possible scope questions. Do not claim growth or financial results.",
      client: "Discuss the venture identity and sector. No satisfaction or performance claims.",
      partner: "Focus on collaboration opportunities, complementary capabilities, and mutual growth potential. Highlight synergies and shared values.",
    };

    const systemPrompt = `You are a professional executive brief writer for AN3S (Andries Liebenberg). Generate a concise 1-page executive performance brief based ONLY on the provided company data. 

CRITICAL RULES:
1. NEVER invent data, statistics, clients, contracts, or figures not provided
2. No verified financials, growth, client counts, project counts or satisfaction data are available. Omit all numerical performance claims; never guess roles awaiting confirmation.
3. Keep the brief under 800 tokens
4. Use professional, confident language
5. Format with clear sections: Overview, Role, Sector, and Discussion

Target audience: ${audience}
${audienceInstructions[audience] || ""}

All monetary values must be in ZAR (South African Rand).`;

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("[performance-brief] API key not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate an executive performance brief for:\n\n${companyContext}` },
        ],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[performance-brief] AI service error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to generate brief. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const brief = data.choices?.[0]?.message?.content || "Unable to generate brief.";

    console.log("[performance-brief] Brief generated successfully");

    return new Response(
      JSON.stringify({ brief }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("[performance-brief] Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
