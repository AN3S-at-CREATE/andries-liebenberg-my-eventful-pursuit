import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { checkRateLimit, getClientIP, rateLimitResponse } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit: 5 briefs per hour per IP
const RATE_LIMIT_CONFIG = { maxRequests: 5, windowMs: 60 * 60 * 1000 };

// Company data (mirrored from frontend)
const companies = [
  { id: "360-vision-events-group", name: "360 Vision Events (Group)", sector: "Events/Production", description: "Full-service event production and management group delivering premium experiences across South Africa.", highlights: ["End-to-end event production", "Premium corporate events", "Large-scale venue management"], location: "South Africa", period: "2019 – Present" },
  { id: "360-vision-events-cleaning", name: "360 Vision Events Cleaning", sector: "Events/Production", description: "Specialized cleaning services for events and venues with rapid turnaround capabilities.", highlights: ["Event venue cleaning", "Post-event rapid turnaround", "Contract cleaning services"], location: "South Africa", period: "2020 – Present" },
  { id: "strydom-projects", name: "Strydom Projects", sector: "Projects/Construction", description: "Construction and project management firm specializing in commercial and residential developments.", highlights: ["Commercial construction", "Project management", "Development consulting"], location: "South Africa", period: "2018 – Present" },
  { id: "maono-moja-events", name: "Maono Moja Events", sector: "Events/Production", description: "Creative event production company focused on unique and memorable experiences.", highlights: ["Creative event design", "Brand activations", "Festival production"], location: "South Africa", period: "2019 – Present" },
  { id: "k-and-d-resources", name: "K AND D RESOURCES", sector: "Industrial/B2B Services", description: "Industrial services and resource management company serving B2B clients across multiple sectors.", highlights: ["Industrial resource supply", "B2B service contracts", "Supply chain management"], location: "South Africa", period: "2017 – Present" },
  { id: "adventure-freaksa", name: "Adventure FreaksA", sector: "Tourism/Experiences", description: "Adventure tourism operator offering unique outdoor experiences and travel packages.", highlights: ["Adventure tourism packages", "Outdoor experiences", "Group travel coordination"], location: "South Africa", period: "2020 – Present" },
  { id: "veralogix-group", name: "Veralogix Group", sector: "Consulting/Strategy", description: "Strategic consulting firm providing business transformation and operational excellence services.", highlights: ["Business strategy consulting", "Operational optimization", "Digital transformation"], location: "South Africa", period: "2018 – Present" },
  { id: "bobby-verd", name: "Bobby Verd", sector: "Retail/Apparel", description: "Fashion retail brand delivering contemporary apparel with a focus on quality and style.", highlights: ["Contemporary fashion retail", "Brand development", "E-commerce operations"], location: "South Africa", period: "2021 – Present" },
  { id: "rubies-and-pearls", name: "Rubies and Pearls", sector: "Tourism/Experiences", description: "Luxury tourism and experience company specializing in curated travel and hospitality.", highlights: ["Luxury travel experiences", "Curated hospitality", "Premium event hosting"], location: "South Africa", period: "2019 – Present" },
  { id: "prisma-entertainment", name: "Prisma Entertainment", sector: "Events/Production", description: "Entertainment production company creating spectacular shows and live experiences.", highlights: ["Live entertainment production", "Show design and execution", "Artist management"], location: "South Africa", period: "2018 – Present" },
];

