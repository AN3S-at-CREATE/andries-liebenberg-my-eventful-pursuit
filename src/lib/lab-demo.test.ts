import { beforeEach, describe, expect, it, vi } from "vitest";
import { webcrypto } from "node:crypto";
import { createLabHandler, type LabDependencies } from "../../supabase/functions/ai-lab-demo/handler";
import { registry, demoSystemPrompt, SHARED_PREFIX, type DemoId } from "../../supabase/functions/ai-lab-demo/registry";
import { LYNKIE_SAFETY_MESSAGE, scrubLabPii } from "../../supabase/functions/ai-lab-demo/privacy";
import { labInputSchema } from "./lab-demo";

beforeEach(() => vi.stubGlobal("crypto", webcrypto));
const input = (demoId: DemoId = "whatsapp", content = "Could you help with an enquiry?") => ({ demoId, messages: [{ role: "user" as const, content }], options: {} });
function setup(calls = 1, status = 200, content = "A person can check that for you.") {
  const dependencies: LabDependencies = {
    validate: raw => {
      const parsed = labInputSchema.safeParse(raw);
      if (!parsed.success || !parsed.data.demoId || !parsed.data.messages) return null;
      const messages = parsed.data.messages.map(message => {
        if (!message.role || typeof message.content !== "string") throw new Error("Invalid message");
        return { role: message.role, content: message.content };
      });
      return { demoId: parsed.data.demoId, messages, options: parsed.data.options };
    },
    getClientIP: () => "192.0.2.123",
    checkRateLimit: vi.fn(() => ({ allowed: true, resetAt: Date.now() + 3600000 })),
    incrementUsage: vi.fn(async () => calls),
    gateway: vi.fn(async () => status === 200 ? Response.json({ choices: [{ message: { content } }], usage: { prompt_tokens: 2, completion_tokens: 3 } }) : Response.json({ error: "unavailable" }, { status })),
    log: vi.fn(),
  };
  const handler = createLabHandler(dependencies);
  return { dependencies, send: (body: unknown) => handler(new Request("https://example.com", { method: "POST", body: JSON.stringify(body) })) };
}

