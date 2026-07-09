import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { companies } from "@/data/companies";
import { getMetricsByCompanyId } from "@/data/companyMetrics";

/**
 * Visual regression guard for card grids.
 *
 * jsdom does not compute layout, so we cannot measure pixel heights. Instead we
 * enforce the structural contract that makes cards render at equal height inside
 * a CSS grid row: the animation wrapper must stretch (`h-full`) and each card
 * must fill that wrapper (`h-full`). Removing either class reintroduces the
 * uneven-height bug, and this test fails.
 */

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LazyMotion features={domAnimation}>
      <MemoryRouter>{ui}</MemoryRouter>
    </LazyMotion>,
  );
}

describe("company card grid – equal height contract", () => {
  it("every card link fills its container height", () => {
    const { container } = renderWithProviders(<CompaniesPreview />);
    const cardLinks = container.querySelectorAll("a.group.block");

    expect(cardLinks.length).toBeGreaterThan(0);

    cardLinks.forEach((link) => {
      // The wrapper (grid item) must stretch to the full row height.
      const wrapper = link.parentElement;
      expect(wrapper).not.toBeNull();
      expect(wrapper).toHaveClass("h-full");

      // The card element inside the link must fill that stretched height.
      const card = link.querySelector(":scope > *");
      expect(card).not.toBeNull();
      expect(card).toHaveClass("h-full");
    });
  });

  it("a standalone CompanyCard exposes h-full so grid rows equalize", () => {
    const company = companies[0];
    const metrics = getMetricsByCompanyId(company.id)!;
    const { container } = renderWithProviders(
      <CompanyCard company={company} metrics={metrics} />,
    );

    const card = container.querySelector("a.group.block > *");
    expect(card).toHaveClass("h-full");
  });
});
