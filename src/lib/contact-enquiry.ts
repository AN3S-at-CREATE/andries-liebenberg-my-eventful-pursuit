import { z } from "zod";
import { serviceOffers } from "@/data/facts";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(100),
  service: z.string().refine((value) => serviceOffers.some((offer) => offer.title === value), "Choose a service"),
  company: z.string().trim().max(100).optional(),
  industry: z.string().trim().max(100).optional(),
  goal: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  popiaConsent: z.literal(true, { errorMap: () => ({ message: "Please accept the POPIA consent" }) }),
});

export type ContactEnquiry = z.infer<typeof contactSchema>;

/** Submissions succeed only after durable storage, never on an email-only result. */
export async function submitContactEnquiry(input: ContactEnquiry): Promise<void> {
  const validated = contactSchema.parse(input);
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke("send-contact-email", { body: validated });
  if (error || data?.success !== true || typeof data?.submissionId !== "string") {
    throw new Error("ENQUIRY_NOT_SAVED");
  }
}