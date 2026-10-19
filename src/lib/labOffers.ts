import { serviceOffers } from "@/data/facts";

/** Resolve catalogue-backed prices without allowing a second Lab price list. */
export function getOffer(title: string) {
  return serviceOffers.find(offer => offer.title === title);
}