describe("Lab input and privacy rules", () => {
  it("scrubs emails", () => expect(scrubLabPii("test@example.com")).toBe("[removed]"));
  it("scrubs South African phones with spaces", () => expect(scrubLabPii("+27 72 974 9703 or 072 974 9703")).toBe("[removed] or [removed]"));
  it("scrubs any 13-digit number", () => expect(scrubLabPii("1234567890123")).toBe("[removed]"));
  it("rejects an unknown demo", () => expect(labInputSchema.safeParse({ ...input(), demoId: "other" }).success).toBe(false));
  it("accepts 12 messages and rejects 13", () => {
    expect(labInputSchema.safeParse({ ...input(), messages: Array.from({ length: 12 }, () => input().messages[0]) }).success).toBe(true);
    expect(labInputSchema.safeParse({ ...input(), messages: Array.from({ length: 13 }, () => input().messages[0]) }).success).toBe(false);
  });
  it("requires 1 to 500 content characters", () => {
    expect(labInputSchema.safeParse(input("voice", "")).success).toBe(false);
    expect(labInputSchema.safeParse(input("voice", "a".repeat(500))).success).toBe(true);
    expect(labInputSchema.safeParse(input("voice", "a".repeat(501))).success).toBe(false);
  });
  it("accepts only registered options", () => {
    expect(labInputSchema.safeParse({ ...input("lynkie"), options: { lesson: "Move", language: "Afrikaans" } }).success).toBe(true);
    expect(labInputSchema.safeParse({ ...input("lynkie"), options: { lesson: "Other" } }).success).toBe(false);
    expect(labInputSchema.safeParse({ ...input("knowledge"), options: { corpus: "injected" } }).success).toBe(false);
  });
});
describe("Lab server safeguards", () => {
  it("keys 15/hour limits with a SHA-256 IP hash and logs only permitted fields", async () => {
    const { send, dependencies } = setup();
    await send(input("whatsapp", "test@example.com +27 72 974 9703 1234567890123"));
    const digest = await webcrypto.subtle.digest("SHA-256", new TextEncoder().encode("192.0.2.123"));
    const hex = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
    expect(dependencies.checkRateLimit).toHaveBeenCalledWith(`ai-lab:${hex}`, { maxRequests: 15, windowMs: 3600000 });
    const body = vi.mocked(dependencies.gateway).mock.calls[0][0];
    expect(JSON.stringify(body)).not.toContain("test@example.com");
    expect(body.messages).toEqual(expect.arrayContaining([{ role: "user", content: "[removed] [removed] [removed]" }]));
    expect(dependencies.log).toHaveBeenCalledWith({ demoId: "whatsapp", status: 200, latency: expect.any(Number), tokens: { prompt: 2, completion: 3 } });
  });
  it("allows call 300", async () => {
    const { send, dependencies } = setup(300);
    expect((await send(input())).status).toBe(200);
    expect(dependencies.gateway).toHaveBeenCalledTimes(1);
  });
  it("stops call 301 before generation", async () => {
    const { send, dependencies } = setup(301);
    const response = await send(input());
    expect(response.status).toBe(429); expect(await response.json()).toEqual({ replay: true });
    expect(dependencies.gateway).not.toHaveBeenCalled();
  });
  it("fails closed if the daily counter fails", async () => {
    const { send, dependencies } = setup();
    vi.mocked(dependencies.incrementUsage).mockRejectedValue(new Error("unavailable"));
    expect((await send(input())).status).toBe(503); expect(dependencies.gateway).not.toHaveBeenCalled();
  });
  it.each([402, 429])("replays on gateway %i", async status => {
    const { send } = setup(1, status);
    const response = await send(input());
    expect(response.status).toBe(status); expect(await response.json()).toEqual({ replay: true });
  });
  it("stops at the per-IP limit without counting or generating", async () => {
    const { send, dependencies } = setup();
    vi.mocked(dependencies.checkRateLimit).mockReturnValue({ allowed: false, resetAt: Date.now() + 1000 });
    expect((await send(input())).status).toBe(429);
    expect(dependencies.incrementUsage).not.toHaveBeenCalled(); expect(dependencies.gateway).not.toHaveBeenCalled();
  });
  it.each(["self-harm", "suicide", "abuse", "Someone is hurting me", "I am being hurt by someone"])("guards Lynkie: %s", async message => {
    const { send, dependencies } = setup();
    expect(await (await send(input("lynkie", message))).json()).toEqual({ message: LYNKIE_SAFETY_MESSAGE });
    expect(dependencies.gateway).not.toHaveBeenCalled(); expect(dependencies.incrementUsage).not.toHaveBeenCalled();
  });
  it.each(["eventpulse", "workflow", "voice", "knowledge"] as const)("uses JSON and 450 tokens for %s", async id => {
    const { send, dependencies } = setup(1, 200, '{"answer":"Example"}');
    expect(await (await send(input(id))).json()).toEqual({ artefact: { answer: "Example" } });
    expect(dependencies.gateway).toHaveBeenCalledWith(expect.objectContaining({ model: "google/gemini-3.1-flash-lite", max_tokens: 450, temperature: 0.4, response_format: { type: "json_object" } }));
  });
  it.each(["lynkie", "whatsapp"] as const)("uses 350 tokens for %s", async id => {
    const { send, dependencies } = setup(); await send(input(id));
    expect(dependencies.gateway).toHaveBeenCalledWith(expect.objectContaining({ max_tokens: 350, temperature: id === "lynkie" ? 0.6 : 0.4 }));
  });
  it("returns 502 format error for invalid JSON", async () => {
    const { send } = setup(); const response = await send(input("workflow"));
    expect(response.status).toBe(502); expect(await response.json()).toEqual({ error: "format" });
  });
  it("fills valid options after the exact shared prefix", () => {
    expect(demoSystemPrompt("lynkie", { lesson: "Move", language: "Afrikaans" })).toBe(`${SHARED_PREFIX}\n\n${registry.lynkie.systemPrompt.replace("{lesson}", "Move").replace("{language}", "Afrikaans")}`);
  });
});
