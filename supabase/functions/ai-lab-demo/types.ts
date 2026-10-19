import type { DemoId } from "./registry.ts";

export interface LabRequest {
  demoId: DemoId;
  messages: { role: "user" | "assistant"; content: string }[];
  options?: Record<string, string>;
}