import { describe, expect, it } from "vitest";
import { serviceOffers } from "@/data/facts";
import { CHAOS_QUESTIONS } from "./chaos-gap";

describe("Chaos Gap starter questions", () => {
  it("uses exactly the four approved Concierge questions", () => {
    expect(CHAOS_QUESTIONS.map(q => q.ask)).toEqual([
      "I need a website. What does it cost?", "Can you automate my WhatsApp enquiries?",
      "I need a logo and brand. Where do I start?", "Book a call with Andries",
    ]);
  });
  it.each([["One-page Website", "from R2,999"], ["Automation Starter", "from R3,500"], ["Logo Starter", "from R1,500"], ["AI & Growth Audit", "from R1,500"]])(
    "gap offer %s shows the official price", (title, price) => {
      expect(CHAOS_QUESTIONS.some(q => q.offerTitle === title)).toBe(true);
      expect(serviceOffers.find(o => o.title === title)?.price).toBe(price);
    });
});
