import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-enquiry";
import { serviceOffers } from "@/data/facts";

const enquiry = { name: "Contact test", email: "contact-test@example.com", service: "Discovery Sprint", message: "Please discuss the chosen service with me.", popiaConsent: true };

describe("contact enquiry rules", () => {
  it("preserves the chosen service", () => {
    expect(contactSchema.parse(enquiry).service).toBe("Discovery Sprint");
  });
  it("requires a chosen service", () => {
    expect(contactSchema.safeParse({ ...enquiry, service: "" }).success).toBe(false);
  });
  it("rejects services outside the approved catalogue", () => {
    expect(contactSchema.safeParse({ ...enquiry, service: "Unapproved service" }).success).toBe(false);
  });
  it("accepts each of the 38 approved offers", () => {
    expect(serviceOffers).toHaveLength(38);
    for (const offer of serviceOffers) expect(contactSchema.safeParse({ ...enquiry, service: offer.title }).success).toBe(true);
  });
  it("requires POPIA consent", () => {
    expect(contactSchema.safeParse({ ...enquiry, popiaConsent: false }).success).toBe(false);
  });
});