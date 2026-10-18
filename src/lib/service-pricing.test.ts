import { describe, expect, it } from "vitest";
import { serviceOffers, facts } from "@/data/facts";
import { disciplines } from "@/data/disciplines";
import { disciplineEntryPrice, numericServicePrice, priceBandPosition } from "./service-pricing";

const APPROVED_PRICES = [
  [
    "AI Chatbot / WhatsApp Assistant",
    "from R4,500",
    "excl. VAT if applicable"
  ],
  [
    "Automation Starter",
    "from R3,500",
    "excl. VAT if applicable"
  ],
  [
    "AI Workflow Build",
    "from R7,500",
    "excl. VAT if applicable"
  ],
  [
    "Discovery Sprint",
    "R2,500",
    "excl. VAT if applicable"
  ],
  [
    "Private AI Knowledge Assistant",
    "quote only after a Discovery Sprint",
    ""
  ],
  [
    "Private Data & AI Platform",
    "quote only after a Discovery Sprint",
    ""
  ],
  [
    "LLM Fine-tuning / Local Models",
    "quote only after a Discovery Sprint",
    ""
  ],
  [
    "Marketing Bots, Crawlers & Scrapers",
    "from R7,500",
    "excl. VAT if applicable"
  ],
  [
    "AI & Growth Audit",
    "from R1,500",
    "excl. VAT if applicable"
  ],
  [
    "Pitch Deck / Company Profile",
    "from R2,500",
    "excl. VAT if applicable"
  ],
  [
    "Growth / Market-entry Strategy",
    "quote only",
    ""
  ],
  [
    "One-page Website",
    "from R2,999",
    "excl. VAT if applicable"
  ],
  [
    "Starter Website",
    "from R4,500",
    "excl. VAT if applicable"
  ],
  [
    "Website Care Plan",
    "R650 per month",
    "excl. VAT if applicable"
  ],
  [
    "Custom Business System / CRM / Portal",
    "from R9,500",
    "excl. VAT if applicable"
  ],
  [
    "Integration & Custom Script",
    "from R7,500",
    "excl. VAT if applicable"
  ],
  [
    "UI/UX Design & Clickable Prototype",
    "from R3,500",
    "excl. VAT if applicable"
  ],
  [
    "Mobile App",
    "on request",
    ""
  ],
  [
    "SEO & Visibility Audit",
    "from R3,500",
    "excl. VAT if applicable"
  ],
  [
    "Social Post Design",
    "from R450",
    "excl. VAT if applicable"
  ],
  [
    "Social Content Pack",
    "from R1,800",
    "excl. VAT if applicable"
  ],
  [
    "Ad Creative",
    "from R700",
    "excl. VAT if applicable"
  ],
  [
    "Email Newsletter Template",
    "from R950",
    "excl. VAT if applicable"
  ],
  [
    "Short Video / Reel Edit",
    "from R1,500",
    "excl. VAT if applicable"
  ],
  [
    "Logo Starter",
    "from R1,500",
    "excl. VAT if applicable"
  ],
  [
    "Brand Identity Starter",
    "from R3,500",
    "excl. VAT if applicable"
  ],
  [
    "Brand & Marketing Audit",
    "quote only",
    ""
  ],
  [
    "Event 3D Visualisation & Technical Plan",
    "quote only",
    ""
  ],
  [
    "3D Concept Render",
    "from R1,500",
    "excl. VAT if applicable"
  ],
  [
    "Event Graphics",
    "from R850",
    "excl. VAT if applicable"
  ],
  [
    "Lighting Design / Lighting Plot",
    "quote only",
    ""
  ],
  [
    "Hybrid / Virtual Event Technical Plan",
    "quote only",
    ""
  ],
  [
    "CRM & Sales Pipeline Setup",
    "from R4,500",
    "excl. VAT if applicable"
  ],
  [
    "Sales & Marketing Advisory",
    "quote only",
    ""
  ],
  [
    "AI Starter Session",
    "from R2,500",
    "excl. VAT if applicable"
  ],
  [
    "AI Adoption Workshop",
    "from R7,500",
    "excl. VAT if applicable"
  ],
  [
    "1:1 Mentoring",
    "quote only",
    ""
  ],
  [
    "Corporate Talk / Keynote",
    "quote only",
    ""
  ]
] as const;

describe("approved price sheet v2", () => {
  it("contains 38 offers in the approved eight-discipline order", () => {
    expect(serviceOffers).toHaveLength(38);
    expect([...new Set(serviceOffers.map(offer => offer.discipline))]).toEqual([
      "AI Systems & Automation", "Business Growth", "Web & App Development", "Experimental Marketing",
      "Brand Strategy", "3D Virtualization & Events", "Sales Leadership", "Innovation & Mentorship",
    ]);
    expect(disciplines.map(discipline => serviceOffers.filter(offer => offer.discipline === discipline.title).length)).toEqual([8, 3, 7, 6, 3, 5, 2, 4]);
  });
  it.each(APPROVED_PRICES)("keeps the approved price and VAT for %s", (title, price, vat) => {
    const offer = serviceOffers.find(item => item.title === title);
    expect(offer?.price).toBe(price);
    expect(offer?.vat).toBe(vat);
    expect(offer?.source).toBe("Andries approved price sheet v2, 18 October 2026");
    expect(offer?.year).toBe(2026);
    expect(Object.keys(offer ?? {})).toEqual(["discipline", "title", "description", "price", "vat", "source", "year"]);
  });
  it.each([
    ["AI Systems & Automation", 2500], ["Business Growth", 1500], ["Web & App Development", 2999],
    ["Experimental Marketing", 450], ["Brand Strategy", 1500], ["3D Virtualization & Events", 850],
    ["Sales Leadership", 4500], ["Innovation & Mentorship", 2500],
  ] as const)("computes the once-off entry price for %s", (discipline, price) => {
    expect(disciplineEntryPrice(serviceOffers.filter(offer => offer.discipline === discipline))).toBe(price);
  });
  it("excludes monthly upkeep from the website entry price", () => {
    expect(numericServicePrice("R650 per month")).toBe(650);
    expect(disciplineEntryPrice(serviceOffers.filter(offer => offer.title === "Website Care Plan"))).toBeNull();
  });
  it("never parses scoped prices as numeric", () => {
    expect(numericServicePrice("quote only after a Discovery Sprint")).toBeNull();
    expect(numericServicePrice("quote only")).toBeNull();
    expect(numericServicePrice("on request")).toBeNull();
  });
  it("uses a logarithmic R400 to R12,000 decorative scale", () => {
    expect(priceBandPosition(400)).toBe(0);
    expect(priceBandPosition(12000)).toBe(100);
    expect(priceBandPosition(Math.sqrt(400 * 12000))).toBeCloseTo(50);
  });
  it("retains the approved contact and career facts", () => {
    expect(facts.email.value).toBe("create@an3s.info");
    expect(facts.careerStart.value).toBe(2000);
    expect(facts.careerStart.label).toBe("since 2000");
    expect(facts.established.value).toBe(2003);
    expect(facts.whatsapp.value).toBe("+27 72 974 9703");
  });
});
