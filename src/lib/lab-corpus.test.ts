import { describe, expect, it } from "vitest";
import { serviceOffers } from "@/data/facts";
import { corpus } from "../../supabase/functions/ai-lab-demo/corpus";

describe("Lab public price corpus", () => {
  it("copies all 38 complete offer lines exactly, including title, price and VAT", () => {
    const lines = corpus.split("\n");
    expect(lines).toHaveLength(38);
    serviceOffers.forEach((offer, index) => {
      expect(lines[index]).toBe([offer.discipline, offer.title, offer.description, offer.price, offer.vat].join(" | "));
    });
  });
});
