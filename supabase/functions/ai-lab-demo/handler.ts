import { demoSystemPrompt, registry, type DemoId } from "./registry.ts";
import { needsLynkieSafetyResponse, LYNKIE_SAFETY_MESSAGE, scrubLabPii } from "./privacy.ts";
import type { LabRequest } from "./validation.ts";

export const LAB_MODEL = "google/gemini-3.1-flash-lite";
export const LAB_RATE_LIMIT = { maxRequests: 15, windowMs: 60 * 60 * 1000 };
export const LAB_DAILY_CAP = 300;
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LogEntry {
  demoId: DemoId | "invalid";
  status: number;
  latency: number;
  tokens: { prompt: number; completion: number };
}
export interface LabDependencies {
  validate: (body: unknown) => LabRequest | null;
  getClientIP: (req: Request) => string;
  checkRateLimit: (key: string, config: typeof LAB_RATE_LIMIT) => { allowed: boolean; resetAt: number };
  incrementUsage: () => Promise<number>;
  gateway: (body: Record<string, unknown>) => Promise<Response>;
  log: (entry: LogEntry) => void;
}

/** Injectable boundaries let tests prove safeguards without spending credits or storing text. */
export function createLabHandler(dependencies: LabDependencies) {
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const startedAt = Date.now();
    let demoId: DemoId | "invalid" = "invalid";
    let tokens = { prompt: 0, completion: 0 };
    const respond = (body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) => {
      dependencies.log({ demoId, status, latency: Date.now() - startedAt, tokens });
      return new Response(JSON.stringify(body), {
        status, headers: { ...corsHeaders, "Content-Type": "application/json", ...headers },
      });
    };
    try {
      if (req.method !== "POST") return respond({ error: "Method not allowed" }, 405);
      const text = await req.text();
      if (text.length > 16000) return respond({ error: "Invalid request" }, 400);
      let raw: unknown;
      try { raw = JSON.parse(text); } catch { return respond({ error: "Invalid request" }, 400); }
      const input = dependencies.validate(raw);
      if (!input) return respond({ error: "Invalid request" }, 400);
      demoId = input.demoId;
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(dependencies.getClientIP(req)));
      const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
      const limit = dependencies.checkRateLimit(`ai-lab:${hash}`, LAB_RATE_LIMIT);
      if (!limit.allowed) return respond({ replay: true }, 429, { "Retry-After": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))) });
      const latestUser = [...input.messages].reverse().find(message => message.role === "user");
      if (demoId === "lynkie" && latestUser && needsLynkieSafetyResponse(latestUser.content)) {
        return respond({ message: LYNKIE_SAFETY_MESSAGE });
      }
      const calls = await dependencies.incrementUsage();
      if (!Number.isInteger(calls) || calls < 1) return respond({ error: "Usage service unavailable" }, 503);
      if (calls > LAB_DAILY_CAP) return respond({ replay: true }, 429);
      const demo = registry[demoId];
      const response = await dependencies.gateway({
        model: LAB_MODEL,
        messages: [
          { role: "system", content: demoSystemPrompt(demoId, input.options ?? {}) },
          ...input.messages.map(message => ({ ...message, content: scrubLabPii(message.content) })),
        ],
        max_tokens: demo.maxTokens,
        temperature: demo.temperature,
        ...(demo.json ? { response_format: { type: "json_object" } } : {}),
      });
      if (response.status === 402 || response.status === 429) return respond({ replay: true }, response.status);
      if (!response.ok) {
        // Do not log provider bodies: they may contain echoed input or personal information.
        return respond({ error: "Demo unavailable" }, response.status);
      }
      const result: unknown = await response.json();
      if (!result || typeof result !== "object") return respond({ error: "format" }, 502);
      const payload = result as { choices?: { message?: { content?: unknown } }[]; usage?: { prompt_tokens?: unknown; completion_tokens?: unknown } };
      const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;
      tokens = { prompt: count(payload.usage?.prompt_tokens), completion: count(payload.usage?.completion_tokens) };
      const content = payload.choices?.[0]?.message?.content;
      if (typeof content !== "string" || !content.trim()) return respond({ error: "format" }, 502);
      if (!demo.json) return respond({ message: scrubLabPii(content) });
      try {
        const artefact: unknown = JSON.parse(scrubLabPii(content));
        if (!artefact || typeof artefact !== "object" || Array.isArray(artefact)) return respond({ error: "format" }, 502);
        return respond({ artefact });
      } catch { return respond({ error: "format" }, 502); }
    } catch {
      return respond({ error: "Demo unavailable" }, 503);
    }
  };
}