const companyMetrics = [
  { companyId: "360-vision-events-group", revenueGrowthPct: 48, clientsAcquired: 120, projectsCompleted: 85, customerSatisfactionPct: 97, revenue: { from: 11500000, to: 17300000, isMock: true, basis: "model" } },
  { companyId: "360-vision-events-cleaning", revenueGrowthPct: 44, clientsAcquired: 90, projectsCompleted: 68, customerSatisfactionPct: 96, revenue: { from: 15000000, to: 21600000, isMock: false, basis: "doc" } },
  { companyId: "strydom-projects", revenueGrowthPct: 52, clientsAcquired: 102, projectsCompleted: 76, customerSatisfactionPct: 94, revenue: { from: 16300000, to: 24500000, isMock: true, basis: "model" } },
  { companyId: "maono-moja-events", revenueGrowthPct: 45, clientsAcquired: 95, projectsCompleted: 73, customerSatisfactionPct: 96, revenue: { from: 9100000, to: 13700000, isMock: true, basis: "model" } },
  { companyId: "k-and-d-resources", revenueGrowthPct: 56, clientsAcquired: 130, projectsCompleted: 90, customerSatisfactionPct: 95, revenue: { from: 26000000, to: 39000000, isMock: true, basis: "model" } },
  { companyId: "adventure-freaksa", revenueGrowthPct: 41, clientsAcquired: 88, projectsCompleted: 60, customerSatisfactionPct: 93, revenue: { from: 5600000, to: 8400000, isMock: true, basis: "model" } },
  { companyId: "veralogix-group", revenueGrowthPct: 50, clientsAcquired: 110, projectsCompleted: 80, customerSatisfactionPct: 98, revenue: { from: 15800000, to: 23800000, isMock: true, basis: "model" } },
  { companyId: "bobby-verd", revenueGrowthPct: 38, clientsAcquired: 76, projectsCompleted: 55, customerSatisfactionPct: 92, revenue: { from: 3600000, to: 5500000, isMock: true, basis: "model" } },
  { companyId: "rubies-and-pearls", revenueGrowthPct: 47, clientsAcquired: 84, projectsCompleted: 61, customerSatisfactionPct: 95, revenue: { from: 12800000, to: 18800000, isMock: false, basis: "doc" } },
  { companyId: "prisma-entertainment", revenueGrowthPct: 53, clientsAcquired: 125, projectsCompleted: 89, customerSatisfactionPct: 99, revenue: { from: 12000000, to: 18000000, isMock: true, basis: "model" } },
];

const formatZAR = (amount: number): string =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatZARRange = (from: number | null, to: number | null): string => {
  if (from == null || to == null) return "Available on request";
  return `${formatZAR(from)} – ${formatZAR(to)}`;
};

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
    const { companyId, audience } = await req.json();

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
    const metrics = companyMetrics.find((m) => m.companyId === companyId);

    if (!company || !metrics) {
      return new Response(
        JSON.stringify({ error: "Company not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build context for AI
    const revenueDisclaimer = metrics.revenue.isMock
      ? "IMPORTANT: The revenue range shown is an indicative modelled estimate. Exact financials are available on request."
      : "";

    const companyContext = `
Company: ${company.name}
Sector: ${company.sector}
Location: ${company.location}
Period: ${company.period}
Description: ${company.description}

Key Highlights:
${company.highlights.map((h) => `- ${h}`).join("\n")}

Performance Metrics:
- Revenue Range: ${formatZARRange(metrics.revenue.from, metrics.revenue.to)} ${metrics.revenue.isMock ? "(Indicative - modelled estimate)" : "(From records)"}
- Revenue Growth: ${metrics.revenueGrowthPct}%
- Clients Acquired: ${metrics.clientsAcquired}
- Projects Completed: ${metrics.projectsCompleted}
- Customer Satisfaction: ${metrics.customerSatisfactionPct}%

${revenueDisclaimer}
`;

    const audienceInstructions: Record<string, string> = {
      investor: "Focus on growth metrics, revenue potential, market position, and scalability. Highlight ROI and expansion opportunities.",
      client: "Focus on service delivery, customer satisfaction, project success rates, and reliability. Emphasize the value proposition and track record.",
      partner: "Focus on collaboration opportunities, complementary capabilities, and mutual growth potential. Highlight synergies and shared values.",
    };

    const systemPrompt = `You are a professional executive brief writer for AN3S (Andries Liebenberg). Generate a concise 1-page executive performance brief based ONLY on the provided company data. 

CRITICAL RULES:
1. NEVER invent data, statistics, clients, contracts, or figures not provided
2. If revenue data is marked as "Indicative - modelled estimate", you MUST include this disclaimer: "Indicative revenue range (modelled estimate). Exact financials available on request."
3. Keep the brief under 800 tokens
4. Use professional, confident language
5. Format with clear sections: Overview, Key Metrics, Highlights, and Opportunity

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
