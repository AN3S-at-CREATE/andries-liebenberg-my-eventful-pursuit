import { createClient } from "npm:@supabase/supabase-js@2";
import { checkRateLimit, getClientIP } from "../_shared/rateLimit.ts";
import { createLabHandler } from "./handler.ts";
import { validateLabRequest } from "./validation.ts";

Deno.serve(createLabHandler({
  validate: validateLabRequest,
  getClientIP,
  checkRateLimit,
  incrementUsage: async () => {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Usage service unavailable");
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client.rpc("increment_ai_lab_usage");
    if (error || typeof data !== "number") throw new Error("Usage service unavailable");
    return data;
  },
  gateway: async body => {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("Demo service unavailable");
    return fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify(body),
    });
  },
  log: entry => console.log(JSON.stringify(entry)),
}));
