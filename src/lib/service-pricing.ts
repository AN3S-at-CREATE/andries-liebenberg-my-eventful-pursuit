import { serviceOffers } from "@/data/facts";

export type ServiceOffer = (typeof serviceOffers)[number];

/** Parse published rand amounts without treating scoped work as a published price. */
export function numericServicePrice(price: string): number | null {
  const match = price.match(/R([\d,]+)/);
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

/** Monthly upkeep is not the once-off entry point for a discipline. */
export function disciplineEntryPrice(offers: readonly ServiceOffer[]): number | null {
  const prices = offers.filter(offer => !offer.price.includes("per month"))
    .map(offer => numericServicePrice(offer.price)).filter((price): price is number => price !== null);
  return prices.length ? Math.min(...prices) : null;
}

/** Decorative positions use the approved R400–R12,000 logarithmic range. */
export function priceBandPosition(price: number): number {
  return Math.max(0, Math.min(100, Math.log(price / 400) / Math.log(12000 / 400) * 100));
}

/** Format a computed entry price without changing authored offer strings. */
export function entryPriceLabel(price: number): string {
  return `R${price.toLocaleString("en-ZA").replace(/\s/g, ",")}`;
}

export const EVENT_SERVICE_NOTE = "AN3S provides event design and technical planning. Full event productions are delivered by 360 Vision Events.";