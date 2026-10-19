import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PricingLedger } from "./pricing-ledger";
import { serviceOffers } from "@/data/facts";

afterEach(() => vi.useRealTimers());

describe("service WhatsApp enquiries", () => {
  it("routes all 38 offers to Andries with the chosen service", () => {
    const { container } = render(<PricingLedger />);
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("[data-ledger-row] a"));
    expect(links).toHaveLength(38);
    for (const offer of serviceOffers) {
      const link = links.find(item => item.getAttribute("aria-label") === `Discuss ${offer.title} on WhatsApp`);
      if (!link) throw new Error(`Missing enquiry link for ${offer.title}`);
      const url = new URL(link.href);
      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe("/27729749703");
      expect(url.searchParams.get("text")).toBe(`Hi Andries, I'm interested in ${offer.title}.`);
    }
  });
});

describe("ledger disclosure timing", () => {
  it("keeps native details open until the full 420ms close completes", () => {
    vi.useFakeTimers();
    const { container } = render(<PricingLedger />);
    const panel = container.querySelector("details");
    const summary = panel?.querySelector("summary");
    if (!panel || !summary) throw new Error("Expected a discipline disclosure");
    expect(panel.open).toBe(true);
    fireEvent.click(summary);
    expect(summary.getAttribute("aria-expanded")).toBe("false");
    act(() => vi.advanceTimersByTime(419));
    expect(panel.open).toBe(true);
    act(() => vi.advanceTimersByTime(1));
    expect(panel.open).toBe(false);
  });
});