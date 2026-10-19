import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkRateLimit, getClientIP, rateLimitResponse } from "../_shared/rateLimit.ts";
import { contactRequestSchema } from "./validation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const RATE_LIMIT_CONFIG = { maxRequests: 3, windowMs: 60 * 60 * 1000 };

function respond(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return respond({ error: "Method not allowed" }, 405);
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(`contact-email:${clientIP}`, RATE_LIMIT_CONFIG);
  if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);

  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 12000) return respond({ error: "Enquiry is too long" }, 400);
    body = JSON.parse(text);
  } catch {
    return respond({ error: "Please provide a valid enquiry" }, 400);
  }
  const result = contactRequestSchema.safeParse(body);
  if (!result.success) return respond({ error: "Please check your details, chosen service and consent" }, 400);

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return respond({ error: "Unable to save your enquiry. Please try again." }, 503);
  try {
    const supabase = createClient(url, key);
    const { name, email, service, company, industry, goal, message } = result.data;
    const { data, error } = await supabase.from("contact_submissions").insert({
      name, email, service,
      company: company || null, industry: industry || null, goal: goal || null,
      message, ip_address: clientIP.slice(0, 100),
      user_agent: (req.headers.get("user-agent") || "unknown").slice(0, 500), status: "new",
    }).select("id").single();
    if (error || !data) {
      console.error("[send-contact-email] Enquiry storage failed");
      return respond({ error: "Unable to save your enquiry. Please try again." }, 503);
    }
    // No sender domain is configured. Preserve leads without attempting undeliverable emails.
    // After domain verification, enqueue the fixed-recipient owner template here using data.id.
    return respond({ success: true, submissionId: data.id, emailStatus: "not_configured" });
  } catch {
    console.error("[send-contact-email] Enquiry storage unavailable");
    return respond({ error: "Unable to save your enquiry. Please try again." }, 503);
  }
};

serve(handler);
