import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PricingLedger } from "./pricing-ledger";

afterEach(() => vi.useRealTimers());

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