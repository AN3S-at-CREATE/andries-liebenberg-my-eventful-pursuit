import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { contactRequestSchema } from "./validation.ts";

const enquiry = { name: "Contact test", email: "contact-test@example.com", service: "Discovery Sprint", message: "Please discuss the chosen service with me.", popiaConsent: true };
Deno.test("server preserves chosen service", () => {
  assertEquals(contactRequestSchema.parse(enquiry).service, "Discovery Sprint");
});
Deno.test("server rejects missing service", () => {
  assertEquals(contactRequestSchema.safeParse({ ...enquiry, service: "" }).success, false);
});
Deno.test("server rejects absent consent", () => {
  assertEquals(contactRequestSchema.safeParse({ ...enquiry, popiaConsent: false }).success, false);
});