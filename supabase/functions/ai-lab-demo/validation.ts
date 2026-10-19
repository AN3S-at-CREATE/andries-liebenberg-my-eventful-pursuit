import { z } from "npm:zod@3.25.76";
import { registry, type DemoDefinition, type DemoId } from "./registry.ts";

export const labRequestSchema = z.object({
  demoId: z.enum(["lynkie", "eventpulse", "knowledge", "whatsapp", "workflow", "voice"]),
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(500),
  }).strict()).min(1).max(12),
  options: z.record(z.string()).optional(),
}).strict().superRefine((request, context) => {
  const demo: DemoDefinition = registry[request.demoId];
  for (const [key, value] of Object.entries(request.options ?? {})) {
    if (!Object.hasOwn(demo.allowedOptions, key) || !demo.allowedOptions[key].includes(value)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["options", key], message: "Invalid demo option" });
    }
  }
});

export interface LabRequest {
  demoId: DemoId;
  messages: { role: "user" | "assistant"; content: string }[];
  options?: Record<string, string>;
}

/** Keep runtime validation behind the server-only Zod boundary. */
export function validateLabRequest(input: unknown): LabRequest | null {
  const parsed = labRequestSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}
