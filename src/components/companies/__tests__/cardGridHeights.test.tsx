import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompaniesPreview } from "@/components/companies/CompaniesPreview";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { companies } from "@/data/companies";
import { ServiceGrid } from "@/components/services/service-grid";
import { disciplines } from "@/data/disciplines";
import { awardNames, proofOfWork, serviceOffers, ventureFacts } from "@/data/facts";

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
      <MemoryRouter>
        <TooltipProvider>{ui}</TooltipProvider>
      </MemoryRouter>
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

      // The link between the stretched grid item and card must also fill height.
      expect(link).toHaveClass("h-full");

      // The card element inside the link must fill that stretched height.
      const card = link.querySelector(":scope > *");
      expect(card).not.toBeNull();
      expect(card).toHaveClass("h-full");
    });
  });

  it("a standalone CompanyCard exposes h-full so grid rows equalize", () => {
    const company = companies[0];
    const { container } = renderWithProviders(
      <CompanyCard company={company} />,
    );

    const card = container.querySelector("a.group.block > *");
    const link = container.querySelector("a.group.block");
    expect(link).toHaveClass("h-full");
    expect(card).toHaveClass("h-full");
  });

  it("shows only confirmed roles and never venture dates", () => {
    for (const company of companies) {
      const { container, unmount } = renderWithProviders(<CompanyCard company={company} />);
      expect(container).toHaveTextContent(company.name);
      expect(container.textContent).not.toMatch(/\b(?:19|20)\d{2}\b|Present|awaiting confirmation/);
      if (company.role) {
        expect(container).toHaveTextContent(company.role);
      } else {
        expect(container.textContent?.trim()).toBe(company.name);
      }
      unmount();
    }
  });
});

describe("authorised content update", () => {
  it("groups every listed offer in discipline order with exact WhatsApp messages", () => {
    const { container } = renderWithProviders(<ServiceGrid />);
    expect(Array.from(container.querySelectorAll("[aria-pressed]"), heading => heading.textContent)).toEqual(disciplines.map(discipline => discipline.title));
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(serviceOffers.length);
    serviceOffers.forEach((offer, index) => {
      expect(offer.source).toBeTruthy();
      expect(new URL(links[index].href).searchParams.get("text")).toBe(`Hi Andries, I'm interested in ${offer.title}.`);
      expect(links[index].parentElement?.textContent).toContain(offer.price);
      expect(links[index].parentElement?.textContent).toContain(offer.vat);
      expect(offer.descriptionSource).toBeTruthy();
    });
    expect(container.textContent).not.toMatch(/Care Plan|one workflow|credited against|Simple web app|placeholder/i);
  });

  it("filters offers, keeps empty disciplines out of the price grid and resets", () => {
    const { container, getByRole } = renderWithProviders(<ServiceGrid />);
    fireEvent.click(getByRole("button", { name: "Business Growth" }));
    expect(container.querySelectorAll("[data-service-card]")).toHaveLength(1);
    fireEvent.click(getByRole("button", { name: "Experimental Marketing" }));
    expect(container.querySelectorAll("[data-service-card]")).toHaveLength(0);
    fireEvent.click(getByRole("button", { name: "Experimental Marketing" }));
    expect(container.querySelectorAll("[data-service-card]")).toHaveLength(serviceOffers.length);
  });

  it("records only the supplied roles, sourced proof and undated awards", () => {
    expect(ventureFacts["eventpulse-ai"].role).toBe("Co-Founder & CTO");
    expect(ventureFacts["lynkie-sky-ai"].role).toBe("Co-Founder & Chief Innovation Officer");
    expect(ventureFacts["veralogix-group"].role).toBe("Group Lead Engineer, AI & Data Platforms");
    expect(ventureFacts["maono-moja-events"].role).toBe("Managing Director (Maono Moja Events Group)");
    expect(ventureFacts["rubies-and-pearls"].role).toBe("Head of Business Development");
    expect(proofOfWork.items).toHaveLength(4);
    proofOfWork.items.forEach(item => expect(item.source).toBe("CV p3"));
    const names = ["Africa CEO Forum Awards", "South African Small Business Awards", "EY Entrepreneur Of The Year", "Absa Supplier Development Award", "BCX Digital Innovation Awards"];
    awardNames.filter(award => names.includes(award.value)).forEach(award => expect(award).not.toHaveProperty("year"));
  });
});
