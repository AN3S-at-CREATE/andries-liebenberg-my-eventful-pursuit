import { z } from "zod";

export const labDemoIds = ["lynkie", "eventpulse", "knowledge", "whatsapp", "workflow", "voice"] as const;
export type LabDemoId = typeof labDemoIds[number];
export interface LabMessage { role: "user" | "assistant"; content: string }
export type LabResult = { message: string } | { artefact: Record<string, unknown> };
export interface ReplayContext { demoId: LabDemoId; messages: LabMessage[]; options: Record<string, string> }
export type LabReplay = (context: ReplayContext) => LabResult | Promise<LabResult>;
export const LAB_SESSION_TURNS = 6;

const resultSchema = z.union([
  z.object({ message: z.string().min(1) }).strict(),
  z.object({ artefact: z.record(z.unknown()) }).strict(),
]);

/** Validate live and scripted responses through the same public contract. */
export function parseLabResult(input: unknown): LabResult {
  return resultSchema.parse(input);
}

/** Calls stay outside UI components; replay flags are preserved on error responses. */
export async function requestLabDemo(input: ReplayContext): Promise<LabResult | { replay: true }> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke("ai-lab-demo", { body: input });
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
