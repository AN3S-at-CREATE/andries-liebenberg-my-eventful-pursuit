import { z } from "zod";

export const labDemoIds = ["lynkie", "eventpulse", "knowledge", "whatsapp", "workflow", "voice"] as const;
export type LabDemoId = typeof labDemoIds[number];
export interface LabMessage { role: "user" | "assistant"; content: string }
export type LabResult = { message: string } | { artefact: Record<string, unknown> };
export interface ReplayContext { demoId: LabDemoId; messages: LabMessage[]; options: Record<string, string> }
export type LabReplay = (context: ReplayContext) => LabResult | Promise<LabResult>;
export const LAB_SESSION_TURNS = 6;

const allowedOptions: Record<LabDemoId, Record<string, readonly string[]>> = {
  lynkie: { lesson: ["Numbers", "Shapes", "Feelings", "Move"], language: ["English", "Afrikaans"] },
  eventpulse: { event: ["Conference", "Gala", "Launch", "Hybrid"], guests: ["Under 100", "100–500", "500+"] },
  knowledge: {}, whatsapp: { business: ["Guesthouse", "Salon", "Bakery", "Tutor"] },
  workflow: {}, voice: { voice: ["AN3S", "Friendly retail", "Formal legal"] },
};
export const labInputSchema = z.object({
  demoId: z.enum(labDemoIds),
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(500) }).strict()).min(1).max(12),
  options: z.record(z.string()),
}).strict().refine(input => Object.entries(input.options).every(([key, value]) =>
  Object.prototype.hasOwnProperty.call(allowedOptions[input.demoId], key) && allowedOptions[input.demoId][key].includes(value)), "Invalid demo option");

const resultSchema = z.union([
  z.object({ message: z.string().min(1) }).strict(),
  z.object({ artefact: z.record(z.unknown()) }).strict(),
]);

/** Validate live and scripted responses through the same public contract. */
export function parseLabResult(input: unknown): LabResult {
  const parsed = resultSchema.parse(input);
  if ("message" in parsed && typeof parsed.message === "string") return { message: parsed.message };
  if ("artefact" in parsed && parsed.artefact) return { artefact: parsed.artefact };
  throw new Error("Invalid demo response");
}

/** Calls stay outside UI components; replay flags are preserved on error responses. */
export async function requestLabDemo(input: ReplayContext): Promise<LabResult | { replay: true }> {
  const validated = labInputSchema.parse(input);
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke("ai-lab-demo", { body: validated });
  if (error) {
    const context = "context" in error && error.context instanceof Response ? error.context : undefined;
    if (context?.status === 402 || context?.status === 429) return { replay: true };
    if (context) {
      const body: unknown = await context.clone().json().catch(() => null);
      if (body && typeof body === "object" && "replay" in body && body.replay === true) return { replay: true };
    }
    throw new Error("The demo is unavailable. Please try again later.");
  }
  if (data && typeof data === "object" && "replay" in data && data.replay === true) return { replay: true };
  return parseLabResult(data);
}
