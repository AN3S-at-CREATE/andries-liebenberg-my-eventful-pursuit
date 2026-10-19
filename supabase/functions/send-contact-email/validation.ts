import { z } from "npm:zod@3.25.76";
import { serviceOptions } from "./service-options.ts";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(100),
  service: z.string().refine((value) => serviceOptions.some((title) => title === value)),
  company: z.string().trim().max(100).optional(),
  industry: z.string().trim().max(100).optional(),
  goal: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(2000),
  popiaConsent: z.literal(true),
});